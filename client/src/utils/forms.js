export const getFormData = _.pipe(
  _.omit(['invalid', 'submitted']),
  _.omitBy((v, k) => /^__.*__$/.test(k)),
  _.mapValues('value')
)
