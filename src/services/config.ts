export function handleError(error: { response: { data: { message: any } }; request: any }) {
  if (error.response) {
    return error.response.data.message
  } else if (error.request) {
    return 'ha ocurrido un error inesperado al conectar con el servidor, por favor, intente de nuevo mas tarde'
  } else {
    return 'se produjo un error inesperado'
  }
}

export const { REACT_APP_REST_SERVER_URL, REACT_APP_USER_KEY_STORAGE } = process.env
