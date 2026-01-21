import router from '@/router'

describe('Router guards', () => {
  it('redirects to Home when auth is required and user is not authenticated', async () => {
    await router.push('/tasks/1')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('Home')
    expect(router.currentRoute.value.query.redirect).toBe('/tasks/1')
  })
})
