const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const authMiddleware = require('../middlewares/authMiddleware')

// register new user
router.post('/register', async(req, res) => {
  try {
    const existingUser = await User.findOne({email: req.body.email}) 
    if (existingUser){
      console.log('already same email exists')
      return res.send({
        message: '既にユーザが存在しています',
        success: false,
        data: null,
      })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashedPassword;
    const newUser = new User(req.body)
    await newUser.save()
    res.send({
      message: 'ユーザを登録しました',
      success: true,
      data: null,
    })
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    })
  }
})

// login user
router.post('/login', async(req, res) => {
  const {email, password} = req.body
  try {
    const userExists = await User.findOne({email}) 
    if (!userExists){
      console.log('User does not exist')
      return res.send({
        message: 'ユーザが存在しません',
        success: false,
        data: null,
      })
    }

    if (userExists.isBlocked) {
      return res.send({
        message: "アカウントがブロックされています。管理者にお問合せください。",
        success: false,
        data: null,
      })
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password)
    if (!passwordMatch){
      return res.send({
        message: 'パスワードが正しくないです',
        success: false,
        data: null,
      })
    }

    const token = jwt.sign(
      { userId: userExists._id}, 
      process.env.JWT_SECRET,
      { expiresIn: "1d"}
    )
    res.send({
      message: "ログインに成功しました",
      success: true,
      data: token,
    })
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    })
  }
});

// get user by id
router.post('/get-user-by-id', authMiddleware, async(req, res) => {
  try {
    const user = await User.findById(req.body.userId)  // authMiddlewareを参照
      res.send({
        message: 'ユーザを取得しましました',
        success: true,
        data: user,
      })
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    })
  }
});

// get all users 34
router.post('/get-all-users', authMiddleware, async function (req, res){
  console.log('get-all-users')
  try {
    const users = await User.find({})
    console.log('users:', req.body)
    // const buses = await Bus.find({ from: '横浜'})
    return res.status(200).send({
      success: true,
      message: 'ユーザーを全て取得しました',
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success:false, 
      message: error.message,
      data: null,
    })
  }
})

// Update user 34
router.post('/update-user-permissions', authMiddleware, async function (req, res){
  console.log('update-user')
  try {
    await User.findByIdAndUpdate(req.body._id, req.body)
    return res.status(200).send({
      success: true,
      message: 'ユーザーを更新しました',
      data: null,
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})


module.exports = router