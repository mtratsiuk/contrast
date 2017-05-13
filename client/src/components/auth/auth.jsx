import { push } from 'react-router-redux'

import * as userActions from 'actions/user'

import { required } from 'utils/validators'

import Form from 'components/core/form'
import Input from 'components/core/input'
import Button from 'components/core/button'
import Typography from 'components/core/typography'
import withTranslations from 'components/core/i18n'

const Auth = ({
  dispatch,
  type,
  title,
  t
}) => {
  let otherType = type === 'login' ? 'signup' : 'login'
  let otherTitle = type === 'login' ? 'signup' : 'login'

  return (
    <div className='Auth'>
      <div className='Auth__form'>
        <Form model={`${type}`} onSubmit={({ name, password }) => {
          dispatch(userActions[type](name, password))
        }}>
          <Typography type='display1'>
            <h1>{t(title)}</h1>
          </Typography>
          <Input
            model={`${type}.name`}
            type='text'
            label={t('name')}
            validate={required}
            required
            errorText={t('auth.name_error')}
          />
          <Input
            model={`${type}.password`}
            type='password'
            label={t('password')}
            validate={value => !!value.length}
            errorText={t('auth.password_error')}
            required
          />
          {type === 'signup' &&
            <Input
              model={`${type}.repeatPassword`}
              type='password'
              label={t('auth.confirm_password_label')}
              validate={(value, form) => _.get('password.value', form) === value}
              errorText={t('auth.confirm_password_error')}
              required
            />
          }
          <Button
            className='Auth__submit-btn'
            primary
          >
            {t(title)}
          </Button>
        </Form>
        <Button
          className='Auth__other-btn'
          raised={false}
          primary
          dense
          onClick={() => dispatch(push(`/${otherType}`))}>
          {t(otherTitle)}
        </Button>
      </div>
    </div>
  )
}

export default withTranslations(Auth)
