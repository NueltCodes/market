import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Events/Events";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Sponsored from "../components/Route/Sponsored/Sponsored";
import Footer from "../components/Layout/Footer.jsx";
import TopRated from "../components/Route/TopRated/TopRated";
import LimitedStock from "../components/Route/LimitedStock/LimitedStock";
import Collections from "../components/Route/Collections/Collections";
import Trending from "../components/Route/Trending/Trending";
const HomePage = () => {
  // note this is for good ser experience, this is to scroll to top automatic when the page reload star from button
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <TopRated />
      <Collections />
      <LimitedStock />
      <Trending />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
