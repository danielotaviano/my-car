import { ServerError } from '@/presentation/errors/server-error'
import { HttpResponse } from '@/presentation/protocols/http'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data:any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const noContent = (): HttpResponse => ({
  statusCode: 204
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})
