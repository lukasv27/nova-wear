
import Navbar from '../NavBar'
import { Outlet } from 'react-router'
import Categories from '../Categories'
import Footer from '../footer'
import Hero from '../Hero'
import FeaturedProducts from '../FeaturedProducts'


const HomeLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Hero/>
      <Categories/>
      <FeaturedProducts/>
      <Footer/>
    </>
  )
}

export default HomeLayout
