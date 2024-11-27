'use client'

import { useTheme } from './ThemeContext'
import styles from './ThemeSwitcher.module.scss'

export function ThemeSwitcher() {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={`${styles.themeSwitcher} ${styles[theme]}`}>
			<p>Current theme: {theme}</p>
			<button type="button" onClick={toggleTheme}>
				Toggle Theme
			</button>
		</div>
	)
}
