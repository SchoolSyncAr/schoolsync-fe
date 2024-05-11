import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export const loginError = new AxiosError(
  ...[
    'ERR_BAD_REQUEST',
    '404',
    {} as InternalAxiosRequestConfig,
    {},
    {
      data: { message: 'Las credenciales suministradas son incorrectas' },
      status: 404,
      statusText: '',
      headers: {},
      config: {},
    } as AxiosResponse,
  ],
)
