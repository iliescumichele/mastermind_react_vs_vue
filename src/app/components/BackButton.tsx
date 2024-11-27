import Link from 'next/link'

export default function BackButton() {
	return (
		<div className="w-full flex mb-6">
			<Link
				href="/"
				className="group inline-flex items-center gap-2 px-4 py-2.5
					bg-white dark:bg-slate-800 rounded-lg 
					hover:bg-slate-50 dark:hover:bg-slate-700
					shadow-[0_2px_8px_rgba(0,0,0,0.04)]
					hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]
					transition-all duration-300 ease-out
					text-slate-600 dark:text-slate-300 
					hover:text-slate-900 dark:hover:text-white
					border border-slate-200/75 dark:border-slate-700
					hover:border-slate-300 dark:hover:border-slate-600
					transform hover:-translate-y-0.5"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden="true"
					className="transform transition-transform duration-300 ease-out
							 group-hover:-translate-x-0.5 group-hover:scale-110"
				>
					<path
						d="M6.5 3L2 7.5L6.5 12M2.5 7.5H14"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span
					className="font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[2px] 
								after:w-0 after:bg-current after:transition-all after:duration-300
								group-hover:after:w-full"
				>
					Torna alla Home
				</span>
			</Link>
		</div>
	)
}
