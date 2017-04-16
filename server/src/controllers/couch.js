module.exports = ({ couch }) => {
  const authRequest = method => async (req, res, next) => {
    try {
      let { data, authCookie } = await couch[method](req.body.name, req.body.password)
      res.append('Set-Cookie', authCookie)
      res.json(data)
    } catch (error) {
      return next(error)
    }
  }

  const signup = authRequest('signup')

  const login = authRequest('login')

  const logout = async (req, res, next) => {
    try {
      let { authCookie } = await couch.logout('AuthSession=' + req.cookies['AuthSession'])
      res.append('Set-Cookie', authCookie)
      res.end()
    } catch (error) {
      return next(error)
    }
  }

  const welcome = (req, res, next) => res.json({})

  return {
    signup,
    login,
    logout,
    welcome
  }
}
