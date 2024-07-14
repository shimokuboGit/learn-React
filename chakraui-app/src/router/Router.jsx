import { Route, Routes } from 'react-router-dom';

import { Home } from '../Home';
import { Page1 } from '../Page1';
import { Page2 } from '../Page2';
import { Page1Routes } from './Page1Routes';
import { Page2Routes } from './Page2Routes';
import { Page404 } from '../Page404';
import { Users } from '../components/pages/Users';
import { DefaultLayout } from '../components/templates/DefaultLayout' 
import { HeaderOnly } from '../components/templates/HeaderOnly' 
import { Top } from '../components/pages/Top';

export const Router = () => {
  return (
    <Routes>
      <Route exact path='/' element={
        <DefaultLayout>
          <Top />
        </DefaultLayout>
      } />
      <Route path='/users' element={
        <HeaderOnly>
          <Users />
        </HeaderOnly>
      } />
      <Route path='/page1' element={<Page1 />}>
        {Page1Routes.map((route) => (
          <Route 
            key={route.path}
            path={route.path}
            exact={route.exact}
            element={route.children}
          >
          </Route>
        ))}
      </Route>
      <Route path='/page2' element={<Page2/>}>
        {Page2Routes.map((route) => (
          <Route 
            key={route.path}
            path={route.path}
            exact={route.exact}
            element={route.children}
          >
          </Route>
        ))}
      </Route>
      <Route path='*' element={<Page404/>}>
      </Route>
    </Routes>
  )
}