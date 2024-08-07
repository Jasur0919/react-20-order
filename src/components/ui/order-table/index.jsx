
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import {service} from "@service"
// import {Service} from '@modal'
// import { useState } from 'react';
// import { FaRegTrashCan } from "react-icons/fa6";
// import { MdEdit } from "react-icons/md";


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "rgba(35, 137, 218, 1)",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// // eslint-disable-next-line react/prop-types
// export default function CustomizedTables({data}) {
//     const [edit,setEdit] = useState({})
//     const [open,setOpen] = useState(false)
//    const deleteItem =async(id)=>{
//     try{
//         const response = await service.delete(id)
//         response.status === 200 && window.location.reload() 
//     }catch(error){
//         console.log(error)
//     }
//    }
//    const editItem =(item)=>{
//     setEdit(item)
//     setOpen(true)
//    }
//   return (
//     <>
//     <Service item={edit} open={open} handleClose={()=>setOpen(false)}/>
//         <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell align="center">T/R</StyledTableCell>
//             <StyledTableCell align="center">Client name</StyledTableCell>
//             <StyledTableCell align="center">Client phone</StyledTableCell>
//             <StyledTableCell align="center">Service name</StyledTableCell>
//             <StyledTableCell align="center">Service price</StyledTableCell>
//             <StyledTableCell align="center">Amount</StyledTableCell>
//             <StyledTableCell align="center">Status</StyledTableCell>
//             <StyledTableCell align="center">Action</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((item,index) => (
//             <StyledTableRow key={index}>
//               <StyledTableCell align="center">{index + 1}</StyledTableCell>
//               <StyledTableCell align="center">{item.client_name}</StyledTableCell>
//               <StyledTableCell align="center">{item.client_phone_number}</StyledTableCell>
//               <StyledTableCell align="center">{item.service_name}</StyledTableCell>
//               <StyledTableCell align="center">{item.service_price}</StyledTableCell>
//               <StyledTableCell align="center">{item.amount}</StyledTableCell>
//               <StyledTableCell align="center">{item.status}</StyledTableCell>
//               <StyledTableCell align="center" >
//                 <button onClick={()=>editItem(item)}><MdEdit  style={{color: "blue", fontSize: "20px"}}/> </button>
//                 <button onClick={()=>order.delete(item.id)}><FaRegTrashCan  style={{color: "red", fontSize: "20px", marginLeft:"10px" }}/></button>
//               </StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </>
//   );
// }


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { service, order } from "@service"; // Ensure you import the necessary services
import { Service } from '@modal';
import { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35, 137, 218, 1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// eslint-disable-next-line react/prop-types
export default function CustomizedTables({ data }) {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  const deleteItem = async (id) => {
    try {
      const response = await order.delete(id); 
      // if (response.status === 200) {
      //   const updatedData = data.filter(item => item.id !== id);
      //   setData(updatedData);
      // }
      response.status === 200 && window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  return (
    <>
      <Service item={edit} open={open} handleClose={() => setOpen(false)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Client name</StyledTableCell>
              <StyledTableCell align="center">Client phone</StyledTableCell>
              <StyledTableCell align="center">Service name</StyledTableCell>
              <StyledTableCell align="center">Service price</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{item.client_name}</StyledTableCell>
                <StyledTableCell align="center">{item.client_phone_number}</StyledTableCell>
                <StyledTableCell align="center">{item.service_name}</StyledTableCell>
                <StyledTableCell align="center">{item.service_price}</StyledTableCell>
                <StyledTableCell align="center">{item.amount}</StyledTableCell>
                <StyledTableCell align="center">{item.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <button onClick={() => editItem(item)}><MdEdit style={{ color: "blue", fontSize: "20px" }} /></button>
                  <button onClick={() => deleteItem(item.id) }><FaRegTrashCan style={{ color: "red", fontSize: "20px", marginLeft: "10px" }} /></button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
