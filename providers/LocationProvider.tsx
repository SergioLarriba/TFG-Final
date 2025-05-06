import * as Location from 'expo-location'
import { useEffect, useState, createContext, useContext } from 'react';

type LocationContextType = {
	location: Location.LocationObjectCoords | null;
	getCurrentLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType>({
	location: null,
	getCurrentLocation: async () => {}, // Placeholder por defecto
});

interface Props {
	children: React.ReactNode;
}

export default function LocationProvider({ children }: Props) {
	const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
	const [error, setErrorMsg] = useState<string>('');

	const getCurrentLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		}
	
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location.coords);
	};

	useEffect(() => {
		getCurrentLocation(); // Solicita ubicación al montar
	}, []);

	return (
		<LocationContext.Provider value={{ location, getCurrentLocation }}>
			{children}
		</LocationContext.Provider>
	);
}

export const useLocation = () => useContext(LocationContext);
