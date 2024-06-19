import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export const loginError = new AxiosError(
  ...[
    'FORBIDDEN',
    '401',
    {} as InternalAxiosRequestConfig,
    {},
    {
      data: { message: 'Las credenciales suministradas son incorrectas', status: 401 },
      status: 401,
      statusText: '',
      headers: {},
      config: {},
    } as AxiosResponse,
  ],
)
