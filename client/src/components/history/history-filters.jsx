import Input from 'components/core/input'
import Select from 'components/core/select'

import withTranslations from 'components/core/i18n'

const HistoryFilters = ({ t }) => {
  return (
    <div className='HistoryFilters'>
      <Input
        model='historyFilters.name'
        label={t('history_filters.name_label')}
        helpText={t('history_filters.name_help')}
      />
      <Input
        model='historyFilters.category'
        label={t('history_filters.category_label')}
        helpText={t('history_filters.category_help')}
      />
      <Input
        model='historyFilters.tags'
        label={t('history_filters.tags_label')}
        helpText={t('history_filters.tags_help')}
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

export default withTranslations(HistoryFilters)
