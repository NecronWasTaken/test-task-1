import express from 'express'
import asyncHandler from 'express-async-handler'
import getUsers from './get-users.handler'

const routes = express.Router()

routes
  .get(
    '/users',
    asyncHandler(getUsers)
  )

export default routes