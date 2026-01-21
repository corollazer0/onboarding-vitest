import router from '@/router'

describe('Router', () => {
  it('/ 경로는 Home 라우트로 매핑되어야 한다', async () => {
    router.push('/')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('Home')
  })
})
