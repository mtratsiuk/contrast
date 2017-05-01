export const required = value => {
  return /^.*\S.*$/.test(value)
}

export const emptyOr = validate => value => {
  if (_.isEmpty(value)) return true
  return validate(value)
}
