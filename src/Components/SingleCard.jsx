import { StarIcon } from "@chakra-ui/icons";
import { FaRegHeart } from "react-icons/fa";
import {
  Card,
  CardBody,
  Text,
  Image,
  Box,
  Button,
  Flex,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../Redux/Cart/Cart.action";
function SingleCard({ ...props }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    id,
    title,
    brand,
    images,
    discount,
    discounted_price,
    strike_price,
    rating,
    rating_count,
  } = props.prod;
  let prod = props.prod;

  const handleAddToWishlist = async () => {
   
      await axios
        .post(`https://vastra.onrender.com/WishList/`, prod)
        .then((res) => {
          alert("Added to Wishlist Successfully....");
          dispatch(fetchCartData());
        })

        .catch((err) => alert("Already Exists"));
    
  };

  return (
    // < className={Style.cardContainer}>
    <Card
      border={"none"}
      // _hover={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <CardBody textAlign={"left"}>
        <Stack spacing={1}>
          <Box onClick={() => navigate(`/product/${id}`)}>
            <Image
              src={images[0]}
              width={"100%"}
              // _hover={{ p: "0.5rem" }}
              overflow={"hidden"}
            />
          </Box>

          <Text fontSize={"1rem"} fontWeight={700} noOfLines={1}>
            {brand}
          </Text>
          <Text fontSize={"0.8rem"} color={"gray.500"} noOfLines={1}>
            {title}
          </Text>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"baseline"}
          >
            <Text fontSize={"0.9rem"} fontWeight={"600"}>
              {" "}
              Rs.{discounted_price}
            </Text>
            <Text
              fontSize={"0.7rem"}
              alignItems={"baseline"}
              textDecoration={"line-through"}
            >
              Rs.{strike_price}
            </Text>
            <Text fontSize={"0.7rem"} color="pink.300">
              {discount}
            </Text>
          </Box>

          <Box>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text>
                {" "}
                {rating} <StarIcon fontSize={"0.8rem"} />
              </Text>
              <Text>{rating_count}</Text>
            </Flex>
          </Box>

          <Box textAlign={"center"} mt={"0.5rem"}>
            <Button
              backgroundColor={"white"}
              color={"black"}
              boxShadow={"0 0 1px black"}
              _hover={{
                backgroundColor: "grey",
              }}
              onClick={() => handleAddToWishlist()}
            >
              <FaRegHeart fontVariant={"primary"} /> Add To Wishlist
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default SingleCard;
