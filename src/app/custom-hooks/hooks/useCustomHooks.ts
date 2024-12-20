import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

// Creiamo uno store globale fuori dall'hook
let globalCount = 0

// Array di funzioni di callback per notificare i cambiamenti
const listeners = new Set<(count: number) => void>()

// Hook per gestire un contatore con persistenza locale
export const useCounter = () => {
	// Utilizziamo lo state locale per forzare i re-render
	const [count, setLocalCount] = useState<number>(globalCount)

	useEffect(() => {
		// Funzione che aggiorna lo state locale quando cambia il valore globale
		const handleChange = (newCount: number) => {
			setLocalCount(newCount)
		}

		// Registriamo il listener
		listeners.add(handleChange)

		// Pulizia quando il componente viene smontato
		return () => {
			listeners.delete(handleChange)
		}
	}, [])

	// Funzioni di update che modificano il valore globale
	const increment = () => {
		globalCount += 1
		listeners.forEach((listener) => listener(globalCount))
	}

	const decrement = () => {
		globalCount -= 1
		listeners.forEach((listener) => listener(globalCount))
	}

	const reset = () => {
		globalCount = 0
		listeners.forEach((listener) => listener(globalCount))
	}

	return { count, increment, decrement, reset }
}

// Hook per gestire lo stato di caricamento e gli errori
export const useFetchData = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await fetch(url)
				if (!response.ok) throw new Error('Errore nel caricamento dei dati')
				const result = await response.json()
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Errore sconosciuto')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [url])

	return { data, loading, error }
}

// Hook per gestire form inputs
export const useFormInput = (initialValue: string) => {
	const [value, setValue] = useState(initialValue)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const reset = () => setValue(initialValue)

	return {
		value,
		onChange: handleChange,
		reset
	}
}

interface CachedData<T> {
	data: T | null
	timestamp: number
}

// Hook per gestire il fetching dei dati con memorizzazione
export const useMemoFetch = <T>(url: string, cacheTime = 5000) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	// Memorizziamo la cache in un ref per mantenerla tra i render
	const cache = useRef<Map<string, CachedData<T>>>(new Map())

	// Memorizziamo la funzione di fetch
	const fetchData = useMemo(
		() => async () => {
			try {
				setLoading(true)

				// Controlliamo se abbiamo dati in cache validi
				const cachedItem = cache.current.get(url)
				const now = Date.now()

				if (cachedItem && now - cachedItem.timestamp < cacheTime) {
					setData(cachedItem.data)
					setLoading(false)
					return
				}

				const response = await fetch(url)
				if (!response.ok) throw new Error('Errore nel caricamento dei dati')

				const result = await response.json()

				// Aggiorniamo la cache
				cache.current.set(url, {
					data: result,
					timestamp: now
				})

				setData(result)
				setError(null)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Errore sconosciuto')
				setData(null)
			} finally {
				setLoading(false)
			}
		},
		[url, cache]
	)

	// Memorizziamo i dati processati
	const processedData = useMemo(() => {
		if (!data) return null

		// Esempio di elaborazione dei dati
		if (Array.isArray(data)) {
			return data.map((item) => ({
				...item,
				processed: true,
				timestamp: new Date().toISOString()
			}))
		}

		return {
			...data,
			processed: true,
			timestamp: new Date().toISOString()
		}
	}, [data])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	// Funzione per forzare il refresh dei dati
	const refresh = useCallback(() => {
		cache.current.delete(url)
		fetchData()
	}, [fetchData, url])

	return {
		data: processedData,
		loading,
		error,
		refresh
	}
}
