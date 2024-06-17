import './Login.scss'
import { LoginArgs } from 'models/interfaces/types'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { authService } from 'services/AuthService'
import { errorHandler } from 'models/errors/ErrorHandler'
import { UsePasswordToggle } from 'components/hooks/usePasswordToggle'
import { Button } from 'components/basic/Button/Button'

export const Login = () => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [PasswordInputType, ToggleIcon] = UsePasswordToggle()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginArgs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginArgs> = async (data) => {
    try {
      await authService.login(data)
      const role = authService.getUserRole()
      role === 'ADMIN' ? navigate('/deleteNotification') : navigate('/notificationsDashboard')
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
            <input
              id="username"
              className="field field--rounded animated shadow"
              autoFocus={true}
              {...register('email', { required: 'Ingrese un nombre de usuario.' })}
              data-testid="login-username"
              required
            />
            <label className="field__label text text--light" htmlFor="username">
              {errors.email ? <span className="login__error">{errors.email.message}</span> : 'Usuario'}
            </label>
          </div>

          <div className="field__container">
            <input
              className="field field--rounded shadow animated"
              {...register('password', { required: 'Ingrese El password.' })}
              type={PasswordInputType as string}
              data-testid="login-password"
              required
            />
            <label className="field__label text text--light">
              {errors.password ? <span className="login__error">{errors.password.message}</span> : 'Contraseña'}{' '}
            </label>
            <span className="field__eye-icon text text--light">{ToggleIcon}</span>
          </div>

          {errorMsg && (
            <span className="login__error" data-testid="login-error">
              {errorMsg}
            </span>
          )}
        </section>
        <Button text={'enviar'} fullWidth taller rounded animated />
      </form>
    </article>
  )
}
