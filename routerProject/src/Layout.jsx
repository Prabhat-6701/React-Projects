import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'
//outlet is used to render the child components of the parent component
//in this case the parent component is Layout and the child components are Home, About, Contact
//the child components are rendered in the parent component using the outlet
function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
    

  )
}

export default Layout