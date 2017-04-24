import Hello from 'components/hello'
import TransactionPage from 'components/pages/transaction'
import HistoryPage from 'components/pages/history'

export default [
  {
    path: '/hello',
    title: 'Hello',
    icon: 'star',
    component: Hello
  },
  {
    path: '/transaction',
    title: 'Transaction',
    icon: 'star',
    component: TransactionPage
  },
  {
    path: '/history',
    title: 'History',
    icon: 'star',
    component: HistoryPage
  }
]
