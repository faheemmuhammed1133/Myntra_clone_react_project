import { Box, Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleProductAPI, getWomensSingleProductAPI,getKidsSingleProductAPI } from "../Redux/Product/Product.api";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../Redux/Cart/Cart.action";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
// import MensPage from "../Components/"
import WomensProduct from "./WomensProduct";
import KidsProduct from "./KidsProduct";
import Product from "./Product";

const SingleProductPage = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [poster, setPoster] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {}, []);
  
  const { id } = useParams();
  const fetchSingleProduct = async () => {
    await getSingleProductAPI(id)
      .then((res) => {
        setSingleProduct(res?.data);
        setPoster(res?.data?.images[0]);
      })
      .catch((err) => console.log(err));
  };
  const fetchWomensSingleProduct = async () => {
    await getWomensSingleProductAPI(id)
      .then((res) => {
        setSingleProduct(res?.data);
        setPoster(res?.data?.images[0]);
      })
      .catch((err) => console.log(err));
  };
  const fetchKidsSingleProduct = async () => {
    await getKidsSingleProductAPI(id)
      .then((res) => {
        setSingleProduct(res?.data);
        setPoster(res?.data?.images[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSingleProduct();
    fetchWomensSingleProduct();
    fetchKidsSingleProduct();
  }, []);

  function handleRecomend(){
    const path = window.location.pathname; // Get current path
      if (path.match(/\/product\/C\d+/)) {
        return (<KidsProduct />)
      }else if (path.match(/\/product\/W\d+/)){
        return (<WomensProduct/>)
      }else {
        return (<Product/>)
      }
  }
  const {
    title,
    brand,
    category,
    discount,
    discounted_price,
    rating,
    rating_count,
    size,
    strike_price,
  } = singleProduct;

  const handleAddToWishlist = async () => {
    // console.log("newItem:",props)
    await axios
      .post(`https://vastra.onrender.com/WishList/`, singleProduct)
      .then((res) => alert("Added to Wishlist Successfully...."))
      .catch((err) => alert("Already added in Your Wishlist"));
  };
  const AddtoBag = async () => {
    // console.log("newItem:",props)
    await axios
      .post(`https://vastra.onrender.com/cart/`, singleProduct)
      .then((res) => {
        alert("Added to bag Successfully....");
        dispatch(fetchCartData());
      })
      .catch((err) => alert("Already Exists in Your Bag"));
  };

  return (
    <div style={{ width: "100%", border: "0px solid red", margin: "auto" }}>
      <Navbar />
      <div style={{ width: "100%", border: "0px solid red", margin: "auto" }}>
        <Box
          mb={"4rem"}
          width={"100%"}
          margin={"auto"}
          mt={100}
          border={"0px solid black"}
        >
          {/* box-shadow: ; */}
          <Flex
            flexDirection={{
              base: "column",
              sm: "column",
              md: "row",
              lg: "row",
            }}
            alignItems={"flex-start"}
            m={"auto"}
            width={{ base: "100%", sm: "100%", md: "70%", lg: "70%" }}
            border={"0px solid black"}
          >
            <Box
              w={{ base: "100%", sm: "100%", md: "45%", lg: "45%" }}
              boxShadow={
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
              }
              m={"auto"}
              mt={0}
              border={"0px solid red"}
            >
              <Image
                src={poster}
                borderRadius={20}
                m={"auto"}
                w={"100%"}
                p={"0.5rem"}
              />
            </Box>

            <Stack
              spacing={5}
              w={{ base: "100%", sm: "100%", md: "55%", lg: "55%" }}
              m="auto"
              mt={0}
              p={"0 2rem"}
              boxShadow={
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
              }
              border={"0px solid green"}
            >
              <Text
                pt={"1rem"}
                textAlign={"left"}
                fontSize={"1.2rem"}
                fontWeight={500}
                color={"gray.500"}
                noOfLines={{ base: 1, sm: 1 }}
              >
                {title}
              </Text>

              <Flex alignItems={"baseline"}>
                <Text fontWeight={600} fontSize={"1.3rem"} color={"gray.700"}>
                  ₹{discounted_price}
                </Text>
                <Text pl={"1.2rem"} fontSize={"0.9rem"}>
                  MRP{" "}
                  <Text
                    display={"inline-block"}
                    textDecoration={"line-through"}
                  >
                    {strike_price}
                  </Text>
                </Text>
                <Text pl={"1.2rem"} fontWeight={700} color={"tomato"}>
                  {discount}
                </Text>
                <Button
                    _hover={{ color: "black" }}
                    fontSize={"1.2rem"}
                    color={"pink.600"}
                    boxShadow={"0 0 2px grey"}
                    borderRadius={"0.2rem"}
                    backgroundColor={"#ffffff"}
                    onClick={handleAddToWishlist}
                    px={2}
                    ml="auto"
                  >
                    <Flex gap={"0.5rem"}>
                      <FaRegHeart fontSize={"1.5rem"} backgroundColor="#ffffff" />
                      
                    </Flex>
                  </Button>
              </Flex>

              <Text
                fontSize={"0.9rem"}
                fontWeight={700}
                textAlign={"left"}
                color={"#3bbaa1"}
              >
                inclusive of all taxes
              </Text>

              <Box textAlign={"left"} mt={"1rem"} borderTop={"2px solid gray"}>
                <Text m={" 0.5rem 0"} fontWeight={"500"} fontSize={"0.8rem"}>
                  Select Size
                </Text>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(4,1fr)",
                    sm: "repeat(7,1fr)",
                    md: "repeat(7,1fr)",
                    lg: "repeat(10,1fr)",
                  }}
                  gap={"0.5rem"}
                >
                  {size?.map((sz, i) => (
                    <Button
                      key={i}
                      backgroundColor={"#fff"}
                      border={"1px solid gray"}
                      borderRadius={"50%"}
                      p={"1rem"}
                    >
                      {sz}
                    </Button>
                  ))}
                </Grid>
              </Box>

              <Stack
                spacing={3}
                textAlign={"left"}
                mt={-1}
                borderTop={"2px solid gray"}
              >
                <Text m={"0.5rem 0"} fontWeight={"500"} fontSize={"0.8rem"}>
                  Product Details:
                </Text>
                <Flex
                  flexDirection={{ sm: "column", lg: "row" }}
                  justifyContent={"space-between"}
                >
                  <Text color={"gray.600"} display={"inline-block"}>
                    Category:
                  </Text>
                  <Text color={"gray.400"}> {category}</Text>
                </Flex>

                <Flex
                  flexDirection={{ sm: "column", lg: "row" }}
                  justifyContent={"space-between"}
                >
                  <Text color={"gray.600"} display={"inline-block"}>
                    Brand:
                  </Text>
                  <Text color={"gray.400"} noOfLines={{ base: 1, sm: 1 }}>
                    {"  "}
                    {brand}
                  </Text>
                </Flex>

                <Flex
                  flexDirection={{ sm: "column", lg: "row" }}
                  justifyContent={"space-between"}
                >
                  <Text color={"gray.600"} display={"inline-block"}>
                    Description:
                  </Text>
                  <Text noOfLines={{ base: 1, sm: 1 }} color={"gray.400"}>
                    {" "}
                    {title}
                  </Text>
                </Flex>
                <Flex
                  flexDirection={{ sm: "column", lg: "row" }}
                  justifyContent={"space-between"}
                >
                  <Text color={"gray.600"} display={"inline-block"}>
                    Rating:
                  </Text>
                  <Text color={"gray.400"}> {rating}</Text>
                </Flex>
                <Flex
                  flexDirection={{ sm: "column", lg: "row" }}
                  justifyContent={"space-between"}
                >
                  <Text color={"gray.600"} display={"inline-block"}>
                    Review:
                  </Text>
                  <Text color={"gray.400"}> {rating_count}</Text>
                </Flex>
              </Stack>
              <Box
                textAlign={"left"}
                w={"100%"}
                mt={"1rem"}
                borderTop={"2px solid gray"}
                p={"1rem"}
                display={{
                  base: "inline-block",
                  md: "inline-block",
                  lg: "inline-block",
                }}
              >
                {/* fontSize={"1.2rem"} color={"pink.500"} fontWeight={700} */}
                <Flex
                  gap={"0.5rem"}
                  justifyContent={"center"}
                  mt={3}
                  direction={{
                    base: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  }}
                >
                
                  <Button
                    _hover={{
                      backgroundColor: "grey.500",
                      outlineColor: "grey.600",
                    }}
                    borderRadius={"0.1rem"}
                    color={"#grey"}
                    backgroundColor={"white.400"}
                    onClick={AddtoBag}
                    fontSize={"1.2rem"}
                    fontWeight={500}
                    //border={'2px solid gray'}
                    px={2}
                  >
                    Add To Bag
                  </Button>
                  <Link
                      to="/address"><Button
                    _hover={{
                      backgroundColor: "white",
                      color: "#ff6700",
                      outlineColor: "#ff6700",
                    }}
                    borderRadius={"0rem"}
                    color={"#fff"}
                    backgroundColor={"#ff6700"}
                    onClick={() => {
                      
                      localStorage.setItem('Total MRP', discounted_price);
                      localStorage.setItem('DiscountPrice', strike_price);
                    }}
                    fontSize={"1.2rem"}
                    fontWeight={700}
                    // border={'2px solid gray'}
                    px={10}
                  >
                    Buy Now
                  </Button></Link>
                </Flex>
              </Box>
            </Stack>
          </Flex>
        </Box>
      </div>
      <div >
        {handleRecomend()}
      
       </div>
      <Footer />
    </div>
  );
};

export default SingleProductPage;
