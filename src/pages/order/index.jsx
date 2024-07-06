import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import {Order} from "@modal"
import {OrderTable} from '@ui'
import {order} from '@service'
const Index = () => {
  const [open,setOpen] = useState(false)
  const [data,setData] = useState([])
  const getData =async()=>{
    try{
      const response = await order.get()
      console.log(response);
      if(response.status === 200 && response?.data?.orders_list){
        setData(response?.data?.orders_list)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
   getData()
  }, []);
  return (
    <>
    <Order open={open} handleClose={()=>setOpen(false)}/>
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
      <Button variant="contained" type="primary" onClick={()=>setOpen(true)}>ADD</Button>
      </div>
      {/* <OrderTable  data={data} /> */}
    </div>
    </>
  )
}

export default Index
