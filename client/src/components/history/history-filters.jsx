import Input from 'components/core/input'
import Select from 'components/core/select'

const HistoryFilters = () => {
  return (
    <div className='HistoryFilters'>
      <Input
        model='historyFilters.name'
        label='Filter by name'
        helpText='Example: "Bananas,Apples,Oranges"'
      />
      <Input
        model='historyFilters.category'
        label='Filter by category'
      />
      <Input
        model='historyFilters.tags'
        label='Filter by tags'
      />
      <Select
        model='historyFilters.type'
        options={[
          { title: 'Filter by type', data: '' },
          { title: 'Expense', data: 'expense' },
          { title: 'Income', data: 'income' }
        ]}
      />
      <Input
        model='historyFilters.startDate'
        type='date'
        helpText='From date'
      />
      <Input
        model='historyFilters.endDate'
        type='date'
        helpText='To date'
      />
    </div>
  )
}

export default HistoryFilters
