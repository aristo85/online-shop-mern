const mime = require('mime');
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');

module.exports = (app, db, ensureAuthenticated) => {
//admin request for uploading images of products in the server-side in folder 'uploads'
    app.post('/api/product/uploadImage', ensureAuthenticated, (req, res) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let upload = req.files.file;
        let name = upload.name;
        let path = `uploads/${name}`
        const ext = mime.getExtension(upload.mimetype);
        if (!(ext === 'jpeg' || ext === 'jpg' || ext === 'png')) {
            res.status(400).end('only jpg and png are allowed', false);
        }
        upload.mv(path, function(err) {
            if (err)
                return res.status(500).send(err);
            console.log(upload.tempFilePath);
            res.json({ success: true, image: path, fileName: name});
        });
    });
//handling admin request and saving new product in the 'product' collection
    app.post('/api/upload/product', ensureAuthenticated, (req, res) => {
        const  productDB = req.body;
        console.log(productDB);
        db.collection('product').save(productDB, (err, product) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true })
        })
        }
    );
//get all products from 'product' collection DB
    app.get('/api/product/getProducts', (req, res, next) => {
        db.collection("product").find({})
            .toArray(function(err, result) {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({ success: true, productList: result })
            });

    });
    //getting one product by query from DB (?id=${this.productId})
    app.get("/api/product/product_by_id", (req, res, next) => {
        let productId = req.query.id;
        db.collection('product').update(
            {_id: ObjectId(productId)},
            { $inc: { views: 1 } }, (err,data) => {
                if (err) return res.status(400).json({ success: false, err });
                db.collection('product').find({ _id: ObjectId(productId) })
                    .toArray(function(err, result) {
                        if (err) return  res.status(400).send(err);
                        return res.status(200).json(result)
                    });
            });


    });
//handling all cart modifications like adding removing increment or decrementing product
    app.post('/api/users/cartPage', ensureAuthenticated, (req, res) => {
        let cart = req.body;
        console.log(cart)
        db.collection('users').update(
            {_id: ObjectId(req.user._id)},
            { $set: { cart: cart } }, (err,data) => {
                assert.equal(null, err);
                db.collection("users").findOne({_id: ObjectId(req.user._id)}, (err, resp) => {
                    if (err) return res.status(400).json({success: false, err});
                    console.log(resp);
                    return res.status(200).json(resp.cart)
                });
            });


    });
//dealing with data, after transaction success (payment success) from user
    app.post(`/api/users/transaction`, ensureAuthenticated, (req, res) => {
        const history = req.body.history;
        const data = req.body.payment;
        history.forEach(item => {
            item.dateOfPurchase = new Date();
            item.paymentId = data.paymentID
        });
        const paymentDB = {
            user: { id: req.user._id, name: req.user.name, email: req.user.email},
            data: data,
            product: history
        };

        for (let cartItem of history) {
            db.collection('product').update(
                {_id: ObjectId(cartItem.id)},
                { $inc: { sold: cartItem.quantity } }, (err,data) => {
                    if (err) return res.status(400).json({ success: false, err });
                });
        }

        db.collection('users').update(
            {_id: ObjectId(req.user._id)},
            { $set: { cart: [] }, $push: { history: {$each: history} } }, (err,data) => {
                if (err) return res.status(400).json({ success: false, err });
                db.collection('payment').save(paymentDB, (err, product) => {
                    if (err) return res.status(400).json({ success: false, err });
                    return res.status(200).json({ success: true , cart: []})
                });
            });
    });
//handling request for the history of a users transactions
    app.get('/api/users/history', (req, res) => {
        db.collection("users").findOne({_id: ObjectId(req.user._id)}, (err, resp) => {
            if (err) return res.status(400).json({success: false, err});
            console.log(resp);
            return res.status(200).json({success: true, history: resp.history})
        });
    });


};