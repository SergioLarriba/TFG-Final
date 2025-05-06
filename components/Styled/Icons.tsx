import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IconProps {
	color?: any, 	
	size?: number,
	props?: any
	style?: any, 
}


/* Drawer Icons */
export function HomeIcon(props: IconProps) {
  return <Ionicons name="home" size={24} {...props} />;
}

export function HomeIconOutline(props: IconProps) {
  return <Ionicons name="home-outline" size={24} {...props} />;
}

export function HeartIcon(props: IconProps) {
  return <Ionicons name="heart" size={24} {...props} />;
}

export function HeartIconOutline(props: IconProps) {
  return <Ionicons name="heart-outline" size={24} {...props} />;
}

export function PersonIcon(props: IconProps) {
  return <Ionicons name="person" size={24} {...props} />;
}

export function PersonIconOutline(props: IconProps) {
  return <Ionicons name="person-outline" size={24} {...props} />;
}

export function SettingsIcon(props: IconProps) {
  return <Ionicons name="settings" size={24} {...props} />;
}

export function SettingsIconOutline(props: IconProps) {
  return <Ionicons name="settings-outline" size={24} {...props} />;
}

export function MailIcon(props: IconProps) {
  return <Ionicons name="mail" size={24} {...props} />;
}

export function MailIconOutline(props: IconProps) {
  return <Ionicons name="mail-outline" size={24} {...props} />;
}

export function LogOutIcon(props: IconProps) {
  return <Ionicons name="log-out" size={24} {...props} />;
}

export function LogOutIconOutline(props: IconProps) {
  return <Ionicons name="log-out-outline" size={24} {...props} />;
}

/* Bottom Tab Bar Icons */
export function RestaurantIcon (props: IconProps) {
	return <Ionicons name="restaurant" size={24} {...props} />
}

export function RestaurantIconOutline (props: IconProps) {
	return <Ionicons name="restaurant-outline" size={24} {...props} />
}

export function RobotIcon (props: IconProps) {
	return <MaterialCommunityIcons name="robot-happy" size={26} {...props} />
}

export function RobotIconOutline (props: IconProps) {
	return <MaterialCommunityIcons name="robot-happy-outline" size={26} {...props} />
}

export function ProductIcon (props: IconProps) {
	return <FontAwesome6 name="wheat-awn-circle-exclamation" size={24} {...props} />
}

export function ProductIconOutline (props: IconProps) {
	return <FontAwesome6 name="wheat-awn" size={24} {...props} />
}

export function ReceipIcon (props: IconProps) {
	return <Ionicons name="receipt" size={24} {...props} />
}

export function ReceipIconOutline (props: IconProps) {
	return <Ionicons name="receipt-outline" size={24} {...props} />
}

/* Resto de los iconos */
export function AddPhoto (props: IconProps) {
	return <MaterialIcons name="add-a-photo" size={25} {...props} />
}

export function CameraIcon (props: IconProps) {
	return <Ionicons name="camera-outline" {...props} />
}

export function StarIcon (props: IconProps) {
	return <Ionicons name="star" {...props} />
}

export function LocationIcon (props: IconProps) {
	return <Ionicons name="location-sharp" {...props} />
}

export function FilledHeartIcon(props: IconProps) {
	return <Ionicons name='heart' size={24} {...props} />
}

export function FiltersIcon(props: IconProps) {
	return <Ionicons name='filter' size={24} {...props} />
}

export function MapIcon(props: IconProps) {
	return <MaterialCommunityIcons name='map' size={24} {...props} />
}

export function SearchIcon(props: IconProps) {
	return <Ionicons name="search-outline" size={24} {...props} />
}