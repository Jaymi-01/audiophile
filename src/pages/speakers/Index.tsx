import React from 'react'
import Header from './Header.jsx'
import NewProduct from './NewProduct.jsx'
import Gadgets from '../home/Gadgets.jsx'
import Footer from '../home/Footer.jsx'

const Index = () => {
  return (
    <div>
        <Header />
        <NewProduct />
        <Gadgets />
        <Footer />
    </div>
  )
}

export default Index