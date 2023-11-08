import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  editdProduct,
  getAllProductsShop,
} from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Tags, categoriesData } from "../../static/data";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { server } from "../../server";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [editOpen, setEditOpen] = useState();

  const prevProduct = () => {
    products && products.map((product) => product._id === productId);
  };

  const [productId, setProductId] = useState(null);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(false);
  console.log(images);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));

    setTimeout(() => {
      toast.success("Product deleted successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000); // Reloading the page after a seconds
    }, 2000); // Displaying the toast after 2 seconds
  };

  const selectTags = () => {
    const selectedCategory = Tags.find((tag) => tag.label === category);
    return selectedCategory ? selectedCategory.tags : [];
  };

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id)); // Fetch the updated products
  }, [dispatch, seller._id]);

  // ...

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setNewImages((prevPreviews) => [...prevPreviews, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageDelete = (imageUrlToDelete) => {
    setNewImages((prevImages) => {
      return prevImages.filter((imageUrl) => imageUrl !== imageUrlToDelete);
    });
  };
  const handlePrevDelete = (imageUrlToDelete) => {
    setImages((prevImages) => {
      return prevImages.filter((imageUrl) => imageUrl !== imageUrlToDelete);
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // if (images.length === 0) {
    //   setLoading(false);
    //   return toast.error("Image is required please reselect images");
    // }

    const newForm = new FormData();

    // Append existing images as strings
    images.forEach((image, index) => {
      newForm.append(`existingImages${index}`, image.url);
    });

    // Append new images as File objects
    newImages.forEach((image, index) => {
      newForm.append(`newImages${index}`, image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    const formData = {
      name,
      description,
      category,
      tags,
      productId, // Add this line if productId is already defined
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images: images,
      newImages: newImages,
    };

    try {
      const response = await axios.post(
        `${server}/product/edit-product`,
        formData
      );
      toast.success("Product successfully edited");
      window.location.reload();
      setEditOpen(false);
    } catch (error) {
      console.log(error.response);
      if (!error.response) {
        toast.error("Payload Too Large please compress image");
      } else {
        toast.error("Error editing product, please try again later");
      }
    }
    setLoading(false);
  };

  if (loading) {
    <Loader />;
  }

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                const foundProduct = products.find(
                  (product) => product._id === params.id
                );
                setEditOpen(params.id);
                setProductId(params.id);
                setDescription(foundProduct ? foundProduct.description : "");
                setName(foundProduct ? foundProduct.name : "");
                setOriginalPrice(
                  foundProduct ? foundProduct.originalPrice : ""
                );
                setDiscountPrice(
                  foundProduct ? foundProduct.discountPrice : ""
                );
                setCategory(foundProduct ? foundProduct.category : "");
                setImages(foundProduct ? foundProduct.images : []);
                setStock(foundProduct ? foundProduct.stock : "");
                setTags(foundProduct ? foundProduct.tags : "");
              }}
            >
              <BiEdit size={20} className="text-black" />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} className="text-red-500" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "$ " + item.originalPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] lg:w-[80%] p-4 mt-3 bg-white">
          {editOpen && (
            <div className="fixed bg-gray-200 w-[100%] inset-0 h-[100%] z-40 p-3 overflow-y-scroll">
              <MdClose
                onClick={() => setEditOpen(false)}
                color="red"
                size={30}
                className="fixed "
              />
              <div className="flex justify-center items-center w-[100%]">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white sm:w-[70%] w-[90%] p-2 "
                >
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your product name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      cols="30"
                      rows="8"
                      required
                      type="text"
                      name="description"
                      value={description}
                      className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out sm:text-sm"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter your product description..."
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full font-semibold mt-2 border h-[35px] rounded-[5px]"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Choose a category">
                        {category ? category : "select category"}
                      </option>
                      {categoriesData &&
                        categoriesData.map((i) => (
                          <option value={i.title} key={i.title}>
                            {i.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div className="mt-3">
                    <label className="pb-2">
                      Tags <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full font-semibold mt-2 border h-[35px] rounded-[5px]"
                      value={tags}
                      required
                      onChange={(e) => setTags(e.target.value)}
                    >
                      <option value="Choose a tag">Select Tag</option>
                      {selectTags().map((tag, index) => (
                        <option value={tag} key={index}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Original Price</label>
                    <input
                      type="number"
                      name="price"
                      value={originalPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out sm:text-sm"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Enter your product price..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Price (With Discount){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={discountPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out sm:text-sm"
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="Enter your product price with discount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={stock}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out sm:text-sm"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter available stock quantity..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <label htmlFor="upload">
                      <AiOutlinePlusCircle
                        size={30}
                        className="mt-3 cursor-pointer"
                        color="#555"
                      />
                    </label>{" "}
                    {newImages && newImages.length > 0 && (
                      <div className="font-semibold mt-3">New uploads</div>
                    )}
                    <div className="w-full flex items-center flex-wrap">
                      {newImages &&
                        newImages.map((i) => (
                          <div className="relative rounded-md overflow-hidden m-2 p-0.5 bg-[#9484b8] h-[120px] w-[120px]">
                            <div className="z-10 absolute top-1 right-1">
                              <BiTrash
                                type="button"
                                onClick={() => handleImageDelete(i)}
                                size={20}
                                color="red"
                              />{" "}
                            </div>

                            <img
                              src={i}
                              key={i}
                              alt=""
                              className="h-full w-full object-cover rounded-md "
                            />
                          </div>
                        ))}
                    </div>
                    {images && images.length > 0 && (
                      <div className="font-semibold mt-3">Previous upload </div>
                    )}{" "}
                    <div className="w-full flex items-center flex-wrap">
                      {images &&
                        images.map((i) => (
                          <div className="relative rounded-md overflow-hidden m-2 p-0.5 bg-[#9484b8] h-[120px] w-[120px]">
                            <div className="z-10 absolute top-3 right-3">
                              <BiTrash
                                type="button"
                                onClick={() => handlePrevDelete(i)}
                                size={20}
                                color="red"
                              />{" "}
                            </div>

                            <img
                              key={i}
                              src={i.url}
                              alt=""
                              className="h-full w-full object-cover rounded-md "
                            />
                          </div>
                        ))}
                    </div>
                    <br />
                    <div>
                      <input
                        type={!loading ? "submit" : "button"}
                        value="Update"
                        className={` ${
                          loading ? "cursor-wait opacity-40" : "cursor-pointer"
                        } cursor-pointer mt-2 appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 hover:border-blue-500 transition duration-300 ease-in-out sm:text-s`}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;
