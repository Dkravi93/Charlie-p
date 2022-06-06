const router = require('express').Router();

const { Products } = require('../models/products')

// for all products

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.find()
    res.status(200).json({
      status : 'success',
      count : products.length,
      data : {products}
    });
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

router.post('/' , async (req, res, next)=> {
   try {
    const products = await Products.create(req.body);
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

module.exports = router;
