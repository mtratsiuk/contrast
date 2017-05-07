import Transaction from 'components/transaction'
import Typography from 'components/core/typography'

const TransactionPage = () => {
  return (
    <div>
      <Typography type='headline' adjustMargin>
        <h1>Create new transaction:</h1>
      </Typography>
      <Transaction />
    </div>
  )
}

export default TransactionPage
