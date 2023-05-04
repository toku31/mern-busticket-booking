const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const Bus = require('../models/busModel')

// add Bus
router.post('/add-bus', async function (req, res){
  console.log('add-bus')
  try {
    const existingBus = await Bus.findOne({number: req.body.number})
    if (existingBus){
      return res.status(200).send({success:false, message:'既に存在するバスです'})
    }
    console.log(req.body)
    const newBus = new Bus(req.body)
    console.log('new bus')
    await newBus.save()
    console.log('new bus save')
    return res.status(200).send({
      success: true,
      message: 'バスを追加しました'
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

// Update bus 21
router.post('/update-bus', authMiddleware, async function (req, res){
  console.log('update-bus')
  try {
    await Bus.findByIdAndUpdate(req.body._id, req.body)
    return res.status(200).send({
      success: true,
      message: 'バスを更新しました'
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

// delete bus
router.post('/delete-bus', authMiddleware, async function (req, res){
  console.log('delete-bus', req.body)
  try {
    const buses = await Bus.findByIdAndDelete(req.body._id)
    return res.status(200).send({
      success: true,
      message: 'バスを削除しました',
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})


// get all buses
router.post('/get-all-buses', authMiddleware, async function (req, res){
  console.log('get-all-buses')
  try {
    const buses = await Bus.find(req.body)
    console.log('filters:', req.body)
    // const buses = await Bus.find({ from: '横浜'})
    return res.status(200).send({
      success: true,
      message: 'バスを全て取得しました',
      data: buses
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

// get-bus-by-id
router.post('/get-bus-by-id', authMiddleware, async function (req, res){
  console.log('get-bus-buses')
  try {
    const bus = await Bus.findById(req.body._id)
    return res.status(200).send({
      success: true,
      message: 'Busを取得しました',
      data: bus
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

module.exports = router;
