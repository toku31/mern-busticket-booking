import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../resources/global.css'
import { useDispatch} from 'react-redux'; 
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { toast } from 'react-toastify';

function  BusForm(props) {

  // actionType='add'
  const {showBusForm, setShowBusForm, actionType, getData, selectedBus, setSelectedBus} = props
  console.log('actionType:', actionType)
  console.log('selectedBus:', selectedBus)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: actionType==='add' ? "" : selectedBus.name,
    number: actionType==='add' ? "" : selectedBus.number,
    capacity: actionType==='add' ? "" : selectedBus.capacity,
    from: actionType==='add' ? "" : selectedBus.from,
    to: actionType==='add' ? "" : selectedBus.to,
    journeyDate: actionType==='add' ? "" : selectedBus.journeyDate,
    departure: actionType==='add' ? "" : selectedBus.departure,
    arrival: actionType==='add' ? "" : selectedBus.arrival,
    type: actionType==='add' ? "AC" : selectedBus.type,
    fare: actionType==='add' ? "" : selectedBus.fare,
    status: actionType==='add' ? "発車前" : selectedBus.status,
  })

  const {name, number, capacity, from, to, journeyDate, departure, arrival, type ,fare, status} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    // setLoading(true)
    const values ={
      name: name,
      number: number,
      capacity: capacity,
      from: from,
      to: to,
      journeyDate: journeyDate,
      departure: departure,
      arrival: arrival,
      type: type,
      fare: fare,
      status: status
    }
    console.log('values:', values)

    try {
      dispatch(ShowLoading())
      let response = null
        if(actionType==='add'){
          console.log('add')
          response = await axiosInstance.post('/api/buses/add-bus', values)
          console.log('res:',response.data)
        }else{
          console.log('edit')
          response = await axiosInstance.post('/api/buses/update-bus', {
            ...values,
            _id: selectedBus._id,
          })
        }
        if (response.data.success){
          console.log('success')
          toast.success(response.data.message)
          getData()
          setShowBusForm(false)
          setSelectedBus(null)
        } else {
          console.log('error1')
          toast.error(response.data.message)
        }
        dispatch(HideLoading())
    } catch (error) {
      console.log('error2')
      toast.error(error.message)
      dispatch(HideLoading())
    }

    // setFormData({
    //   name: "",
    //   number: "",
    //   capacity: "",
    //   from: "",
    //   to: "",
    //   journeyDate: "",
    //   departure: "",
    //   arrival: "",
    //   type: "",
    //   fare: ""
    // })
  }

  const handleClickHide = () => {
    setShowBusForm(false)
    setSelectedBus(null)
  }

  return (
<div className="modal-80w">
<Modal 
  show={showBusForm} 
  // onHide={()=>setShowBusForm(false)} 
  onHide={()=>handleClickHide()} 
  dialogClassName="modal-dialog-fluid "
>
      <Modal.Header closeButton >
        <Modal.Title>{actionType==='add' ? 'バスの追加' : 'バスの編集'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Form className='transaction-form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>バス名</Form.Label>
              <Form.Control type="text" placeholder="" value={name} onChange={handleChange} name="name"/>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="number">
                <Form.Label>ナンバー</Form.Label>
                <Form.Control type="text" placeholder="" value={number} onChange={handleChange} name="number"/>
              </Form.Group>

              <Form.Group as={Col} controlId="capacity">
                <Form.Label>乗車人数</Form.Label>
                <Form.Control type="text" placeholder="" value={capacity} onChange={handleChange} name="capacity"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="from">
                <Form.Label>出発地</Form.Label>
                <Form.Control type="text" placeholder="" value={from} onChange={handleChange} name="from"/>
              </Form.Group>

              <Form.Group as={Col} controlId="to">
                <Form.Label>到着地</Form.Label>
                <Form.Control type="text" placeholder="" value={to} onChange={handleChange} name="to"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="journeyDate">
                <Form.Label>出発日</Form.Label>
                <Form.Control type="date" placeholder="" value={journeyDate} onChange={handleChange} name="journeyDate"/>
              </Form.Group>

              <Form.Group as={Col} controlId="departure">
                <Form.Label>出発時間</Form.Label>
                <Form.Control type="time" placeholder="" value={departure} onChange={handleChange} name="departure"/>
              </Form.Group>

              <Form.Group as={Col} controlId="arrival">
                <Form.Label>到着時間</Form.Label>
                <Form.Control type="time" placeholder="" value={arrival} onChange={handleChange} name="arrival"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="type">
                <Form.Label>タイプ</Form.Label>
                <Form.Select id="" name="type" onChange={handleChange}>
                {/* <option value='AC'></option> */}
                <option value='AC'>AC</option>
                <option value='Non-AC'>Non-AC</option>
              </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="fare">
                <Form.Label>運賃</Form.Label>
                <Form.Control type="text" placeholder="" value={fare} onChange={handleChange} name="fare"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="status" >
              <Form.Label>状況</Form.Label>
              <Form.Select id="" name="status" onChange={handleChange}>
              {/* <option value='発車前'></option> */}
              <option value='発車前'>発車前</option>
              <option value='運行中'>運行中</option>
              <option value='完了'>完了</option>
              </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="">
                <Form.Label></Form.Label>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3 d-flex justify-content-end" controlId="save">
            <Button className="primary-btn" type="submit">保存</Button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default  BusForm