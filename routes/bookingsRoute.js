const router = require('express').Router();
const Booking = require("../models/bookingModel")
const Bus = require('../models/busModel')
const authMiddleware = require('../middlewares/authMiddleware')
const stripe = require('stripe')(process.env.stripe_key)
const {v4: uuidv4} = require('uuid')

// Book a seat
router.post('/book-seat', authMiddleware, async(req, res) => {
  try {
    // 新規予約を作成する
    console.log('book-seat try')
    const newBooking = new Booking({
      ...req.body,
      // transactionId: '1234',
      userId: req.body.userId // authMiddleware参照
    });
    await newBooking.save()
    console.log('book-seat save', newBooking)
    // 予約シートをBusモデルに保存する
    console.log('req.body.busId', req.body.busId)
    const bus = await Bus.findById(req.body.busId);
    console.log('bus', bus.name)
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    console.log('bus seatsBooked', bus.seatsBooked)
    await bus.save()
    // console.log('res:', res)
    res.status(200).send({
      message: '予約が完了しました',
      data: newBooking,
      success: true,
    })
  } catch (error) {
    res.status(500).send({
      message: '予約に失敗しました',
      data: error,
      success: false,
    })
  }
})

// make payment
router.post('/make-payment', authMiddleware, async(req, res) => {
  try {
    const {token, amount} = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })
    const payment = await stripe.charges.create({
      amount: amount,
      currency: "jpy",
      customer: customer.id,
      receipt_email: token.email,
    }, {
      idempotencyKey: uuidv4(),
    })

    if (payment) {
      res.status(200).send({
        message:"支払いが完了しました",
        data: {
          transactionId: payment.source.id,
        },
        success: true,
      })
    }else{
      res.status(500).send({
        message:"支払いに失敗しました",
        data: error,
        success: false
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:"支払いに失敗しました",
      data: error,
      success: false
    })
  }
})

// get bookings by user id
router.post('/get-bookings-by-user-id', authMiddleware, async(req, res) => {
  try {
    console.log('get-bookings-by-user-id try')
    const bookings = await Booking.find({userId: req.body.userId})
      .populate("busId")
      .populate("userId")
    res.status(200).send({
      message:"Bookings fetched successfully",
      data: bookings,
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:"Bookings fetch failed",
      data: error,
      success: false
    })
  }
})

module.exports = router;