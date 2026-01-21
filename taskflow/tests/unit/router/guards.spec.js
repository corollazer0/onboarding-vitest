import { createAuthGuard } from '@/router'

describe('Router guards', () => {
  it('redirects to Home when auth is required and user is not authenticated', () => {
    const guard = createAuthGuard({ getIsAuthenticated: () => false })
    const to = { meta: { requiresAuth: true }, fullPath: '/tasks/1' }
    const next = vi.fn()

    guard(to, null, next)

    expect(next).toHaveBeenCalledWith({
      name: 'Home',
      query: { redirect: '/tasks/1' }
    })
  })

  it('allows navigation when auth is not required or user is authenticated', () => {
    const guard = createAuthGuard({ getIsAuthenticated: () => true })
    const to = { meta: { requiresAuth: true }, fullPath: '/tasks/1' }
    const next = vi.fn()

    guard(to, null, next)

    expect(next).toHaveBeenCalled()
    expect(next.mock.calls[0]).toHaveLength(0)
  })
})
