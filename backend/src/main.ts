import express from 'express';
import cors from 'cors'
import asyncHandler from 'express-async-handler'
import baseRouter from "./router/index"
import { errorHandler } from '@/app/error.handler'
import { helper } from '@/app/helper'

const app = express();
const BASE_API = '/api'
const port = 8000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(helper)

app.use(BASE_API, baseRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is started at port ${port}`);
});