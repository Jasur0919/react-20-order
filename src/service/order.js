import http from './config'

const order = {
    create: (data)=> http.post("/service",data),
    get: ()=> http.get("/order/all", {params: {page: 1, limit:10}}),
    delete: (id)=> http.delete("/service", {params: {id}}),
    update: (data)=> http.put("/service", data),
}
export default order