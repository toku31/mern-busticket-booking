import {Link, useNavigate} from 'react-router-dom'
import '../resources/auth.css'
import {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../redux/alertsSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async(e) => {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    try {
      dispatch(ShowLoading()) // setLoading(false)
      const response = await axios.post('/api/users/login', values)
      if(response.data.success){
        console.log("Login user successfully:", response.data) ;
        // toast.success(response.data.message, {theme: "colored"})
        localStorage.setItem("token", response.data.data)
        window.location.href=('/')
        // window.location.reload()
        // navigate('/');
      } else {
        dispatch(HideLoading())
        console.log("Login error:", response.data) ;
        toast.error(response.data.message, {theme: "colored"})
        // setLoading(false)
      }
    } catch (error) {
      dispatch(HideLoading()) // setLoading(false)
      toast.error('ログインに失敗しました', {theme: "colored"})
      throw new Error(`Something went wrong! ${error.message}`);
    }
    // setFormData({
    //   name: '',
    //   email: '',
    //   password: ''
    // })
  };

  return (
    <div className='h-screen d-flex justify-content-center align-items-center auth'>
      <div className="w-400 card p-3">
        <form onSubmit={handleSubmit}>
          <h1 className='text-lg'>BUS TICKET - ログイン</h1>
          <hr />
          <div className="mb-3">
            <label>メールアドレス</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>パスワード</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to='/register'>ここをクリックして登録</Link>
            <button type="submit" className="secondary-btn">
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login