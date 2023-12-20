import { UUID } from 'crypto'

export const TEST1_USER_LOCAL = {
  id: 'e827fe99-943d-407c-a149-f57b401a7119' as UUID,
  email: 'test@test.com',
  createdAt: new Date('2023-12-20 17:38:25.801'),
}

export const MOCK_USER = {
  id: 'uuid-uuid-uuid-uuid-uuid' as UUID,
  email: 'test6@test.com',
  createdAt: new Date(),
}

export const TEST_PASSWORD = 'test1234!@'

export const MOCK_USER_WITH_PWD = {
  ...MOCK_USER,
  password: TEST_PASSWORD,
}

export const TEST_ACCESS_TOKEN = 'accessToken'
export const TEST_REFRESH_TOKEN = 'refreshToken'
