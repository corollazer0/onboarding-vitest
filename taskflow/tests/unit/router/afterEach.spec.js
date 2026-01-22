import router from '@/router'

describe('Router afterEach', () => {
  it('라우트 meta.title로 document.title을 업데이트해야 한다', async () => {
    document.title = 'Initial'
    const baseTitle = import.meta.env.VITE_APP_TITLE || 'TaskFlow'

    await router.push('/about')
    await router.isReady()

    expect(document.title).toBe(`About | ${baseTitle}`)
  })
})
