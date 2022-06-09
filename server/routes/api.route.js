const router = require('express').Router();

const { parse } = require('dotenv');
const { Products } = require('../models/products')

// for all products

router.get('/products', async (req, res, next) => {
  try {
   

    let data = await Products.find();
      let sortBy = req.query || null;  
      let page = req.query.page || 1;
      let size = req.query.size || 4;
      let products = await Products.find();
      // pagination
      
    // sorting
  
    if(sortBy.price){
      if(sortBy.price === 'asc'){
        products = await Products.aggregate([{ $sort : {price : 1}}])
      }else if( sortBy.price === 'desc'){
        products = await Products.aggregate([{ $sort : {price : -1}}])
      }
    }else if(sortBy.title){
      
      if(sortBy.title === 'asc'){
        products = await Products.aggregate([{ $sort : {title : 1}}])
      }else if( sortBy.title === 'desc'){
        products = await Products.aggregate([{ $sort : {title : -1}}])
      }else {
        products =  products.filter(user => user.title === sortBy.title);
      }

    }else if (sortBy.category){
          products =  products.filter(user => user.category === sortBy.category);
    }
    

    var totalPage = Math.ceil(products.length/size);
    var newProd = products.slice(parseInt(page)*parseInt(size)-1,parseInt(page)*parseInt(size)+parseInt(size)-1);
   
    // console.log(newProd)
    if( totalPage < page ){
      res.status(404).json({status : 'Failed',message:"page doesn't exist"})
    }

    res.status(200).json({
      status : 'success',
      count : newProd.length,
      totalPage :  totalPage,
      data : newProd
     
    });


    
  } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
  }
});

// for single products
router.get('/products/: id', async (req, res, next) => {
  try {
    const products = await Products.findById(req.params.id)
    res.status(200).json({
      status : 'success',

      data : products
    });
  } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
  }
});

// create single products

router.post('/products' , async (req, res, next)=> {
   try {
    const products = await Products.create(req.body);
    res.status(200).json({
      status : 'success',
      data : products
    });

   } catch (error) {
    res.status(500).json({
      status : 'error',
      message : error.message
    })
   }
})

// update the single product

router.patch('/products/:id' , async (req, res)=> {
   try {
    const products = await Products.findByIdAndUpdate(req.params.id, req.body , {
      new : true,
    });
    res.status(200).json({
      status : 'success',
      data : products
    });

   } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
   }
})

// find and delete product

router.delete('/products/:id' , async (req, res, next)=> {
   try {
      await Products.findByIdAndDelete( req.params.id );
    res.status(200).json({
      status : 'success'
    });

   } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
   }
})

module.exports = router;
