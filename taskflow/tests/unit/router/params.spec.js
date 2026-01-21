import router from '@/router'

describe('Router params', () => {
  it('resolves TaskDetail with id param', () => {
    const resolved = router.resolve('/tasks/123')

    expect(resolved.name).toBe('TaskDetail')
    expect(resolved.params.id).toBe('123')
  })
})
