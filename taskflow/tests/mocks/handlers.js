import { http, HttpResponse } from 'msw'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
const mockTasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
]

export const handlers = [
  http.get(`${baseUrl}/tasks`, () => {
    return HttpResponse.json(mockTasks)
  }),
  http.post(`${baseUrl}/tasks`, async ({ request }) => {
    const body = await request.json()
    const newTask = { id: Date.now(), ...body }
    return HttpResponse.json(newTask, { status: 201 })
  }),
  http.put(`${baseUrl}/tasks/:id`, async ({ params, request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: Number(params.id), ...body })
  }),
  http.delete(`${baseUrl}/tasks/:id`, () => {
    return HttpResponse.json({ success: true })
  })
]

export const errorHandlers = [
  http.get(`${baseUrl}/tasks`, () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  })
]
