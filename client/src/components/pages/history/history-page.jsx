import Typography from 'components/core/typography'
import History from 'components/history'

const HistoryPage = () => {
  return (
    <div>
      <Typography type='headline' adjustMargin>
        <h1>Transactions history:</h1>
      </Typography>
      <History />
    </div>
  )
}

export default HistoryPage
