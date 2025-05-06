import { StyleSheet, Text, View } from 'react-native'
import { createContext, useState, useEffect, useContext} from 'react'
import { Session } from '@supabase/supabase-js'
import { router } from 'expo-router'
import { supabase } from '@/lib/supabase'

type AuthData = {
	loading: boolean;
	session: Session | null; 
}

const AuthContext = createContext<AuthData>({
	loading: true,
	session: null,
})
 
/**
 * Propiedad que acepta nuestro provider para poder renderizar el resto de la aplicacion, 
 * ya que nuestro provider es el padre de toda la aplicacion
 */
interface Props {
	children: React.ReactNode;
}

export default function AuthProvider(props: Props) {
	const [loading, setLoading] = useState<boolean>(true);
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		/* Mirar dentro de supabase si el usuario tiene ya una sesión iniciada */
		async function fetchSession() {
			const { error, data } = await supabase.auth.getSession();

			if (error) {
				throw error;
			}

			/* 
			* Si el usuario tiene sesión -> Al Home
			* Si el usuario no tiene sesión -> Al Login
			*/
			if (data.session)  {
				setSession(data.session);
				router.replace('/Home');
			} else {
				router.replace('/login');
			}
		}

		fetchSession();

		/* Si el usuario se loguea, actualizo la sesión -> Me suscribo al cambio de estado */
		const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
			setSession(session);
			setLoading(false);

			if (session) {
				router.replace('/Home'); // Si el usuario ha iniciado sesión -> Al Home
			} else {
				router.replace('/login');
			}
		})

		/* Listener que en el caso de estar activo, cuando el componente se desmonte, el listener se desactiva */
		return () => {
			authListener?.subscription.unsubscribe();
		}
	}, [])

	return (
		<AuthContext.Provider value={{ loading, session }}>
			{ props.children }
		</AuthContext.Provider>
	)
}

/* Exporto el hook */
export const useAuth = () => useContext(AuthContext);