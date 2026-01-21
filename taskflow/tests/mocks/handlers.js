import { http, HttpResponse } from 'msw'

const mockTasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
]

export const handlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json(mockTasks)
  }),
  http.post('/api/tasks', async ({ request }) => {
    const body = await request.json()
    const newTask = { id: Date.now(), ...body }
    return HttpResponse.json(newTask, { status: 201 })
  }),
  http.put('/api/tasks/:id', async ({ params, request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: Number(params.id), ...body })
  }),
  http.delete('/api/tasks/:id', () => {
    return HttpResponse.json({ success: true })
  })
]

export const errorHandlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  })
]
