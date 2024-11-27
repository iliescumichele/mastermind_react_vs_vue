'use client'
import { useState, useCallback, useEffect } from 'react'
import styles from './list.module.scss'
import type { Product } from '../mockData'

interface Props {
	products: Product[]
	inputValue: string
}

export default function NoMemoList({ products, inputValue }: Props) {
	const [renderCount, setRenderCount] = useState(1)
	const [calculationResult, setCalculationResult] = useState<{ total: number; time: number }>({ total: 0, time: 0 })

	console.log('inputValue', inputValue)

	// Funzione che simula un calcolo pesante
	const expensiveCalculation = useCallback((items: Product[]): { total: number; time: number } => {
		const startTime = performance.now()

		// Simuliamo un calcolo pesante con un loop
		let result = 0
		for (let i = 0; i < 15_000_000; i++) {
			result += Math.random()
		}

		// Calcolo effettivo sui prodotti
		const total = items.reduce((acc, item) => acc + item.price + Math.random(), 0)

		const endTime = performance.now()

		return {
			total,
			time: endTime - startTime
		}
	}, [])

	// Eseguiamo il calcolo quando cambiano i products o l'input
	useEffect(() => {
		const result = expensiveCalculation(products)
		setCalculationResult(result)
		setRenderCount((prev) => prev + 1)
	}, [products, expensiveCalculation, inputValue])

	return (
		<div className={styles.list}>
			<div className="space-y-2">
				<p className={styles.statRow}>
					Tempo di esecuzione: <span className={styles.timeValue}>{calculationResult.time.toFixed(2)}ms</span>
				</p>
				<p className={styles.statRow}>
					Totale calcolato: <span className={styles.totalValue}>${calculationResult.total.toFixed(2)}</span>
				</p>
				<p className={styles.statRow}>
					Numero di renderizzazioni: <span className={styles.renderValue}>{renderCount}</span>
				</p>
				<p className={styles.statRow}>
					Input corrente: <span className={styles.inputValue}>{inputValue || '(vuoto)'}</span>
				</p>
			</div>
			<div className={styles.explanation}>
				<p>⚠️ Questo componente ricalcola il totale ad ogni render</p>
				<p>Nota come il calcolo viene eseguito ad ogni modifica dell'input!</p>
				<p className={styles.warning}>
					Il calcolo viene eseguito anche quando non necessario, impattando le performance
				</p>
			</div>
		</div>
	)
}
