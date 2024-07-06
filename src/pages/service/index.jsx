import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import {Service} from "@modal"
import {ServiceTable} from '@ui'
import {service} from '@service'
const Index = () => {
  const [open,setOpen] = useState(false)
  const [data,setData] = useState([])
  const getData =async()=>{
    try{
      const response = await service.get()
      if(response.status === 200 && response?.data?.services){
        setData(response?.data?.services)
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
    <Service open={open} handleClose={()=>setOpen(false)}/>
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
      <Button variant="contained" type="primary" onClick={()=>setOpen(true)}>ADD</Button>
      </div>
      <ServiceTable data-aos="fade-up"
     data-aos-duration="3000" data={data} />
    </div>
    </>
  )
}

export default Index