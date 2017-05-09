import { History, HistoryFilters } from 'components/history'

const HistoryPage = () => {
  return (
    <div className='HistoryPage'>
      <HistoryFilters />
      <History />
    </div>
  )
}

export default HistoryPage
