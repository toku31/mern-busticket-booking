import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import PageTitle from '../components/PageTitle'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useReactToPrint } from 'react-to-print';
import { useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'; 
import moment from 'moment';

function Profile() {
  const navigate = useNavigate()
   const {user} = useSelector(state => state.users)
  console.log('DefaultLayout:user', user)
  // const [selectedBooking, setSelectedBooking] = useState(null)

  const dispatch = useDispatch()
  const [bookings, setBookings] = useState([])

  useEffect(()=> {
    // getBookings()
  }, [])

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className='mb-2'>
        <PageTitle title='プロフィール' />
      </div>
    {/* 予約チケットプリントのモーダル */}
      <div>
        <div className="d-flex flex-column p-5" >
          <p>
            <span>名前：</span>{" "}
              {user.name}
          </p>
          <hr />
          <p>
            <span>メールアドレス：</span>{" "}
            {user.email}
          </p>
          <hr />
          <p>
            <span>パスワード：</span>{" "}<br />
            {user.password}
          </p>
          <hr />
          <p>
            <span className="text-secondary">登録日：</span>{" "}
              {moment(user.createdAt).format("YYYY-MM-DD")}
          </p>
          </div>
          <p className="mb-3 d-flex gap-2 justify-content-center" controlId="">
          {/* <Button className="primary-btn" type="submit" >編集</Button> */}
          </p>
      </div>
      </div>
  )
}

export default Profile