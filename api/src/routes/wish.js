const server = require('express').Router();
const { Product, WishList, WishLine, User } = require("../db.js");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//! Create Wish (agregar al inicio de LOGIN)
server.post('/:userId', async (req, res, next) => {
    try {
        const alreadyUser = await WishList.findOne({
          where: { userId: req.params.userId},
        });
        if (!alreadyUser){
          if(typeof parseInt(req.params.userId) === 'number'){
          const state = 'created'
          const wish = await WishList.create({state})
          wish.userId = req.params.userId;
          wish.save()
          res.json(wish);
        }
      }
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Add item to WishLine de un usuario
server.post('/:userId/wish', async (req, res, next) => {
  try {
    const wish = await WishList.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    const product = await Product.findByPk(req.body.id);
    const prevWishLine = await WishLine.findOne({
      where: { productId: product.id, WishListId: wish.id },
    });
      if(!prevWishLine){
        const wishLine = await WishLine.create({
          productId: product.id,
          WishListId: wish.id,
        });  
        res.json(wishLine);
      } else {
        res.json({message: 'Product already in wishlist '})
      }
  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});

//traer todas las wish de un usuario
server.get('/:userId/', async (req, res, next) => {
  try {
    const wishes = await WishList.findAll({
      where: {userId: req.params.userId}, include: [{model: Product}, {model: User}],
    })
    res.json(wishes)
  } catch (e) {
      res.status(500).send({
        message: "error"
      })
      next(e)
    }
})


// Delete WishLine
server.delete('/:wishlineId', async (req, res, next) => {
    try {
        const { wishlineId } = req.params;
        const wish = await WishLine.findByPk(wishlineId);
        wish.destroy()
        res.json(wish)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error deleting the wishline'
        });
        next(e);
    }
})


module.exports = server;