import './Auth.scss'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LoginArgs } from 'src/model/interfaces/types'
import { errorHandler } from 'src/model/errors/ErrorHandler'
import { authService } from 'src/services/authService'

export const Auth = () => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<LoginArgs>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginArgs> = async (data) => {
    try {
      await authService.login(data)
      navigate('/parent')
    } catch (error) {
      setErrorMsg(errorHandler(error as AxiosError))
    }
  }

  return (
    <article className="login shadow shadow--big">
      <img className="login__logo" src="/images/logo.png" alt="SchoolSync" />
      <form className="login__form" onSubmit={handleSubmit(onSubmit)} noValidate data-testid="login-form">
        <div className="login__input">
          <label className="text text--light">Usuario</label>
          <input
            className="field field--rounded shadow animated"
            autoFocus={true}
            {...register('username', { required: 'Ingrese un nombre de usuario.' })}
            data-testid="login-username"
          />
          {errors.username && <span className="login__error">{errors.username.message}</span>}
        </div>
        <div className="login__input">
          <label className="text text--light">Contraseña</label>
          <input
            className="field field--rounded shadow animated"
            {...register('password', { required: 'Ingrese El password.' })}
            type="password"
            data-testid="login-password"
          />
          {errors.password && <span className="login__error">{errors.password.message}</span>}
        </div>
        {errorMsg && (
          <span className="login__error" data-testid="login-error">
            {errorMsg}
          </span>
        )}

        <button
          className="button button--primary button--tall button--rounded text--md text--strong text--spaced animated shadow--box"
          disabled={!isDirty || !isValid || isSubmitting}
          type="submit"
          data-testid="login-submit"
        >
          Enviar
        </button>
      </form>
    </article>
  )
}
