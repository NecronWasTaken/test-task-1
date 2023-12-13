import type { Login, User } from '@/utils/types'
import request from './request'

export default {
  getUsers (params: Login) {
    return request.get<User[]>('/users', { params })
  },
}
