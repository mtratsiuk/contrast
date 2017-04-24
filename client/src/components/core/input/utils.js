const collator = new Intl.Collator()

export const autocompleteSort = (a, b, value) => {
  let term = value.toLowerCase()
  let indexDiff = a.toLowerCase().indexOf(term) - b.toLowerCase().indexOf(term)
  if (indexDiff !== 0) return indexDiff
  return collator.compare(a, b)
}

export const autocompleteFilter = (item, value) => {
  return item.toLowerCase().indexOf(value.toLowerCase()) >= 0
}
