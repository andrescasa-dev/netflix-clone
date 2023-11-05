export default function variablesToGQLStringObj (variables) {
  const keys = Object.keys(variables)
  const finalString = keys.reduce((string, key) => {
    return string + `${key}:$${key}, `
  }, '{')
  return finalString + '}'
}
