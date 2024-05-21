import './login.scss'
import { LoginArgs } from 'models/interfaces/types'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { authService } from 'services/AuthService'
import { errorHandler } from 'models/errors/ErrorHandler'
import { Link } from 'react-router-dom'
import UsePasswordToggle from 'components/hooks/usePasswordToggle'

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
    <div className="container">
      <article className="login shadow shadow--big backColor">
        <div className='logoName inputTitle'>
        SchoolSyncAr
        </div>
        <img className="login__logo" src="/images/logo.png" alt="SchoolSync" />
        <form className="login__form" onSubmit={handleSubmit(onSubmit)} noValidate data-testid="login-form">
          {/* <label className="text text--light itle">Usuario</label> */}
          <div className="login__input centerInputs">
            <div className='inputBox'>
              <input
                className="field field--rounded animated ishadow"
                autoFocus={true}
                {...register('email', { required: 'Ingrese un nombre de usuario.' })}
                data-testid="login-username"
                required
              />
              <label>Usuario</label>
            </div>
            {errors.email && <span className="login__error">{errors.email.message}</span>}
          </div>
{/* <label className="text text--light inputTitle">Contraseña</label> */}
          
          <div className="login__input centerInputs">
            <div className='inputBox'>
              <input
                className="field field--rounded ishadow animated"
                {...register('password', { required: 'Ingrese El password.' })}
                type={PasswordInputType as string}
                data-testid="login-password"
                required
              />
              <label>Contraseña</label>
              <span className='password-toggle-icon'>{ ToggleIcon}</span>
              {errors.password && <span className="login__error">{errors.password.message}</span>}
            </div>
            {errorMsg && (
              <span className="login__error" data-testid="login-error">
                {errorMsg}
              </span>
            )}
          </div>
          <div className='inputTitle'>
            <button
              className="button button--primary button--tall button--rounded text--md text--strong text--spaced animated shadow--box button1 send-button"
              disabled={!isDirty || !isValid || isSubmitting}
              type="submit"
              data-testid="login-submit"
            >
              <Link to="parentDashboard">Enviar</Link>
            </button>
          </div>
        </form>
      </article>
    </div>
  )
}