import React from 'react'
import { Table } from 'react-bootstrap';
import moment from 'moment';

function BusTable({buses, setSelectedBus, setShowBusForm, deleteBus}) {
  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>バス名</th>
                  <th>ナンバー</th>
                  <th>出発地</th>
                  <th>到着地</th>
                  <th>出発日</th>
                  <th>状況</th>
                  <th>編集/削除</th>
              </tr>
          </thead>
          <tbody>
              {buses.map((bus) => 
                  <tr key={bus._id}>
                      <td>{bus.name}</td>
                      <td>{bus.number}</td>
                      <td>{bus.from}</td>
                      <td>{bus.to}</td>
                      <td>
                        {moment(bus.journeyDate).format('YYYY-MM-DD')}
                      </td>
                      <td>{bus.status}</td>
                      <td>
                          {/* <Button variant="outline-secondary">編集</Button>
                          <Button variant="outline-danger">削除</Button> */}
                          <div className="d-flex gap-3">
                            <i 
                              className='ri-pencil-line' 
                              onClick={()=> {
                                setSelectedBus(bus);
                                setShowBusForm(true);
                              }}></i>
                              <i 
                                className='ri-delete-bin-line'
                                onClick={()=> {
                                  console.log('bus.id', bus)
                                  deleteBus(bus._id);
                                }}></i>
                          </div>
                      </td>
                  </tr>
              )}
          </tbody>
        </Table>
    </div>
  )
}

export default BusTable