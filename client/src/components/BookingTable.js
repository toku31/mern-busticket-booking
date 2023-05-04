import React from 'react'
import { Table } from 'react-bootstrap';
// import moment from 'moment';

function BookingTable({bookings, setSelectedBooking, setShowPrintModal, deleteBus}) {
  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>バス名</th>
                  <th>バスNo.</th>
                  <th>出発日</th>
                  <th>出発時刻</th>
                  <th>座席</th>
                  <th>アクション</th>
              </tr>
          </thead>
          <tbody>
              {bookings.map((booking) => 
                  <tr key={booking._id}>
                      <td class="align-middle">{booking.busId.name}</td>
                      <td class="align-middle">{booking.busId.number}</td>
                      <td class="align-middle">{booking.busId.journeyDate}</td>
                      {/* {moment(booking.journeyDate).format('YYYY-MM-DD')} */}
                      <td class="align-middle">{booking.busId.departure}</td>
                      <td class="align-middle">{booking.seats.join(', ')}</td>
                      <td>
                          {/* <Button variant="outline-secondary">編集</Button>
                          <Button variant="outline-danger">削除</Button> */}
`                          <div >
                            <h1
                              className='text-md underline' 
                              onClick={()=>{
                                setShowPrintModal(true)
                                setSelectedBooking(booking)
                              }}
                            >チケット印刷</h1>
                          </div>`
                      </td>
                  </tr>
              )}
          </tbody>
        </Table>
    </div>
  )
}

export default BookingTable