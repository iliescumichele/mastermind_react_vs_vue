'use client'
import { useState } from 'react'
import styles from '../Computed.module.scss'
import { mockProducts } from '../mockData'
import MemoList from '../components/MemoList'
import Link from 'next/link'

export default function WithMemoDemo() {
	const [inputText, setInputText] = useState('')

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Link href="/computed" className={styles.backButton}>
					← Torna alla selezione
				</Link>
				<h1 className={styles.title}>Demo con useMemo</h1>

				<div className={styles.inputSection}>
					<input
						type="text"
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						placeholder="Scrivi qualcosa per forzare un re-render..."
						className="w-full p-2 mb-2 border rounded dark:bg-slate-700 border-slate-300 
                                   dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<p className="text-sm text-slate-600 dark:text-slate-400">
						Valore corrente:{' '}
						<span className="font-medium text-blue-500 dark:text-blue-400">{inputText || '(vuoto)'}</span>
					</p>
				</div>

				<div className={styles.demoContainer}>
					<MemoList products={mockProducts} inputValue={inputText} />
				</div>
			</div>
		</div>
	)
}
