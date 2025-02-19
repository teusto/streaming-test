import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Series from './pages/Series.tsx';
import TransitionComponent from './components/Transitions/index.tsx';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/graphql/client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TransitionComponent><App /></TransitionComponent>} />
          <Route path='/episode/:id' element={<TransitionComponent><Series /></TransitionComponent>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)

