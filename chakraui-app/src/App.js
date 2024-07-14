import './App.css';

import { BrowserRouter } from 'react-router-dom';

import { Router } from './router/Router';
import { UserProvider } from './providers/UserProvider';

export default function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserProvider>
  );
}
