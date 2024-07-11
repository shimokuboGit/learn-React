import { Route, Routes } from 'react-router-dom';

import { Home } from '../Home';
import { Page1 } from '../Page1';
import { Page2 } from '../Page2';
import { Page1Routes } from './Page1Routes';
import { Page2Routes } from './Page2Routes';
import { Page404 } from '../Page404';

export const Router = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      {/* <Route path='/page1' element={<Page1 />}>
        <Route path='detailA' element={<Page1DetailA />} />
        <Route path='detailB' element={<Page1DetailB />} />
      </Route> */}
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
      {/* <Route path='/page2' element={<Page2 />} /> */}
      <Route path='/page2' element={<Page2/>}>
        {console.log(Page2Routes)}
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
      {/* <Route path='*' element={<Page404/>}>
      </Route> */}
    </Routes>
  )
}