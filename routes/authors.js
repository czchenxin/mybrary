const express=require('express')
const router=express.Router()


//Allahthors routes
router.get('/', (req,res)=>{
    res.render('authors/index')
})

//new author ruute

router.get('/new', (req,res)=>{
    res.render('authors/new')
})

//create Author route
router.post('/',(req,res)=>{
    res.send('Create')
})
module.exports=router