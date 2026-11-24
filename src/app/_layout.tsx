import { DarkTheme, DefaultTheme, ThemeProvider, Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import '../global.css';

import { CarrinhoProvider } from '../components/carrinho/Carrinho';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CarrinhoProvider>
        <Slot />
      </CarrinhoProvider>
    </ThemeProvider>
  );
}