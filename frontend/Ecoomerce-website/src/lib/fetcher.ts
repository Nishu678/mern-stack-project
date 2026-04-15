const BASE_URL = 'https://api.escuelajs.co/api/v1'

type Params = Record<string, any>

async function request<T>(
  method: string,
  path: string,
  body?: any,
  params?: Params,
): Promise<T> {
  const query = params
    ? `?${new URLSearchParams(params).toString()}`
    : ''

  const res = await fetch(`${BASE_URL}${path}${query}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) throw new Error('API Error')

  return res.json()
}

export const fetcher = {
  get<T>(path: string, params?: Params) {
    return request<T>('GET', path, undefined, params)
  },
  post<T>(path: string, body?: any, params?: Params) {
    return request<T>('POST', path, body, params)
  },
  put<T>(path: string, body?: any) {
    return request<T>('PUT', path, body)
  },
  patch<T>(path: string, body?: any) {
    return request<T>('PATCH', path, body)
  },
  delete<T>(path: string) {
    return request<T>('DELETE', path)
  },
}
