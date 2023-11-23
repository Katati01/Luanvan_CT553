import React from "react";
import Events from "../components/Events/Events";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Categories from "../components/Route/Categories/Categories";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Hero from "../components/Route/Hero/Hero";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Footer />
    </div>
  );
};

export default HomePage;
