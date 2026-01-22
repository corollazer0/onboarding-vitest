describe('happy-dom localStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('값을 저장하고 다시 읽을 수 있어야 한다', () => {
    localStorage.setItem('token', 'happy-dom')

    expect(localStorage.getItem('token')).toBe('happy-dom')
    expect(localStorage.length).toBe(1)
  })

  it('저장된 값을 제거할 수 있어야 한다', () => {
    localStorage.setItem('token', 'happy-dom')

    localStorage.removeItem('token')

    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.length).toBe(0)
  })

  it('모든 값을 비울 수 있어야 한다', () => {
    localStorage.setItem('token', 'happy-dom')
    localStorage.setItem('theme', 'light')

    localStorage.clear()

    expect(localStorage.length).toBe(0)
  })
})
