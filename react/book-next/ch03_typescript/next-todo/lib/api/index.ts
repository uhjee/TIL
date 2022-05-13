import Axios, { AxiosInstance } from 'axios';

/**
 * axios 요청이 필요한 컴포넌트에서 import 해서 사용
 * @return  {AxiosInstance}  [return description]
 */
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axios;
