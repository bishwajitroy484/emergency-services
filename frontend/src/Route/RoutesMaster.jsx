import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from '../Components/Home/Home'
import About from '../Components/About/About'
import Profile from '../Components/Profile/Profile'
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
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/service">
            <Services />
          </Route>
        </Switch>
        <Footer/>
      </>
  )
}
