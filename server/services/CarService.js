import mongoose from 'mongoose'
const Schema = mongoose.Schema //NOTE SCHEMA is mongoose term for Model

//NOTE you do not need to provide an _id it is created by MongoDB
const _model = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    imgUrl: { type: String, default: 'https://placehold.it/200x200' },
    price: { type: Number },
    year: { type: Number },
    description: { type: String, maxlength: 300 }
}, { timestamps: true })

export default class CarService {
    get Repository() {
        return mongoose.model('car', _model)
    }
}
