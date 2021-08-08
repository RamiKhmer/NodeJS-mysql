const db = require("../util/database");

module.exports = class Cart {

    static addProduct(id) {
        // Fetch the previus cart
        db.execute("SELECT * FROM products WHERE id=" + id).then(([product]) => {

            db.execute("SELECT * FROM carts WHERE pro_id=" + id).then(([data]) => {
                if (data[0]) {
                    db.execute("UPDATE carts SET qty= ? WHERE id = ?", [data[0].qty + 1, data[0].id]);
                    // console.log(data);
                } else {
                    db.execute("INSERT INTO carts (pro_id, qty, unit_price) VALUES (?,?,?)",
                        [product[0].id, 1, product[0].price]);
                    // console.log("gg new");
                }
            });
        });

    };

    static deleteProduct(id, productPrice) {
        // fs.readFile(p, (err, fileContent) => {

        //     const updateCart = {
        //         ...JSON.parse(fileContent)
        //     };
        //     const product = updateCart.products.find(prod => prod.id === id);
        //     // Check if product no available in cart
        //     if (!product) {
        //         return;
        //     }
        //     const productQty = product.qty;
        //     updateCart.products = updateCart.products.filter(prod => prod.id !== id);
        //     updateCart.totalPrice = updateCart.totalPrice - productPrice * productQty;
        //     fs.writeFile(p, JSON.stringify(updateCart), err => {
        //         err ? console.log(err) : "";
        //     });
        // });
    };

    static getCart() {
        return db.execute('SELECT * FROM carts');
    };

}