// import { AxiosError } from 'axios';

import { AxiosError } from 'axios';

export default function NotFound() {
  throw new AxiosError(
    '요청에 실패했습니다', // message
    'ERR_BAD_REQUEST', // code
    null, // request
    {
      // response
      data: {
        success: false,
        status: 404,
        message: '',
        description: '',
        data: null,
        error: {},
      },
      status: 404,
      statusText: 'Bad Request',
      headers: {},
      config: null,
    }
  );
  return (
    <>
      <h1 className='text-red-500'>Not Found</h1>
    </>
  );
}
