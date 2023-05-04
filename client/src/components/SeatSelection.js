import React from 'react'
import { Col, Row} from 'react-bootstrap';
import '../resources/bus.css'

function SeatSelection({selectedSeats, setSelectedSeats, bus}) {
  // console.log('selectedSeats1', selectedSeats)
  const capacity = bus.capacity
  const selectOrUnselectSeats = (seatNumber)=> {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat)=> seat !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  return (
    <div className='mx-5'>
      <div className="bus-container">
        <Row style={{gap:'10px 0px'}}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            let seatClass=''
            // console.log('selectedSeats', selectedSeats)
            if(selectedSeats.includes(seat + 1)){
              seatClass='selected-seat'
            }else if (bus.seatsBooked.includes(seat + 1)){
              seatClass='booked-seat'
            }

            return (
              <Col sm={3}>
              <div 
                // key={Array(capacity).keys()}
                className={`seat ${seatClass}`}
                onClick={()=>selectOrUnselectSeats(seat + 1)}
              >
                {seat + 1}
              </div>
            </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default SeatSelection