import axios from 'axios'
const axiosMock = axios as jest.Mocked<typeof axios>

export default axiosMock
