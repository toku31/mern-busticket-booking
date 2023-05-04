import {Link, useNavigate} from 'react-router-dom'
import '../resources/auth.css'
import {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../redux/alertsSlice'
import '../resources/auth.css'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const handleSubmit= async (e) => {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    try {
      dispatch(ShowLoading())
      const response = await axios.post('/api/users/register', values)
      if(response.data.success){
        console.log("register user successfully:", response.data) ;
        toast.success(response.data.message, {theme: "colored"})
        dispatch(HideLoading())// setLoading(false)
        navigate('/login')
      } else {
        console.log("User already exists:", response.data) ;
        toast.error(response.data.message, {theme: "colored"})
        dispatch(HideLoading())// setLoading(false)
      }
    } catch (error) {
      dispatch(HideLoading())  // setLoading(false)
      toast.error('ユーザ登録に失敗しました', {theme: "colored"})
      throw new Error(`Something went wrong! ${error.message}`);
    }
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className='h-screen d-flex justify-content-center align-items-center auth'>
      <div className="w-400 card p-3">
        <form onSubmit={handleSubmit}>
          <h1 className='text-lg'>BUS TICKET - 登録</h1>
          <hr />
          <div className="mb-3">
            <label>名前</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
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
            <Link to='/login'>ここをクリックしてログイン</Link>
            <button type="submit" className="secondary-btn">
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register