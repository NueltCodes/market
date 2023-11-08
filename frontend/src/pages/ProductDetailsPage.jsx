import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useDispatch, useSelector } from "react-redux";
import ProductEventDetails from "../components/Products/ProductEventDetails";
import { getAllProductsShop } from "../redux/actions/product";
import axios from "axios";
import { server } from "../server";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [shopImg, setShopImg] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents, eventData, id]);

  useEffect(() => {
    if (data && data.shop) {
      setIsLoading(true);
      axios
        .get(`${server}/shop/get-shop-info/${data.shop._id}`)
        .then((res) => {
          setShopImg(res.data.shop);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data, dispatch, id]);

  return (
    <div>
      <Header />
      {!eventData && <ProductDetails shopImg={shopImg} data={data} />}
      {eventData && <ProductEventDetails data={data} />}
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
