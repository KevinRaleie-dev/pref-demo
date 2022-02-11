import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        borderRadius: '0px'
      }
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
