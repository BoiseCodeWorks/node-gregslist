import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', err => {
    console.error('[DATABASE ERROR]:', err)
})


export default class DbContext {
    //NOTE 'static' methods are methods available on the class, not the instance of the class
    static async connect() {
        try {
            let status = await mongoose.connect(process.env.CONNECTION_STRING)
            console.log("CONNECTED TO DB");
            return status
        } catch (error) {
            console.error(error)
        }
    }
}