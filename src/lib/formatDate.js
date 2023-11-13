export default function formatDate (inputDate) {
  const date = new Date(inputDate)

  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const formattedDate = `${month}/${year}`

  return formattedDate
}
