'use client'

import styles from './styles.module.scss'
import { useCounter, useMemoFetch, useFormInput } from './hooks/useCustomHooks'
import RandomComponent from './components/randomComponent'

interface Todo {
	id: number
	title: string
	completed: boolean
	timestamp: string
}

export default function CustomHooksDemo() {
	// Utilizzo del hook useCounter
	const { count, increment, decrement, reset } = useCounter(0)

	// Utilizzo del nuovo hook useMemoFetch invece di useFetchData
	const {
		data: todos,
		loading,
		error,
		refresh
	} = useMemoFetch<Todo[]>(
		'https://jsonplaceholder.typicode.com/todos',
		10000 // cache per 10 secondi
	)

	// Utilizzo del hook useFormInput
	const nameInput = useFormInput('')
	const emailInput = useFormInput('')

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Demo Custom Hooks React</h1>

			{/* Sezione Counter */}
			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>useCounter Demo</h2>
				<div className={styles.counterControls}>
					<button
						type="button"
						onClick={decrement}
						className={`${styles.button} ${styles.primary}`}
						aria-label="Decrementa"
					>
						-
					</button>
					<span className={styles.counterValue}>{count}</span>
					<button
						type="button"
						onClick={increment}
						className={`${styles.button} ${styles.primary}`}
						aria-label="Incrementa"
					>
						+
					</button>
					<button type="button" onClick={reset} className={`${styles.button} ${styles.secondary}`}>
						Reset
					</button>
				</div>
			</section>

			{/* Sezione Form Input */}
			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>useFormInput Demo</h2>
				<div className={styles.formInputs}>
					<input {...nameInput} placeholder="Nome" className={styles.input} />
					<input {...emailInput} placeholder="Email" className={styles.input} />
					<div>
						<p>Nome inserito: {nameInput.value}</p>
						<p>Email inserita: {emailInput.value}</p>
					</div>
				</div>
			</section>

			{/* Sezione Fetch Data */}
			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>useMemoFetch Demo</h2>
				<div className="mb-4">
					<button type="button" onClick={refresh} className={`${styles.button} ${styles.secondary}`}>
						Ricarica Dati
					</button>
				</div>
				{loading && <p>Caricamento...</p>}
				{error && <p className={styles.errorText}>Errore: {error}</p>}
				{todos && (
					<ul className={styles.todoList}>
						{todos.slice(0, 5).map((todo) => (
							<li key={todo.id} className={todo.completed ? styles.completedTodo : ''}>
								{todo.title}
								<small className="block text-xs text-gray-500">{todo.timestamp}</small>
							</li>
						))}
					</ul>
				)}
			</section>

			<RandomComponent />
		</div>
	)
}
