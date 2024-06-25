import NotificationsIcon from '@mui/icons-material/Notifications'
import { ParentProps, StudentProps, isParent } from 'root/src/models/interfaces/User'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import './UserCard.scss'

interface UserCardProps {
  user: ParentProps | StudentProps
}

export const UserCard = ({ user }: UserCardProps) => {
  const { firstName, lastName, email, phoneNumber } = user

  const navigate = useNavigate()

  return (
    <article className="user-card" data-testid={'allusers'}>
      <div className="user-card__name" data-testid={'allusersname'}>
        <div className="text text--strong text--md text--white">
          {firstName} {lastName}
        </div>
        {isParent(user) && (
          <IconButton
            style={{ borderRadius: '1em', background: 'var(--color-white)' }}
            onClick={() =>
              navigate('/create_notification', {
                state: {
                  formState: {
                    title: '',
                    content: '',
                    priority: '',
                    recipients: [user],
                    recipientGroups: [],
                  },
                },
              })
            }
          >
            <NotificationsIcon style={{ fontSize: '1.1em', color: 'var(--color-secondary)' }} />
          </IconButton>
        )}
      </div>
      {isParent(user) && user.children!.length > 0 && (
        <div className="text text--white text--xs">
          <span className="text--strong">HIJOS: </span>
          {user.children!.map((child, index) => (
            <span key={index}>
              <span>
                {child.firstName} {child.lastName}
              </span>
              {index !== user.children!.length - 1 && <>, </>}
            </span>
          ))}
        </div>
      )}
      {!isParent(user) && (
        <div className="text text--white">
          <span className="text--strong">Ausencias: {user.absences}</span>
        </div>
      )}
      <div className="user-card__info">
        <div className="text text--xs text--white">
          <EmailIcon style={{ padding: '0 0.3em 0 0', color: 'var(--color-white)' }} />
          {email}
        </div>
        <div className="text text--xs text--white">
          <PhoneIcon style={{ padding: '0 0.3em 0 0', color: 'var(--color-white)' }} />
          {phoneNumber}
        </div>
      </div>
    </article>
  )
}
