module.exports = ({ http, logger }) => {
  const COUCH_URL = `http://${process.env.CONTRAST_COUCH_HOST}:5984`
  const withAuth = http.withBasicAuth(process.env.COUCHDB_USER, process.env.COUCHDB_PASSWORD)

  const signup = async (name, password) => {
    await withAuth(http.put, `${COUCH_URL}/_users/org.couchdb.user:${name}`, {
      name,
      password,
      roles: [],
      type: 'user'
    })

    return await login(name, password)
  }

  const login = async (name, password) => {
    let { response, data } = await withAuth(http.post, `${COUCH_URL}/_session`, { name, password })

    return {
      authCookie: response.headers.get('Set-Cookie'),
      data: {
        name: data.name,
        db: 'userdb-' + Buffer.from(data.name).toString('hex')
      }
    }
  }

  const logout = async (authCookie) => {
    let { response } = await http.del(`${COUCH_URL}/_session`, null, {
      'Cookie': authCookie
    })

    return {
      authCookie: response.headers.get('Set-Cookie')
    }
  }

  return {
    signup,
    login,
    logout,
    COUCH_URL
  }
}
