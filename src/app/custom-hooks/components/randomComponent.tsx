'use client'

import { useCounter, useMemoFetch } from '../hooks/useCustomHooks'
import styles from './randomComponent.module.scss'

interface CounterProps {
	initialValue?: number
}

interface Todo {
	id: number
	title: string
	completed: boolean
	timestamp: string
}

export default function RandomComponent({ initialValue = 0 }: CounterProps) {
	const {
		data: todos,
		loading,
		error,
		refresh
	} = useMemoFetch<Todo[]>(
		'https://jsonplaceholder.typicode.com/todos',
		10000 // cache per 10 secondi
	)

	const isLoading = () => (loading ? <p className={styles.loadingMessage}>Loading...</p> : null)

	const isError = () => (error ? <p className={styles.errorMessage}>Error: {error}</p> : null)

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Random Component</h2>
			{isLoading()}
			{isError()}

			{todos && (
				<>
					<button type="button" onClick={refresh} className={styles.refreshButton}>
						Refresh Data
					</button>
					<ul className={styles.todoList}>
						{todos.map((todo) => (
							<li key={todo.id}>{todo.title}</li>
						))}
					</ul>
				</>
			)}
		</section>
	)
}
