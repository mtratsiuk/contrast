import { connect } from 'react-redux'

import { Input, MultiInput } from 'components/core/input'
import Fab from 'components/core/fab'

const Transaction = () => {
  return (
    <div className='Transaction'>
      <Input
        model='transaction.name'
        label='Transaction Name'
        required
      />
      <Input
        model='transaction.currency'
        label='Currency'
        required
      />
      <Input
        model='transaction.category'
        label='Category'
      />
      <MultiInput
        model='transaction.tags'
        label='Tag'
      />

      <Fab fixed />
    </div>
  )
}

export default connect()(Transaction)
