import { createAuthGuard } from '@/router'

describe('Router guards', () => {
  it('인증이 필요하고 미인증이면 Home으로 리다이렉트해야 한다', () => {
    const guard = createAuthGuard({ getIsAuthenticated: () => false })
    const to = { meta: { requiresAuth: true }, fullPath: '/tasks/1' }
    const next = vi.fn()

    guard(to, null, next)

    expect(next).toHaveBeenCalledWith({
      name: 'Home',
      query: { redirect: '/tasks/1' }
    })
  })

  it('인증이 필요 없거나 인증된 경우 이동을 허용해야 한다', () => {
    const guard = createAuthGuard({ getIsAuthenticated: () => true })
    const to = { meta: { requiresAuth: true }, fullPath: '/tasks/1' }
    const next = vi.fn()

    guard(to, null, next)

    expect(next).toHaveBeenCalled()
    expect(next.mock.calls[0]).toHaveLength(0)
  })
})
