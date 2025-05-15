import githubFetch from '@/helpers/GithubFetch'
import { formatDate } from '@vueuse/core'

interface CommitAuthor {
  name: string
  email: string
  date: string
}

interface CommitInfo {
  author: CommitAuthor
  committer: CommitAuthor
  message: string
}

interface CommitterInfo {
  avatar_url: string
}

interface GithubCommitItem {
  commit: CommitInfo
  committer: CommitterInfo
}

/**
 * 获取点赞用户
 * @returns
 */
export const listStarredProjects = (): Promise<unknown> => {
  return githubFetch<unknown>('user/starred')
}

/**
 * 获取 vuejs 仓库信息
 * @returns
 */
export const getVuejsRepository = async (): Promise<Record<string, number>> => {
  const result = await githubFetch<Record<string, unknown>>('repos/vuejs/core')

  return {
    forksCount: result?.forks_count as number,
    issuesCount: result?.open_issues_count as number,
    stargazersCount: result?.stargazers_count as number,
  }
}

/**
 * 获取 vuejs issues
 * @returns
 */
export const getVuejsIssues = async (): Promise<Array<Record<string, string | number>>> => {
  const result = await githubFetch<Array<Record<string, unknown>>>('repos/vuejs/core/issues', {
    query: {
      per_page: 100,
    },
  })

  return transformDashboardLineChartData(result, 'created_at')
}

/**
 * 获取 vuejs forks 信息
 * @returns
 */
export const getVuejsForks = async (): Promise<Array<Record<string, string | number>>> => {
  const result = await githubFetch<Array<Record<string, unknown>>>('repos/vuejs/core/forks', {
    params: {
      per_page: 100,
    },
  })

  return transformDashboardLineChartData(result, 'created_at')
}

/**
 * 获取 vuejs 点赞列表
 */
export const getVuejsStargazers = async (): Promise<Array<Record<string, string | number>>> => {
  const result = await githubFetch<Array<Record<string, string>>>('repos/vuejs/core/stargazers', {
    headers: {
      Accept: 'application/vnd.github.star+json',
    },
    query: {
      page: 400,
      per_page: 100,
    },
  })

  return transformDashboardLineChartData(result, 'starred_at')
}

/**
 * 获取 vuejs 提交信息
 * @param page
 * @param pageSize
 * @returns
 */
export const getVuejsCommits = async (
  page: number = 0,
  pageSize: number = 100,
): Promise<Array<Record<string, string>>> => {
  const result = await githubFetch<GithubCommitItem[]>('repos/vuejs/core/commits', {
    query: {
      per_page: pageSize,
      page,
    },
  })

  return result.reduce(
    (items: Array<Record<string, string>>, item) => {
      items.push({
        name: item.commit.author.name,
        avatarUrl: item.committer.avatar_url,
        message: item.commit.message,
        email: item.commit.author.email,
        date: formatDate(new Date(item.commit.committer.date), 'YYYY-MM-DD'),
      })

      return items
    },
    [] as Array<Record<string, string>>,
  )
}

/**
 * 获取 vuejs 提交统计信息
 * @param page
 * @param pageSize
 * @returns
 */
export const getVuejsCommitsStat = async (
  page: number = 0,
  pageSize: number = 100,
): Promise<Array<Record<string, string | number>>> => {
  const result = await githubFetch<Array<GithubCommitItem>>(`repos/vuejs/core/commits`, {
    params: {
      per_page: pageSize,
      page,
    },
  })

  return result.reduce(
    (items: Array<Record<string, string | number>>, item) => {
      const committer = items.find((i) => i.name === item.commit.author.name)
      if (committer) {
        ;(committer.count as number) += 1
      } else {
        items.unshift({
          name: item.commit.author.name,
          avatarUrl: item.committer.avatar_url,
          count: 1,
          date: formatDate(new Date(item.commit.committer.date), 'YYYY-MM-DD 以来'),
        })
      }
      return items
    },
    [] as Array<Record<string, string | number>>,
  )
}

/**
 * 转换为 echarts 数据类型
 * @param source
 * @param dateFiled
 * @returns
 */
function transformDashboardLineChartData(
  source: Array<Record<string, unknown>>,
  dateFiled: string,
): Array<Record<string, string | number>> {
  return source.reduce(
    (items: Array<Record<string, string | number>>, item) => {
      const date = formatDate(new Date(item[dateFiled] as string), 'YYYY-MM-DD')
      const exitingItem = items.find((i) => i.date === date)
      if (exitingItem) {
        ;(exitingItem.count as number) += 1
      } else {
        items.unshift({
          date: date,
          count: 1,
        })
      }

      return items
    },
    [] as Array<Record<string, string | number>>,
  )
}
