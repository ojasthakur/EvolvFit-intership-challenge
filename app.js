// Access variables in env file
require('dotenv').config()
require('express-async-errors');

//import connectDB module to connect to mongodb database
const {connectDB} = require('./db/connect')

const express = require('express')
const app = express()

const foodItemsRouter = require('./routes/foodItems')
const mealsRouter = require('./routes/meals')
const userRouter = require('./routes/user')
//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json())


//routes
app.get('/',(req, res)=>{
    res.send('Hello there')
})

app.use('/api/v1/foodItems', foodItemsRouter)
app.use('/api/v1/meals', mealsRouter)
app.use('/api/v1/users', userRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;
// console.log(port)

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}
start()
