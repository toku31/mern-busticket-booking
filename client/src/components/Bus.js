import React from 'react'
import {useNavigate} from 'react-router-dom'

function Bus({bus}) {
  const navigate = useNavigate()

  return (
    <div className='card p-2'>
      <h1 className='text-lg primary-text'>{bus.name}</h1>
      <hr />
      <div className='d-flex justify-content-between'>
        <div>
          <p className='text-sm'>出発地</p>
          <p className='text-sm'>{bus.from}</p>
        </div>

        <div>
          <p className='text-sm'>到着地</p>
          <p className='text-sm'>{bus.to}</p>
        </div>

        <div>
          <p className='text-sm'>運賃</p>
          <p className='text-sm'>¥{bus.fare}</p>
        </div>
      </div>
      <hr />
      <div className='d-flex justify-content-between align-items-end'>
        <div>
          <p className='text-sm'>出発日</p>
          <p className='text-sm'>{bus.journeyDate}</p>
        </div>
        <h1 className="text-lg underline secondary-text" onClick={()=>navigate(`/book-now/${bus._id}`)}>予約する</h1>
      </div>
    </div>
  )
}

export default Bus