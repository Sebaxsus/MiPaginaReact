import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ConfigContext from './Context'
import { App } from './app'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigContext>
      <App />
    </ConfigContext>
  </StrictMode>,
)
