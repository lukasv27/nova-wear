import { Outlet } from "react-router";
import Categories from "../Categories";
import Hero from "../Hero";
import FeaturedProducts from "../FeaturedProducts";
import Newsletter from "../Newsletter";

const HomeLayout = () => {
  return (
    <>
      <Outlet />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
};

export default HomeLayout;
