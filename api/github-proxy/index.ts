import type { VercelRequest, VercelResponse } from '@vercel/node'
import dotenv from 'dotenv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  dotenv.config({ path: '.env.local' })

  // const allowedOrigins = [
  //   'https://zht-vue-demo.vercel.app',
  //   'http://localhost:8001',
  //   'http://localhost:3000',
  // ]

  // const origin = req.headers.origin ?? allowedOrigins[0]
  // if (allowedOrigins.includes(origin)) {
  //   // 设置 CORS 头
  //   res.setHeader('Access-Control-Allow-Origin', origin)
  // }
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Content-Type', 'application/json')

  // 验证请求方法
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { endpoint, ...queryParams } = req.query

    if (!endpoint || typeof endpoint !== 'string') {
      return res.status(400).json({ message: 'Endpoint parameter is required' })
    }

    // 构建查询字符串
    const mappedParams = Object.entries(queryParams).map<string[]>(([key, value]) => [
      key,
      Array.isArray(value) ? value.toString() : value.toString(),
    ])
    const queryString = new URLSearchParams(mappedParams).toString()

    const url = `https://api.github.com/${endpoint}${queryString ? `?${queryString}` : ''}`
    const accept = req.headers['accept']
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        'User-Agent': 'zht-vue-demo',
        Accept: accept && !accept.includes('*/*') ? accept : 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      res.status(response.status).json({
        message: `GitHub API error: ${response.status} - ${errorData.message} at ${url}`,
      })
    } else {
      const data = await response.json()
      res.status(200).json(data)
    }
  } catch (error) {
    console.error('Proxy Exception:', error)
    res.status(500).json({
      message: 'Github proxy internal server error',
    })
  }
}
