import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Grid, Col, Row} from 'react-bootstrap';
import Bus from '../components/Bus';

function Home() {
  const {user} = useSelector(state => state.users)
  // console.log('user:', user)
  const [filters, setFilters ] = useState({})
  const dispatch = useDispatch()
  const [buses, setBuses] = useState([])

  const getBuses = async()=> {
    const tempFilers = {}
    Object.keys(filters).forEach((key)=> {
      if (filters[key]) {
        tempFilers[key] = filters[key]
      }
    })

    console.log('home getBuses')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/get-all-buses', tempFilers)
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('getBuses success:', response.data.data)

        setBuses(response.data.data) 
      }else {
        console.log('bus data else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('GetBuses error')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBuses()
  }, [])

  return (
    <div>
      <div className='my-3 py-1'>
        <Row align-center>
          <Col lg={3} sm={12}>
            <input type="text"
              placeholder='出発地'
              value={filters.from}
              onChange={(e)=>setFilters({...filters, from: e.target.value})}
            />
          </Col>
          <Col lg={3} sm={12}>
            <input type="text"
              placeholder='到着地'
              value={filters.to}
              onChange={(e)=>setFilters({...filters, to: e.target.value})}
            />
          </Col>
          <Col lg={3} sm={12}>
            <input type="date"
              placeholder='日付'
              value={filters.journeyDate}
              onChange={(e)=>setFilters({...filters, journeyDate: e.target.value})}
            />
          </Col>
          <Col lg={3} sm={12}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={()=>getBuses()}>フィルター</button>
              <button 
                className="outlined px-3" 
                onClick={()=>setFilters({from: '', to: '', journeyDate: ''})}
              >クリア</button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
          <Row style={{gap:'15px 0px'}}>
          {buses.filter((bus) => bus.status === "発車前").map((bus) => (
              <Col key={bus._id} lg={6} xs={12} sm={12}>
                <Bus bus={bus}/>
              </Col>
            ))}
            {/* {buses.map(bus => (
              <Col key={bus._id} lg={6} xs={12} sm={12}>
                <Bus bus={bus}/>
              </Col>
            ))} */}
          </Row>
      </div>
    </div>
  )
}

export default Home