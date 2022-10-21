import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from '../Components/Home/Home'
import Services from '../Components/Services/services'
import Login from '../Common/Login/Login'
import SignUp from '../Common/SignUp/SignUp'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'

export default function RoutesMaster() {
  return (
      <>
      <Header/>
      <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/service">
            <Services />
          </Route>
        </Switch>
        <Footer/>
      </>
  )
}
