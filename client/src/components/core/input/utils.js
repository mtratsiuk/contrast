const collator = new Intl.Collator()

export const autocompleteSort = (a, b, value) => {
  let indexDiff = a.indexOf(value) - b.indexOf(value)
  if (indexDiff !== 0) return indexDiff
  return collator.compare(a, b)
}

export const autocompleteFilter = (item, value) => {
  return item.toLowerCase().indexOf(value.toLowerCase()) >= 0
}
