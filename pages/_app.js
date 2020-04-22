import React from 'react'
import '../style/style.css'
import Header from '../components/Header'
import Footer from '../components/footer'

const App=({Component, pageProps}) =>{
    return (
    <div>
    <Header/>
   <div className='min-h-screen container mx-auto'>
    <Component{...pageProps}/>
    </div>
    <Footer/>
    </div>)
}
export default App