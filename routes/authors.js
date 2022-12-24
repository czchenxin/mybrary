const express=require('express')
const author = require('../models/author')
const router=express.Router()
const Author=require('../models/author')


//Allahthors routes
router.get('/', async (req,res)=>{
    let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }

        try{
        const authors= await Author.find(searchOptions)
        res.render('authors/index',{
            authors:authors,
        searchOptions:req.query
    })

    }catch{
res.redirect("/")
    }

    
})

//new author ruute

router.get('/new', (req,res)=>{
    res.render('authors/new',{author:new Author()})
})

//create Author route
router.post('/', (req,res)=>{



    const author=new Author({
        name:req.body.name
    })
    author.save((err,newAuthor) =>{
        if(err){
            res.render('authors/new',{
                author:author,
                errorMessage:"error creating Author"
            }

            )
        }else {
            res.redirect('authors')
        }
    })
     
})
module.exports=router