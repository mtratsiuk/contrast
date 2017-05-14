import React from 'react'
import { connect } from 'react-redux'

import Input from 'components/core/input'
import Select from 'components/core/select'
import withTranslations from 'components/core/i18n'

import { updateFiltered } from 'actions/transactions'

const autocompleteFilter = (item, value) => {
  let terms = value.split(',').map(_.toLower)
  let term = _.last(terms).toLowerCase()
  item = item.toLowerCase()

  if (terms.indexOf(item) >= 0) return false
  return item.indexOf(term) >= 0
}

const autocompleteModify = (prev, selected) => {
  let curTermIndex = prev.lastIndexOf(',')
  if (curTermIndex === -1) return selected
  return prev.slice(0, curTermIndex + 1) + selected
}

class HistoryFilters extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.filters !== nextProps.filters) {
      this.props.updateFiltered()
    }
  }

  render () {
    let { autocomplete, t } = this.props

    return (
      <div className='HistoryFilters'>
        <Input
          model='historyFilters.name'
          label={t('history_filters.name_label')}
          helpText={t('history_filters.name_help')}
          autocomplete={autocomplete.names}
          autocompleteFilter={autocompleteFilter}
          autocompleteModifyOnSelect={autocompleteModify}
        />
        <Input
          model='historyFilters.category'
          label={t('history_filters.category_label')}
          helpText={t('history_filters.category_help')}
          autocomplete={autocomplete.categories}
          autocompleteFilter={autocompleteFilter}
          autocompleteModifyOnSelect={autocompleteModify}
        />
        <Input
          model='historyFilters.tags'
          label={t('history_filters.tags_label')}
          helpText={t('history_filters.tags_help')}
          autocomplete={autocomplete.tags}
          autocompleteFilter={autocompleteFilter}
          autocompleteModifyOnSelect={autocompleteModify}
        />
        <Select
          model='historyFilters.type'
          options={[
            { title: t('history_filters.type_title'), data: '' },
            { title: t('expense'), data: 'expense' },
            { title: t('income'), data: 'income' }
          ]}
        />
        <Input
          model='historyFilters.startDate'
          type='date'
          helpText={t('history_filters.startdate_help')}
        />
        <Input
          model='historyFilters.endDate'
          type='date'
          helpText={t('history_filters.enddate_help')}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    filters: _.get('forms.historyFilters', state),
    autocomplete: _.get('transactions.autocomplete', state)
  }),
  { updateFiltered }
)(withTranslations(HistoryFilters))
