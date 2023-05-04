import axios from 'axios'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'; 
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';

function ProtectedRoute({children}) {
  const dispatch = useDispatch()  
  // const [loading, setLoading] = useState(true)
  // const {loading} = useSelector(state=>state.alerts) 20でコメントアウト
  const {user} = useSelector(state=>state.users)

  const validateToken= async()=> {
    try {
      dispatch(ShowLoading()) 
      const response = await axios.post('/api/users/get-user-by-id', {},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        console.log('data success')
        dispatch(HideLoading())   // setLoading(false)
        dispatch(SetUser(response.data.data))  
      }else {
        dispatch(HideLoading())  // setLoading(false)
        localStorage.removeItem('token')
        toast.error(response.data.error)
        navigate('/login')
      }
    } catch (error) {
      dispatch(HideLoading())  // setLoading(false)
      localStorage.removeItem('token')
      toast.error('from protected route')
      toast.error(error.message)
      navigate('/login')
    }
  }
  const navigate = useNavigate()
  useEffect(()=> {
    if (localStorage.getItem('token')) {
      validateToken()
    } else {
      navigate('login')
    }
  }, [])

  return (
    <div>
      {/* { !loading &&  <DefaultLayout>{children}</DefaultLayout> } */}
      {user && <DefaultLayout>{children}</DefaultLayout> }
    </div>
  )
}

export default ProtectedRoute