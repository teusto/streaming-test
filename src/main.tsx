import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Series from './pages/Series.tsx';
import TransitionComponent from './components/Transitions/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TransitionComponent><App /></TransitionComponent>}/>
        <Route path='/Series' element={<TransitionComponent><Series /></TransitionComponent>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

