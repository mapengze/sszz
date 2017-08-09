import { request, config } from 'utils'
const { api } = config
const { users } = api

export async function query (params) {
  return request({
    url: '/v1/users/problem/findProblem',
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: '/api/problem/deleteProblem',
    method: 'delete',
    data: params,
  })
}
