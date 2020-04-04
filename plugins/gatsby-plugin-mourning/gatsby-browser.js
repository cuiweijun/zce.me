/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onClientEntry = () => {
  const isMourning = (date = new Date()) => {
    const isLeapYear = y => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0

    const days = ['0512', '0918']

    // qingming
    const year = date.getFullYear()
    days.push(isLeapYear(year) || isLeapYear(year - 1) ? '0404' : '0405')

    const month = ('0' + (date.getMonth() + 1)).substr(-2)
    const day = ('0' + date.getDate()).substr(-2)

    return days.indexOf(month + day) !== -1
  }
  if (!isMourning()) return
  document.documentElement.style.filter = 'grayscale(100%)'
}
