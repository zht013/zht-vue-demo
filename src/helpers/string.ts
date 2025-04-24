/**
 * 删除字符串开头和末尾的指定字符
 * @param str 目标字符串
 * @param chars 要删除的字符，默认是空格
 * @returns 删除后的字符串
 */
export function trim(str: string, chars: string = '\\s'): string {
  return trimStart(trimEnd(str, chars), chars)
}

/**
 * 删除字符串末尾的指定字符
 * @param str 目标字符串
 * @param chars 要删除的字符，默认是空格
 * @returns 删除后的字符串
 */
export function trimEnd(str: string, chars: string = '\\s'): string {
  const pattern = new RegExp(`[${chars}]+$`, 'g')
  return str.replace(pattern, '')
}

/**
 * 删除字符串开头的指定字符
 * @param str 目标字符串
 * @param chars 要删除的字符，默认是空格
 * @returns 删除后的字符串
 */
export function trimStart(str: string, chars: string = '\\s'): string {
  const pattern = new RegExp(`^[${chars}]+`, 'g')
  return str.replace(pattern, '')
}
