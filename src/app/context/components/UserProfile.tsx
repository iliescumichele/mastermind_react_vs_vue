'use client'

import { useUser } from './UserContext'
import styles from './UserProfile.module.scss'

export function UserProfile() {
	const { user, updateUser } = useUser()

	return (
		<div className={styles.userProfile}>
			<h3>User Profile</h3>
			<div className={styles.field}>
				<label>Name:</label>
				<input type="text" value={user.name} onChange={(e) => updateUser({ name: e.target.value })} />
			</div>
			<div className={styles.field}>
				<label>Email:</label>
				<input type="email" value={user.email} onChange={(e) => updateUser({ email: e.target.value })} />
			</div>
		</div>
	)
}
