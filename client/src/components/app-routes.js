import TransactionPage from 'components/pages/transaction'
import HistoryPage from 'components/pages/history'
import SettingsPage from 'components/pages/settings'

export default [
  {
    path: '/transaction/:id?',
    linkPath: '/transaction',
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
    path: '/settings',
    title: 'settings',
    icon: 'star',
    component: SettingsPage
  }
]
