var express = require('express');
var router = express.Router();
const CarModel = require('../model/car.model');

router.get('/', (req, res) => {
    console.log(req.query.name);
    CarModel.find({ name: req.query.name }).exec((err, cars) => {
        if (err) {
            res.send('Khong the lay thong tin car')
        } else {
            console.log('Lay thanh cong cars');
            res.json(cars);
        }
    })
});

router.get('/:id', (req, res) => {
    CarModel.findOne({
        _id: req.params.id
    }).exec((err, car) => {
        if (err) {
            res.send('Co loi xay ra...');
        } else {
            console.log('get car by ID');
            res.json(car);
        }
    });
});

router.put('/:id', (req, res) => {
    CarModel.findOneAndUpdate({
            _id: req.params.id
        },
        { $set: { name: req.body.name }},
        { upsert: true },
        (err, car) => {
            if (err) {
                res.send('Xay ra loi update !!!');
            } else {
                // 1. find lai
                // 2. return thanh cong hay that bai
                res.send(200);
            }
        }
    )
})

router.post('/', (req, res) => {
    const car = new CarModel();
    car.name = req.body.name;
    car.manufacturer = req.body.manufacturer;
    car.price = req.body.price;

    car.save((err, car) => {
        if (err) {
            res.send('Error luu thong tin car');
        } else {
            console.log('Luu thong tin car thanh cong', car);
            res.send(car);
        }
    });
});

module.exports = router;
