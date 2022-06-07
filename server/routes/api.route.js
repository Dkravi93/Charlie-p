const router = require('express').Router();

const { Products } = require('../models/products')

// for all products

router.get('/', async (req, res, next) => {
  try {
      let sortBy = req.query || null;
      let filters = req.query || null;
      let page = req.query.page || 1;
      let size = req.query.size || 4;
      let products = "";
      console.log(sortBy);  
      // pagination
    if((req.query.page || req.query.size) ){
      products = await Products.find()
          .skip((page-1)*size)
          .limit(size)

          res.status(200).json({
            status : 'success',
            count : products.length,
            data : {products}
          });
          return
    }  
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
      }else{
        products = await Products.find()
        products =  products.filter(user => {
          let isValid = true;
          for (key in filters) {
            console.log(key, user[key], filters[key]);
            isValid = isValid && user[key] == filters[key];
          }
          return isValid;
     
    });
      }
    }else if (sortBy.category){
        products = await Products.find()
          products =  products.filter(user => {
            let isValid = true;
            for (key in filters) {
              console.log(key, user[key], filters[key]);
              isValid = isValid && user[key] == filters[key];
            }
            return isValid;
      
      });
    }

    
    res.status(200).json({
      status : 'success',
      count : products.length,
      data : {products}
    });
   // filter by tile category

//    if(filters){
//     // console.log(filters)if(filter.range)
//     products = await Products.find()
//     products =  products.filter(user => {
//         let isValid = true;
//         for (key in filters) {
//           console.log(key, user[key], filters[key]);
//           isValid = isValid && user[key] == filters[key];
//         }
//         return isValid;
   
//   });
// }
    
    // res.send(filteredUsers);
    
  } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
  }
});

// for single products
router.get('/: id', async (req, res, next) => {
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

router.post('/' , async (req, res, next)=> {
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

router.patch('/:id' , async (req, res)=> {
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

router.delete('/:id' , async (req, res, next)=> {
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
