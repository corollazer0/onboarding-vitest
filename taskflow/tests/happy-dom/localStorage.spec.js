describe('happy-dom localStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('persists and reads values', () => {
    localStorage.setItem('token', 'happy-dom')

    expect(localStorage.getItem('token')).toBe('happy-dom')
    expect(localStorage.length).toBe(1)
  })

  it('removes stored values', () => {
    localStorage.setItem('token', 'happy-dom')

    localStorage.removeItem('token')

    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.length).toBe(0)
  })

  it('clears all values', () => {
    localStorage.setItem('token', 'happy-dom')
    localStorage.setItem('theme', 'light')

    localStorage.clear()

    expect(localStorage.length).toBe(0)
  })
})
