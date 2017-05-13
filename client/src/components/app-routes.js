import Hello from 'components/hello'
import TransactionPage from 'components/pages/transaction'
import HistoryPage from 'components/pages/history'

export default [
  {
    path: '/transaction',
    title: 'transaction',
    icon: 'star',
    component: TransactionPage
  },
  {
    path: '/history',
    title: 'history',
    icon: 'star',
    component: HistoryPage
  },
  {
    path: '/hello',
    title: 'Hello',
    icon: 'star',
    component: Hello
  }
]
