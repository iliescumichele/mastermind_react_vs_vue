'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

// Definizione dell'interfaccia User che descrive la struttura dei dati utente
interface User {
	name: string
	email: string
	preferences: {
		notifications: boolean
		newsletter: boolean
	}
}

// Interfaccia che definisce il tipo del contesto, includendo lo stato e i metodi di aggiornamento
interface UserContextType {
	user: User
	updateUser: (updates: Partial<User>) => void // Permette aggiornamenti parziali dell'utente
	updatePreferences: (updates: Partial<User['preferences']>) => void // Permette aggiornamenti parziali delle preferenze
}

/**
 * createContext crea un oggetto Context che può essere utilizzato per condividere dati
 * attraverso l'albero dei componenti senza dover passare props manualmente ad ogni livello.
 * 
 * Il valore undefined come default indica che il contesto deve essere utilizzato con un Provider,
 * altrimenti lancerà un errore quando viene consumato.
 */
const UserContext = createContext<UserContextType | undefined>(undefined)

/**
 * UserProvider è un componente che utilizza il pattern Provider di React.
 * 
 * Il Provider è un componente che accetta una prop 'value' e la rende disponibile
 * a tutti i componenti figli nell'albero, indipendentemente da quanto siano annidati.
 * Questo permette di evitare il "prop drilling".
 * 
 * @param children - I componenti figli che avranno accesso al contesto
 */
export function UserProvider({ children }: { children: ReactNode }) {
	// Stato iniziale dell'utente con valori di default
	const [user, setUser] = useState<User>({
		name: 'Mario Rossi',
		email: 'mario.rossi@example.com',
		preferences: {
			notifications: true,
			newsletter: false
		}
	})

	// Funzione per aggiornare i dati dell'utente mantenendo i valori esistenti non modificati
	const updateUser = (updates: Partial<User>) => {
		setUser((prev) => ({ ...prev, ...updates }))
	}

	// Funzione specifica per aggiornare le preferenze mantenendo altre preferenze non modificate
	const updatePreferences = (updates: Partial<User['preferences']>) => {
		setUser((prev) => ({
			...prev,
			preferences: { ...prev.preferences, ...updates }
		}))
	}

	// Il Provider avvolge i children e fornisce il valore del contesto
	// Tutti i componenti discendenti possono accedere a questo valore
	return <UserContext.Provider value={{ user, updateUser, updatePreferences }}>{children}</UserContext.Provider>
}

/**
 * useUser è un Custom Hook che semplifica l'accesso al contesto.
 * 
 * Utilizza useContext internamente e aggiunge un controllo di sicurezza
 * per assicurarsi che il hook sia utilizzato all'interno di un Provider.
 * 
 * @throws {Error} Se utilizzato fuori da un UserProvider
 * @returns {UserContextType} Il contesto dell'utente con i suoi metodi
 */
export function useUser() {
	const context = useContext(UserContext)
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}
