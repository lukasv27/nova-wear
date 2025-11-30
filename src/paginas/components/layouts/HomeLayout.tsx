import { Outlet } from "react-router";
import Categories from "../Categories";
import Footer from "../Footer";
import Hero from "../Hero";
import FeaturedProducts from "../FeaturedProducts";
import Navbar from "../NavBar";

const HomeLayout = () => {
  return (
    <>
      <Outlet />
      <Hero />
      <Categories />
      <FeaturedProducts />
    </>
  );
};

export default HomeLayout;
