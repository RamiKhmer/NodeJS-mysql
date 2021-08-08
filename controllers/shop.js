const Product = require('../models/product');
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([data]) => {
      res.render('shop/product-list', {
        prods: data,
        pageTitle: 'All Products',
        path: '/products'
      });
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([data]) => {
      res.render('shop/index', {
        prods: data,
        pageTitle: 'Shop',
        path: '/'
      });
    })
};

exports.getCart = (req, res, next) => {

  Cart.getCart().then(([carts]) => {
    // get carts
    Product.fetchAll().then(([products]) => {
      // get Products
      const cartProducts = [];
      var totalPrice = 0;

      for (product of products) {
        const cartProductData = carts.find(prod => prod.pro_id === product.id);
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
          totalPrice = totalPrice + cartProductData.unit_price * cartProductData.qty;
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts,
        totalPrice: totalPrice.toFixed(2)
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.id;
    Cart.addProduct(id);
    res.redirect('/cart');
};

exports.postDeleteCart = (req, res, next) => {
  const id = req.body.id;
  // const price = req.body.price;
  Product.findById(id, product => {
    Cart.deleteProduct(id, product.price);
    res.redirect('/cart');
  })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id
  Product.findById(id)
    .then(([data]) => {
      console.log(data);
      res.render('shop/product-detail', {
        path: "/products",
        pageTitle: "Product Detail",
        product: data[0]
      });
    });
}