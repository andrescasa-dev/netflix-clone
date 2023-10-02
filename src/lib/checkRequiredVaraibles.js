const checkRequiredVariables = (requiredVariables, variables, errorMsg) => {
  const missingVariables = requiredVariables.filter(key => typeof variables[key] === 'undefined')

  if (missingVariables.length > 0) {
    throw new Error(`missing the next required variables: ${missingVariables.join(', ')}. ${errorMsg}`)
  }
}

export default checkRequiredVariables
