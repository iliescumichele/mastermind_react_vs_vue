import { useTheme } from './ThemeContext'
import { useUser } from './UserContext'
import styles from './UserInfo.module.scss'

interface UserInfoProps {}

export const UserInfo: React.FC<UserInfoProps> = (props) => {
	const { user } = useUser()

	return (
		<div className={styles.userInfo}>
			<div className={styles.header}>
				<div className={styles.avatar}>{user.name}</div>
				<div className={styles.status}>
					<span>Newsletter: </span>
					<span className={`${styles.statusDot} ${user.preferences.newsletter ? styles.active : ''}`} />
					{user.preferences.newsletter ? 'yes' : 'no'}
				</div>
			</div>

			<div className={styles.details}>
				<h3>{user.name}</h3>
				<div className={styles.info}>
					<div className={styles.field}>
						<span className={styles.label}>Email:</span>
						<span className={styles.value}>{user.email}</span>
					</div>
					<div className={styles.field}>
						<span className={styles.label}>Notifications:</span>
						<span className={styles.value}>{user.preferences.notifications ? 'yes' : 'no'}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
