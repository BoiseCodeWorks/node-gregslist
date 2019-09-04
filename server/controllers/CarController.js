import express from 'express'
import CarService from '../services/CarService';

//NOTE the repository provides all the mongoose methods for connection
let _carService = new CarService().Repository

export default class CarController {
    constructor() {
        //NOTE: This route is registered in main as '/api/cars'
        this.router = express.Router()
            .use('*', this.logger)
            .get('', this.getAll)
            .get('/:id', this.getOne)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }
    logger(req, res, next) {
        console.log("Entered Cars Controller");
        next();
    }


    async getAll(req, res, next) {
        try {
            let cars = await _carService.find({})
            res.send(cars)
        } catch (error) { next(error) }
    }
    async getOne(req, res, next) {
        try {
            let car = await _carService.findById(req.params.id)
            if (!car) { throw new Error("Bad Id") }
            res.send(car)
        } catch (error) { next(error) }
    }
    async create(req, res, next) {
        try {
            let car = await _carService.create(req.body)
            if (!car) { throw new Error("Bad Id") }
            res.status(201).send(car)
        } catch (error) { next(error) }
    }
    async edit(req, res, next) {
        try {
            //NOTE {new: true} simply means return the after updated object
            let car = await _carService.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            if (!car) { throw new Error("Bad Id") }
            res.send(car)
        } catch (error) { next(error) }
    }
    async delete(req, res, next) {
        try {
            let car = await _carService.findOneAndRemove({ _id: req.params.id })
            if (!car) { throw new Error("Bad Id") }
            res.send("success")
        } catch (error) { next(error) }
    }

}