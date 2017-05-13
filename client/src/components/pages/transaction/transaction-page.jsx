import Transaction from 'components/transaction'
import Typography from 'components/core/typography'
import withTranslations from 'components/core/i18n'

const TransactionPage = ({ t }) => {
  return (
    <div className='TransactionPage'>
      <Typography type='headline' adjustMargin>
        <h1>{t('transaction_form.create_new_transaction')}</h1>
      </Typography>
      <Transaction />
    </div>
  )
}

export default withTranslations(TransactionPage)
