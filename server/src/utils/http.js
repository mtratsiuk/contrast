const fetch = require('node-fetch')
const { ContrastError } = require('./error')

const TIMEOUT = 5000

const request = async (url, { method, data, headers }) => {
  if (data != null) {
    data = JSON.stringify(data)
    headers = Object.assign({}, headers, headers = Object.assign({}, headers, {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }))
  }

  let response

  try {
    response = await fetch(url, {
      method,
      headers,
      body: data,
      timeout: TIMEOUT
    })
  } catch (error) {
    throw new ContrastError('Http utils: network error', null, error)
  }

  let responseData

  try {
    responseData = await response.json()
  } catch (error) {
    throw new ContrastError('Http utils: bad response format', response.status, error)
  }

  if (response.status >= 400) {
    throw new ContrastError('Http utils: response error', response.status, responseData)
  }

  return { response, data: responseData }
}

const get = async (url, headers) => await request(url, {
  method: 'GET',
  headers
})

const post = async (url, data, headers) => await request(url, {
  method: 'POST',
  data,
  headers
})

const put = async (url, data, headers) => await request(url, {
  method: 'PUT',
  data,
  headers
})

const del = async (url, data, headers) => await request(url, {
  method: 'DELETE',
  data,
  headers
})

const withBasicAuth = (name, password, request) => async (url, data, headers) =>
  await request(url, data, Object.assign({}, headers, {
    'Authorization': 'Basic ' + Buffer.from(`${name}:${password}`).toString('base64')
  }))

module.exports = {
  get,
  post,
  put,
  del,
  withBasicAuth
}
