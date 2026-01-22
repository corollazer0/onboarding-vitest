// Node 환경 테스트에서 localStorage를 흉내내는 간단한 스텁
export const createLocalStorage = () => {
  const storage = new Map()
  return {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
    clear: () => storage.clear()
  }
}
