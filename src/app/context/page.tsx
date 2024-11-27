'use client'

import { createContext, useContext, useState } from 'react'
import styles from './styles.module.scss'
import { ThemeProvider } from './components/ThemeContext'
import { UserProvider } from './components/UserContext'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { UserProfile } from './components/UserProfile'
import { UserSettings } from './components/UserSettings'
import { UserInfo } from './components/UserInfo'

export default function ReactContextPage() {
	return (
		<div className={styles.container}>
			<h1>React Context Examples</h1>
			<p>
				React Context provides a way to pass data through the component tree without having to pass props manually at
				every level.
			</p>

			<section className={styles.example}>
				<h2>Theme Context Example</h2>
				<ThemeProvider>
					<div className={styles.themeDemo}>
						<ThemeSwitcher />
					</div>
				</ThemeProvider>
			</section>

			<section className={styles.example}>
				<h2>User Context Example</h2>
				<UserProvider>
					<div className={styles.userDemo}>
						<UserProfile />
						<UserSettings />
						<UserInfo />
					</div>
				</UserProvider>
			</section>
		</div>
	)
}
