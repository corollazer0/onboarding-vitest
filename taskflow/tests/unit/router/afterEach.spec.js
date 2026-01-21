import router from '@/router'

describe('Router afterEach', () => {
  it('updates document title using route meta title', async () => {
    document.title = 'Initial'
    const baseTitle = import.meta.env.VITE_APP_TITLE || 'TaskFlow'

    await router.push('/about')
    await router.isReady()

    expect(document.title).toBe(`About | ${baseTitle}`)
  })
})
