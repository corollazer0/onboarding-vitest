import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Node 테스트에서 사용할 MSW 서버 인스턴스
export const server = setupServer(...handlers)
