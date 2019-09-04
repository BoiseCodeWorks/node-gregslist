import express from 'express'
import bp from 'body-parser'
import CarController from './controllers/CarController';
import DbContext from './db/dbconfig';



const port = 3000
let server = express()
DbContext.connect();

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())

server.use('/api/cars', new CarController().router)





//NOTE DEFAULT ERROR HANDLER
server.use((err, req, res, next) => {
    res.status(err.status || 400).send({ error: { message: err.message || 'something went wrong' } })
})


server.use((req, res, next) => {
    res.status(404).send("Route not found")
})


server.listen(port, () => {
    console.log("Server is running on port", port);

})