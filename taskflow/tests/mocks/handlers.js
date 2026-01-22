import { http, HttpResponse } from 'msw'

// MSW 요청에 사용할 기본 API 주소
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
// 테스트에서 재사용하는 태스크 목 데이터
const mockTasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
]

// 정상 응답 시나리오 핸들러 모음
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

// 에러 응답 시나리오 핸들러 모음
export const errorHandlers = [
  http.get(`${baseUrl}/tasks`, () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  })
]
