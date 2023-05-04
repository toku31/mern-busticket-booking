const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization.split(' ')[1] // Bear△X3mkdilj~~~~
    if (!token) {return res.status(401).send({
      message: "認証に失敗しました",
      success: false,
    })}
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = decoded.userId;
    // Get user from the token　　　　パスワードを含めない ★　★　★　★　★　 ポイント１
    // req.user = await User.findById(decoded.id).select('-password') 
    next()
  } catch (error) {
    return res.status(400).send({
      message: "認証に失敗しました",
      success: false,
    })
  }
}