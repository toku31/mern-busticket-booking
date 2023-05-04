import { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Grid, Col, Row} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import StripeCheckout from 'react-stripe-checkout';

function BookNow() {

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const [bus, setBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

  const getBus = async()=> {
    // console.log('getbus success:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/get-bus-by-id', {_id : params.id})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('getbus success:', response.data.data)
        setBus(response.data.data) 
        // console.log(bus)
      }else {
        console.log('getbus else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('getbus error:')
      toast.error(error.message)
    }
  }

  const bookNow = async (transactionId)=> {
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/bookings/book-seat', {
        busId : bus._id,
        seats: selectedSeats,
        transactionId
      })
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bookNow success:', response.data.data)
        toast.success(response.data.message)
        navigate('/bookings')
      }else {
        console.log('bookNow else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bookNow error:')
      toast.error(error.message)
    }
  };

  const onToken = async (token) => {
    // console.log(token)
    try {
      dispatch(ShowLoading()) 
      console.log('bookNow token:', token)
      const response = await axiosInstance.post('/api/bookings/make-payment', {
        token,
        amount: selectedSeats.length * bus.fare,
      })
      dispatch(HideLoading());
      if (response.data.success){
        toast.success(response.data.message);
        bookNow(response.data.data.transactionId)
      }else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    getBus()
  }, [])

  // {bus && console.log('bookedSeats', bus.journeyDate)}
  return (
    <div>
      {bus &&
        <Row className='mt-3'>
            <Col lg={6} xs={12} sm={12}>
              <p className="text-xl primary-text">{bus.name}</p>
              <p className="text-md">{bus.from}-{bus.to}</p>
              <hr />

              <div className='gap-2'>
                <p className="text-md">出発日: {bus.journeyDate}</p>
                <p className="text-md">運賃: ¥{bus.fare}</p>
                <p className="text-md">出発時刻: {bus.departure}</p>
                <p className="text-md">到着時刻: {bus.arrival}</p>
                <p className="text-md">残座席: {bus.capacity - bus.seatsBooked.length}</p>
              </div>
              <hr />

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">
                  選択した座席: {selectedSeats.join(", ")}
                </h1>
                <h1 className="text-2xl mt-2">
                  運賃：¥{bus.fare * selectedSeats.length} /-
                </h1>
                <hr />

                <StripeCheckout
                  billingAddress
                  token={onToken}
                  amount={bus.fare * selectedSeats.length}
                  currency = "jpy"
                  stripeKey="pk_test_51MZD1gC1IWmbV77mFtIeuHiZNykx2UUfs3cs6odT8DKk2vVQ46kmXTMbb2l2XCEA95kvYXEHZ2njN3oaUfRKqOa200V1QQTJOd"
                >
                  <button // 座席を選択したら予約ボタンの色がグレーから青になる
                    className={`btn primary-btn ${(selectedSeats.length===0) && 'disabled-btn' }`}
                    // onClick={()=>bookNow()}
                  >予約する</button>
                </StripeCheckout>
              </div>
            </Col>
            <Col lg={6} xs={12} sm={12}>
                <SeatSelection  
                  selectedSeats = {selectedSeats}
                  setSelectedSeats = {setSelectedSeats}
                  bus = {bus}
                />
            </Col>
        </Row>
      }
    </div>
  )
}

export default BookNow