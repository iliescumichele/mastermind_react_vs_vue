'use client'

import { useUser } from './UserContext'
import styles from './UserProfile.module.scss'

export function UserSettings() {
	const { user, updatePreferences } = useUser()

	return (
		<div className={styles.userSettings}>
			<h3>User Settings</h3>
			<div className={styles.field}>
				<label>
					<input
						type="checkbox"
						checked={user.preferences.notifications}
						onChange={(e) => updatePreferences({ notifications: e.target.checked })}
					/>
					Enable Notifications
				</label>
			</div>
			<div className={styles.field}>
				<label>
					<input
						type="checkbox"
						checked={user.preferences.newsletter}
						onChange={(e) => updatePreferences({ newsletter: e.target.checked })}
					/>
					Subscribe to Newsletter
				</label>
			</div>
		</div>
	)
}
