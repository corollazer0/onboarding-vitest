import router from '@/router'

describe('Router params', () => {
  it('routes to TaskDetail with id param', async () => {
    router.push('/tasks/123')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('TaskDetail')
    expect(router.currentRoute.value.params.id).toBe('123')
  })
})
