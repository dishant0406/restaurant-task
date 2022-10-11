import React, { useContext } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom'
import { StateContext } from './Context/Context'
import Home from './pages/Home/Home.jsx'
import Bookmarked from './pages/Bookmarked/Bookmarked'
import  { Toaster } from 'react-hot-toast';

const App = () => {
  const {user} = useContext(StateContext)
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path={'/login'}>
          {user? <Redirect to={'/'} /> : <AuthPage />}
        </Route>
        <Route exact path={'/'}>
          {user?<Home/> : <Redirect to={'/login'} />}
        </Route>
        <Route exact path={'/bookmarked'}>
          {user?<Bookmarked/> : <Redirect to={'/login'} />}
        </Route>
      </Switch>
    </BrowserRouter>
    <Toaster/>
    </div>
  )
}

export default App