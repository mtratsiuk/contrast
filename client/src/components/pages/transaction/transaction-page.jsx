import Transaction from 'components/transaction'
import Typography from 'components/core/typography'
import withTranslations from 'components/core/i18n'

const TransactionPage = ({ t, match: { params: { id } } }) => {
  return (
    <div className='TransactionPage'>
      <Typography type='headline' adjustMargin>
        <h1>{t(id ? 'transaction_form.edit_transaction' : 'transaction_form.create_new_transaction')}</h1>
      </Typography>
      <Transaction id={id} />
    </div>
  )
}

export default withTranslations(TransactionPage)
