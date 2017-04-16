const { ContrastError } = require('./error')

const TIMEOUT = 5000

const request = async (url, { method, data, headers }) => {
  if (data != null) {
    data = JSON.stringify(data)
    headers = Object.assign({}, headers, {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  let response

  try {
    response = await fetch(url, {
      method,
      headers,
      body: data,
      credentials: 'include',
      timeout: TIMEOUT
    })
  } catch (error) {
    throw new ContrastError('Http utils: network error', null, error)
  }

  let responseData

  try {
    responseData = await response.json()
  } catch (error) {
    responseData = null
  }

  if (response.status >= 400) {
    throw new ContrastError('Http utils: response error', response.status, responseData)
  }

  return { response, data: responseData }
}

const get = (url, data, headers) => request(url, {
  method: 'GET',
  headers
})

const post = (url, data, headers) => request(url, {
  method: 'POST',
  data,
  headers
})

const put = (url, data, headers) => request(url, {
  method: 'PUT',
  data,
  headers
})

const del = (url, data, headers) => request(url, {
  method: 'DELETE',
  data,
  headers
})

const withBasicAuth = (name, password) => (request, url, data, headers) =>
  request(url, data, Object.assign({}, headers, {
    'Authorization': 'Basic ' + Buffer.from(`${name}:${password}`).toString('base64')
  }))

module.exports = {
  get,
  post,
  put,
  del,
  withBasicAuth
}
