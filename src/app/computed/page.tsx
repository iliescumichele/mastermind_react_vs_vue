'use client'
import Link from 'next/link'
import styles from './Computed.module.scss'
import BackButton from '../components/BackButton'

export default function ComputedDemo() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<BackButton />
				<h1 className={styles.title}>Performance Demo: useMemo</h1>

				<div className={styles.demoSelection}>
					<Link href="/computed/no-memo" className={styles.demoLink}>
						<div className={styles.demoCard}>
							<h2>Demo senza useMemo</h2>
							<p>Vedi come le performance peggiorano senza memorizzazione</p>
						</div>
					</Link>

					<Link href="/computed/with-memo" className={styles.demoLink}>
						<div className={styles.demoCard}>
							<h2>Demo con useMemo</h2>
							<p>Scopri come useMemo ottimizza le performance</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}
