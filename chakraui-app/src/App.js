import './App.css';

import { BrowserRouter } from 'react-router-dom';

import { Router } from './router/Router';
import { UserProvider } from './providers/UserProvider';
import { RecoilRoot } from 'recoil';

export default function App() {

  return (
    <RecoilRoot>
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
    </RecoilRoot>
  );
}
