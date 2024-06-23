import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";
import { deleteMensData, getMensData, updateMensData } from "../Redux/Admin/Admin.action";
import Tablecard from "./Tablecard";

const MensPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ price: '', StrikePrice: '', discount: '', id: '' });
  const MensData = useSelector((store) => store.adminManager.mensData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMensData());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMensData(id)).then(() => dispatch(getMensData()));
  };

  const handleUpdate = () => {
    const { id, price, discount, StrikePrice } = formData;
    dispatch(updateMensData(id, price, discount, StrikePrice)).then(() => {
      dispatch(getMensData());
      onClose();
    });
  };

  const handleOpen = (id) => {
    setFormData((prev) => ({ ...prev, id }));
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box bg="gray.100" width="100%">
      <AdminNavbar />
      <Box width="83%" ml="250px" mt="80px">
        <TableContainer>
          <Table variant="striped" colorScheme="pink">
            <Thead bg="#990578">
              <Tr>
                <Th color="white">Sr No.</Th>
                <Th color="white">Image</Th>
                <Th color="white">Title</Th>
                <Th color="white">Brand</Th>
                <Th color="white">Price</Th>
                <Th color="white">Strike Price</Th>
                <Th color="white">Edit</Th>
                <Th color="white">Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {MensData.length !== 0 &&
                MensData.map((el, i) => (
                  <Tablecard
                    key={i}
                    {...el}
                    ind={i}
                    handleDelete={handleDelete}
                    handleOpen={handleOpen}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Discount Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Strike Amount</FormLabel>
                <Input
                  type="number"
                  placeholder="Strike Price"
                  name="StrikePrice"
                  value={formData.StrikePrice}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default MensPage;
