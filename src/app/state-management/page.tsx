'use client'
import { useState } from 'react'
import styles from './StateManagement.module.scss'
import Link from 'next/link'
import BackButton from '../components/BackButton'

export default function StateManagementDemo() {
	const [count, setCount] = useState(0)
	const [text, setText] = useState('')

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<BackButton />

				<h1 className={styles.title}>useState vs ref</h1>

				<div className={styles.demoCard}>
					<div className={styles.counterSection}>
						<h2>Contatore</h2>
						<div className={styles.counterControls}>
							<button type="button" onClick={() => setCount((prev) => prev - 1)}>
								-
							</button>
							<span className={styles.counterValue}>{count}</span>
							<button type="button" onClick={() => setCount((prev) => prev + 1)}>
								+
							</button>
						</div>
					</div>

					<div className={styles.inputSection}>
						<h2>Input in tempo reale</h2>
						<input
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="Scrivi qualcosa..."
						/>
						<p className={styles.inputResult}>Hai scritto: {text}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
