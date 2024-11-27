'use client'
import { useState, useMemo, useEffect, useCallback } from 'react'
import styles from './list.module.scss'
import type { Product } from '../mockData'

interface Props {
	products: Product[]
	inputValue: string
}

export default function MemoList({ products, inputValue }: Props) {
	const [executionTime, setExecutionTime] = useState<number>(0)
	const [renderCount, setRenderCount] = useState(1)
	const [forceUpdate, setForceUpdate] = useState(0)

	// Funzione che simula un calcolo pesante
	const expensiveCalculation = useCallback(
		(items: Product[]): number => {
			// Simuliamo un calcolo pesante con un loop
			let result = Math.random()
			for (let i = 0; i < 15_000_000; i++) {
				result += Math.random()
			}

			// Calcolo effettivo sui prodotti
			return items.reduce((acc, item) => acc + item.price + Math.random(), 0)
		},
		[forceUpdate]
	)

	// useMemo memorizza il risultato e lo ricalcola solo quando products cambia
	const total = useMemo(() => {
		setRenderCount((prev) => prev + 1)
		return expensiveCalculation(products)
	}, [products, expensiveCalculation])

	useEffect(() => {
		const startTime = performance.now()
		expensiveCalculation(products)
		const endTime = performance.now()
		setExecutionTime(endTime - startTime)
	}, [products, expensiveCalculation])

	const handleForceRecalculation = () => {
		setForceUpdate((prev) => prev + 1)
	}

	return (
		<div className={styles.list}>
			<div className="space-y-2">
				<p className={styles.statRow}>
					Tempo di esecuzione: <span className={styles.timeValue}>{executionTime.toFixed(2)}ms</span>
				</p>
				<p className={styles.statRow}>
					Totale calcolato: <span className={styles.totalValue}>${total.toFixed(2)}</span>
				</p>
				<p className={styles.statRow}>
					Numero di calcoli: <span className={styles.renderValue}>{renderCount}</span>
				</p>
				<p className={styles.statRow}>
					Input corrente: <span className={styles.inputValue}>{inputValue || '(vuoto)'}</span>
				</p>
				<button type="button" onClick={handleForceRecalculation} className={`${styles.forceButton} ${styles.withMemo}`}>
					Forza Nuovo Calcolo
				</button>
			</div>
			<div className={styles.explanation}>
				<p>✅ Questo componente usa useMemo per memorizzare il risultato</p>
				<p>Nota come il calcolo viene eseguito solo quando necessario!</p>
				<p className={styles.success}>Il tempo di esecuzione rimane costante nonostante i render</p>
			</div>
		</div>
	)
}
