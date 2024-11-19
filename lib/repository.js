
const baseUrl = "http://localhost:3001/"
const headers = new Headers()
const methods = ["get", "post", "put", "delete"]


const request = async (method, path, options = {}) => {
  if (!methods.includes(method)) {
    console.error(`Request method ${method} unavailable, Should be ${methods}`)
    return { data: null, status: false }
  }

  if (!options.contentType) headers.append("Content-Type", "application/json")
  else headers.append("Content-Type", options.contentType)

  const response = await fetch(baseUrl + path, {
    method: method.toUpperCase(),
    body: JSON.stringify(options.body) ?? null,
    credentials: 'include',
    headers
  })
  
  const data = await response.json()
  return { status: response.status, ...data }
}

export default request