import router from '@/router'

describe('Router params', () => {
  it('id 파라미터로 TaskDetail을 매핑해야 한다', () => {
    const resolved = router.resolve('/tasks/123')

    expect(resolved.name).toBe('TaskDetail')
    expect(resolved.params.id).toBe('123')
  })
})
