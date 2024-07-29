import { Box, Heading, HStack, Stack } from '@chakra-ui/layout';
import { useEffect } from 'react';
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import AdminNavbar from './AdminNavbar';
import { getKidsData, getMensData, getWomensData } from '../Redux/Admin/Admin.action';
import Calendar from './Calendar';

const AdminDashboard = () => {
  const {kidsData,mensData,womensData} = useSelector((store)=>store.adminManager)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getKidsData());
    dispatch(getMensData());
    dispatch(getWomensData());
  },[])
  
  const kd =  kidsData.length;
  const md =  mensData.length;
  const wd =  womensData.length;
  //console.log(kd,md,wd);

  return (
    <Box minH="100vh" bg={'whiteAlpha.50'} >
        <AdminNavbar/>
        
        <Box 
          marginTop={'80px'} 
          pt={30} 
          marginRight={'0px'} 
          paddingRight={'0px'} 
          fontFamily={'sans-serif'}
          // bg={'#ffffff'} 
          padding={4} 
          width={'70%'}
        >
          
          <Box ml={'250px'} borderRadius={15} mt={1} mb={4} border='2px solid lightBlue'>
        <Chart
          type="pie"
          height={400}
          series={[kd,md,wd]}
          options={{
          noData: { text: "Unavailable" },
          stroke: {
            lineCap: "round"
          },
          radialBar: {
           // dataLabels: {
              total: {
                show: true,
                label: 'TOTAL',
              }
           // }
          },
        
          labels: [ "KIDS-PRODUCTS","MENS-PRODUCTS", "WOMENS-PRODUCTS"],
        }}
      >
        </Chart>
        
        </Box>
        <Stack bg={'#a0aec0'}  ml={'250px'} padding={5} borderRadius={15} boxShadow={'base'}
        cursor= {'pointer'}>
            <Heading >Total Products :  <b>{kd+md+wd}</b></Heading> 
          </Stack>
        <HStack ml={'250px'} mt={3} pb={10} alignItems={'center'} spacing={3} >
        
          <Stack bg={'#00e396'} boxShadow={'base'} padding={4} borderRadius={15} 
              cursor= {'pointer'}
          >
            <Heading >
                Total Mens Products: <b >{md}</b></Heading> 
          </Stack>
          <Stack bg={'#feb019'} padding={4}boxShadow={'base'} borderRadius={15}
              cursor= {'pointer'} >
            <Heading >Total Womens Products   <b>{wd}</b></Heading> 
          </Stack>
          <Stack bg={'#008ffb'} padding={4}boxShadow={'base'} borderRadius={15}
              cursor= {'pointer'} >
            <Heading >Total Kids Products   <b>{kd}</b></Heading> 
          </Stack>
          </HStack>
        </Box>
        <Box width={'20%'} mt={'59px'} ml={'100px'} borderRadius={15} padding={0} border='2px solid lightBlue' paddingTop={'5'}  pos={'fixed'} top={39.888} left={940} zIndex={999}>
        <Calendar  />
        </Box>
        
    </Box>
  )
}

export default AdminDashboard;
