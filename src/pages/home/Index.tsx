import React from 'react'
import Header from './Header.jsx'
import Gadgets from './Gadgets.jsx'
import Products from './Products.jsx'
import Footer from './Footer.jsx'

const Index = () => {
  return (
    <div className='bg-background'>
        <Header />
        <Gadgets />
        <Products />
        <Footer />
      
    </div>
  )
}

export default Index