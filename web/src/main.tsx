import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ContainerProvider } from 'brandi-react'
import { container } from './di/container'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <ContainerProvider container={container}><App /></ContainerProvider>
    
  </StrictMode>
)

