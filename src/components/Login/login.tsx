import './Login.scss'
import { LoginArgs } from 'models/interfaces/types'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { authService } from 'services/AuthService'
import { errorHandler } from 'models/errors/ErrorHandler'
import { Link } from 'react-router-dom'
import { UsePasswordToggle } from 'components/hooks/usePasswordToggle'

export const Login = () => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [PasswordInputType, ToggleIcon] = UsePasswordToggle()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<LoginArgs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginArgs> = async (data) => {
    try {
      await authService.login(data)
      navigate('/parentDashboard')
    } catch (error) {
      setErrorMsg(errorHandler(error as AxiosError))
    }
  }

  useEffect(() => {
    authService.clearUser()
  }, [])

  return (
    <article className="login shadow shadow--big">
      <section className="login__logo centered">
        <h1 className="login__brand">
          School<span className="login__brand--lt">SyncAr</span>
        </h1>
        <img className="login__img" src="/images/logo.png" alt="SchoolSync" />
      </section>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)} noValidate data-testid="login-form">
        <section className="login__inputs incolumn">
          <div className="field__container">
            <label className="field__label text text--light">Usuario</label>
            <input
              className="field field--rounded animated shadow"
              autoFocus={true}
              {...register('email', { required: 'Ingrese un nombre de usuario.' })}
              data-testid="login-username"
              required
            />
          </div>
          {errors.email && <span className="login__error">{errors.email.message}</span>}

          <div className="login__input">
            <div className="field__container">
              <label className="field__label text text--light">
                Contraseña<span className="password-toggle-icon">{ToggleIcon}</span>
              </label>
              <input
                className="field field--rounded shadow animated"
                {...register('password', { required: 'Ingrese El password.' })}
                type={PasswordInputType as string}
                data-testid="login-password"
                required
              />
            </div>

            {errors.password && <span className="login__error">{errors.password.message}</span>}
          </div>
          {errorMsg && (
            <span className="login__error" data-testid="login-error">
              {errorMsg}
            </span>
          )}
        </section>
        <button
          className="button button--primary button--tall button--rounded text--md text--strong text--spaced animated shadow--box button1 send-button"
          disabled={!isDirty || !isValid || isSubmitting}
          type="submit"
          data-testid="login-submit"
        >
          <Link to="parentDashboard">Enviar</Link>
        </button>
      </form>
    </article>
  )
}
