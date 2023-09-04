import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    const fetchData = async () => {
      if (eventData !== null) {
        const data = allEvents && allEvents.find((i) => i._id === id);
        setData(data);
      } else {
        const data = allProducts && allProducts.find((i) => i._id === id);
        setData(data);
      }
    };

    fetchData(); // Call the function immediately when the component mounts

    // Additionally, if you want to refetch data when the id changes:
    // fetchData();

    // Specify id as a dependency to trigger the effect when it changes
  }, [id, allProducts, allEvents, eventData]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
