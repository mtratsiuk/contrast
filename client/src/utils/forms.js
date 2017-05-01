export const getFormData = form => {
  return _.pipe(
    _.omit('invalid'),
    _.mapValues('value')
  )(form)
}
