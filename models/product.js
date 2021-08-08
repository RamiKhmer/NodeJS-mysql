const db = require("../util/database");

const Cart = require('./cart');



module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if(this.id == null){
      // save product to database 
      // console.log("save: ",this.title);
      db.execute("INSERT INTO products (title, price, description, imageUrl) VALUES (?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
      );
    }else{
      // update product 
      // console.log("update: ",this);
      db.execute("UPDATE products SET title = ?, price = ? , description = ?, imageUrl = ? WHERE id = ?",
      [this.title, this.price, this.description, this.imageUrl, this.id]);
    }
  }

  static deleteById(id) {
    db.execute("DELETE FROM products WHERE id="+id);
    // console.log("Successful delete product");
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE id='+id);
  }

};