import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
/* Proveedor de sesión */
import AuthProvider from '@/providers/AuthProvider';
import theme from '@/constants/Theme';
/* Query provider */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TabLayout from './(drawer)/(tabs)/_layout';
import LocationProvider from '@/providers/LocationProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import UserProvider from '@/providers/UserProvider';
/* Idiomas */
import i18n from '@/i18n';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

/* Prevenir que la Splash Screen desaparezca -> de esta
forma, nosotros podemos hacer que desaparezca cuando queramos */
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  /* Fuente que usaré en la aplicación */
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  } 
  console.log(i18n.language)
  return (
    <AuthProvider>
      <LocationProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
              <BottomSheetModalProvider>
                <SafeAreaProvider style={{ backgroundColor: theme.colors.primary }}>
                  <RootLayoutNav />
                  <StatusBar style="light" />
                  <Toast />
                </SafeAreaProvider> 
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </UserProvider>
      </LocationProvider>
    </AuthProvider>
    
  );
}
 
function RootLayoutNav() {
  return ( 
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.primary }}
      edges={['left', 'right', 'bottom']}
    >   
      <Stack> 
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} /> 
      </Stack>
    </SafeAreaView>
  );
}
