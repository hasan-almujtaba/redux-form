import { AppPropsWithLayout } from '../types/layout'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'
import { useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { Provider } from 'react-redux'
import { store } from 'store'

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  /**
   * Use the layout defined at the page level, if available
   * @see https://nextjs.org/docs/basic-features/layouts
   */
  const getLayout = Component.getLayout ?? ((page) => page)

  /**
   * Set ui color scheme
   * @see https://mantine.dev/theming/dark-theme/#save-to-localstorage-and-add-keyboard-shortcut
   */
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <Provider store={store}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          theme={{ colorScheme }}
          withNormalizeCSS
        >
          <ModalsProvider>
            <NotificationsProvider
              position="top-right"
              zIndex={2077}
            >
              {getLayout(<Component {...pageProps} />)}
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  )
}

export default App
