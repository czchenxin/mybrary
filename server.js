if(process.env.NODE_ENV !=='production') {
    require('dotenv').config()
}

const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const bodyParser=require('body-parser')


const indexRouter=require('./routes/index')
const authorRouter=require('./routes/authors')

app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))


const mongoose=require('mongoose')

 const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useUnifiedTopology: true,
            useNewUrlParser:true
        })

    }catch(error){
        console.log(error);
    }
 }
 connectDB()

app.use('/',indexRouter)
app.use('/authors',authorRouter)
 

mongoose.connection.once('open',()=>{
    console.log("COnnected to MongoDB");
app.listen(process.env.PORT|| 3000)
})
