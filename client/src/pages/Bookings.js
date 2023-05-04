import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import BusForm from '../components/ BusForm'
import PageTitle from '../components/PageTitle'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import BookingTable from '../components/BookingTable';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

function Bookings() {
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  const dispatch = useDispatch()
  const [bookings, setBookings] = useState([])

  const getBookings = async()=> {
    console.log('bookings data:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/bookings/get-bookings-by-user-id', {})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bookings data success:', response.data.data)
        setBookings(response.data.data) 
      }else {
        console.log('bookings data else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading())  
      console.log('bookings data error:')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBookings()
  }, [])

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className='mb-2'>
        <PageTitle title='予約リスト' />
      </div>
     {/* 予約リストのテーブル */}
    <BookingTable  bookings={bookings} className="mt-3"
      setSelectedBooking={setSelectedBooking} 
      setShowPrintModal={setShowPrintModal}
      // deleteBus = {deleteBus}
    />

    {/* 予約チケットプリントのモーダル */}
    {showPrintModal && (
      <Modal 
        show={showPrintModal} 
        onHide={()=>{
          setShowPrintModal(false)
          setSelectedBooking(null)
        }}
      >
      <Modal.Header closeButton >
        <Modal.Title>チケット印刷</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <div className="d-flex flex-column p-5" ref={componentRef}>
            <p>バス: {selectedBooking.busId.name}</p>
            <p>
              {selectedBooking.busId.from} - {selectedBooking.busId.to}
            </p>
            <hr />
            <p>
              <span>出発日：</span>{" "}
              {moment(selectedBooking.journeyDate).format("YYYY-MM-DD")}
            </p>
            <p>
              <span>出発時刻：</span>{" "}
              {selectedBooking.busId.departure}
            </p>
            <hr />
            <p>
              <span>座席番号：</span>{" "}<br />
              {selectedBooking.seats}
            </p>
            <hr />
            <p>
              <span className="text-secondary">総額：</span>{" "}
              ¥ {selectedBooking.busId.fare * selectedBooking.seats.length}
            </p>
            </div>
            <p className="mb-3 d-flex gap-2 justify-content-end" controlId="">
            <Button 
              variant="secondary" 
              type=""
              onClick={()=> {setShowPrintModal(false)
              setSelectedBooking(null)
              }}
            >Cancel</Button>
            <Button className="primary" type="submit" onClick={handlePrint}>プリント</Button>
            </p>
        </div>
      </Modal.Body>
      </Modal>
    )}
    </div>
  )
}

export default Bookings