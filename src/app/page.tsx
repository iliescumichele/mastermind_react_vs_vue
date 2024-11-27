import { Suspense } from 'react'
import Link from 'next/link'

export default function Home() {
	return (
		<div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			<main className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-8 text-center text-slate-800 dark:text-white">
					React vs Vue: Concetti Paralleli
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Link
						href="/state-management"
						className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
					>
						<h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">useState vs ref</h2>
						<p className="text-slate-600 dark:text-slate-300">Gestione dello stato locale nei componenti</p>
					</Link>

					<Link
						href="/computed"
						className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
					>
						<h2 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">useMemo vs computed</h2>
						<p className="text-slate-600 dark:text-slate-300">Valori calcolati e memorizzazione</p>
					</Link>

					<Link
						href="/custom-hooks"
						className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
					>
						<h2 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Hooks vs Composables</h2>
						<p className="text-slate-600 dark:text-slate-300">Logica riutilizzabile tra componenti</p>
					</Link>

					<Link
						href="/global-state"
						className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
					>
						<h2 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Redux vs Pinia</h2>
						<p className="text-slate-600 dark:text-slate-300">Gestione dello stato globale</p>
					</Link>

					<Link
						href="/context"
						className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
					>
						<h2 className="text-xl font-semibold mb-3 text-amber-600 dark:text-amber-400">Context vs Provide/Inject</h2>
						<p className="text-slate-600 dark:text-slate-300">
							Condivisione dei dati attraverso l'albero dei componenti
						</p>
					</Link>
				</div>
			</main>
		</div>
	)
}
