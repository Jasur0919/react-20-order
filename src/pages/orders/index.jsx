// import AddOrder from "@modal/addorder"; // Ensure you are importing correctly
// import EditOrder from "@modal/editmodal";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import orderService from "../../service/order"; // Update the service import
// import { useEffect, useState } from "react";
// import { Button, IconButton, InputBase, Typography } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import Aos from "aos";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Index = () => {
//   useEffect(() => {
//     Aos.init({ duration: 1000 });
//   }, []);

//   const [orders, setOrders] = useState([]);
//   const [edit, setEdit] = useState({});
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openAdd, setOpenAdd] = useState(false);
//   const [search, setSearch] = useState("");

//   const getOrders = async () => {
//     try {
//       const response = await orderService.get();
//       if (response.data && response.data.orders) {
//         setOrders(response.data.orders);
//       } else {
//         console.error("Unexpected response structure:", response);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getOrders();
//   }, []);

//   const deleteItem = async (id) => {
//     try {
//       const response = await orderService.delete(id);
//       if (response.status === 200) {
//         setOrders((prev) => prev.filter((item) => item.id !== id));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const editItem = (row) => {
//     setEdit(row);
//     setOpenEdit(true);
//   };

//   const handleSaveEdit = (updatedItem) => {
//     setOrders((prev) =>
//       prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
//     );
//     setOpenEdit(false);
//   };

//   const handleSaveAdd = (newItem) => {
//     setOrders((prev) => [...prev, newItem]);
//     setOpenAdd(false);
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await orderService.search(search);
//       if (response.data && response.data.orders) {
//         setOrders(response.data.orders);
//       } else {
//         console.error("Unexpected response structure:", response);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <EditOrder item={edit} open={openEdit} handleClose={() => setOpenEdit(false)} onSave={handleSaveEdit} />
//       <AddOrder open={openAdd} handleClose={() => setOpenAdd(false)} onSave={handleSaveAdd} />
//       <div>
//         <div className="py-3 flex justify-between items-center">
//           <div className="w-96">
//             <Paper
//               component="form"
//               sx={{
//                 p: "2px 4px",
//                 display: "flex",
//                 alignItems: "center",
//                 width: 400,
//               }}
//             >
//               <InputBase
//                 sx={{ ml: 1, flex: 1 }}
//                 placeholder="Search orders"
//                 inputProps={{ "aria-label": "search orders" }}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
//                 <SearchIcon />
//               </IconButton>
//             </Paper>
//           </div>
//           {/* <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>
//             Add Order
//           </Button> */}
//         </div>

//         {orders.length === 0 ? (
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>T/R</StyledTableCell>
//                 <StyledTableCell>Order Name</StyledTableCell>
//                 <StyledTableCell align="center">Order Price</StyledTableCell>
//                 <StyledTableCell align="center">Wait Time</StyledTableCell>
//                 <StyledTableCell align="center">Action</StyledTableCell>
//               </TableRow>
//             </TableHead>
//           </Table>
//         ) : (
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">
//               <TableHead data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="1000">
//                 <TableRow>
//                   <StyledTableCell>T/R</StyledTableCell>
//                   <StyledTableCell>Order Name</StyledTableCell>
//                   <StyledTableCell align="center">Order Price</StyledTableCell>
//                   <StyledTableCell align="center">Wait Time</StyledTableCell>
//                   <StyledTableCell align="center">Action</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody data-aos="fade-up" data-aos-duration="3000">
//                 {orders.map((row, index) => (
//                   <StyledTableRow key={row.id}>
//                     <StyledTableCell>{index + 1}</StyledTableCell>
//                     <StyledTableCell component="th" scope="row">
//                       {row.name}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {row.price.toLocaleString("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                       })}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       <Typography>{row.waitTime}</Typography>
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       <IconButton onClick={() => editItem(row)} sx={{ color: "blue" }}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton onClick={() => deleteItem(row.id)} sx={{ color: "red" }}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </div>
//     </>
//   );
// };

// export default Index;



import AddService from "@modal/addorder";
import EditService from "@modal/editmodal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import order from "../../service/order";
import { useEffect, useState } from "react";
import { Button, IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Aos from "aos";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Index = () => {

  useEffect(() => {
    Aos.init({duration: 1000})
  },[])

  const [services, setServices] = useState([]);
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  const getService = async () => {
    try {
      const response = await order.get();
      if (response.data && response.data.services) {
        setServices(response.data.services);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await order.delete(id);
      if (response.status === 200) {
        setServices((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (row) => {
    setEdit(row);
    setOpen(true);
  };

  const handleSave = (updatedItem) => {
    setServices((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setOpen(false);
  };

  return (
    <>
      <EditService item={edit} open={open} handleClose={() => setOpen(false)} onSave={handleSave} />
      <div>
        <div className="py-3 flex justify-between items-center">
          <div className="w-96">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Qidiruv"
                inputProps={{ "aria-label": "search services" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <AddService />
        </div>


        {services.length === 0 ? (
          <Table sx={{ minWidth: 700, }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>T/R</StyledTableCell>
              <StyledTableCell>Service Name</StyledTableCell>
              <StyledTableCell align="center">Service price</StyledTableCell>
              <StyledTableCell align="center">Kutish vaqti</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          </Table>
          
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead  data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="1000">
                <TableRow>
                  <StyledTableCell>T/R</StyledTableCell>
                  <StyledTableCell>Xizmat nomi</StyledTableCell>
                  <StyledTableCell align="center">Xizmat narxi</StyledTableCell>
                  <StyledTableCell align="center">Kutish vaqti</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody  data-aos="fade-up"
     data-aos-duration="3000">
                {services.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>30 daqiqa</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => editItem(row)} color="" sx={{color: "blue"}}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteItem(row.id)} color="" sx={{color: "red"}}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
};

export default Index;
