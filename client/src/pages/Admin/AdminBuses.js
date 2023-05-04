import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BusForm from '../../components/ BusForm'
import PageTitle from '../../components/PageTitle'
import { axiosInstance } from '../../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../../redux/alertsSlice';
import BusTable from '../../components/BusTable';

function  AdminBuses() {
  const dispatch = useDispatch()
  const [showBusForm, setShowBusForm] = useState(false)
  // const [actionType, setActionType] = useState('')
  const [buses, setBuses] = useState([])
  const [selectedBus, setSelectedBus] = useState(null)

  const getBuses = async()=> {
    console.log('bus data success:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/get-all-buses', {})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bus data success:', response.data.data)
        setBuses(response.data.data) 
      }else {
        console.log('bus data else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bus data error:')
      toast.error(error.message)
    }
  }

  const deleteBus = async(id) => {
    console.log('bus data success:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/delete-bus', {_id: id})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bus deleted')
        getBuses()
        toast.success(response.data.message)
      }else {
        console.log('bus delete else')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bus delete error')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBuses()
  }, [])

  return (
    <div>
      <div className='d-flex justify-content-between my-2' >
        <PageTitle title='高速バス' />
        <button className="primary-btn" onClick={()=>setShowBusForm(true)}>
          バスを追加
        </button>
      </div>

      <div className="bus-table">
        <BusTable  
          buses={buses} 
          setSelectedBus={setSelectedBus} 
          setShowBusForm={setShowBusForm}
          deleteBus = {deleteBus}
        />
      </div>
      {showBusForm && (
      <BusForm  
        showBusForm={showBusForm} 
        setShowBusForm ={setShowBusForm} 
        actionType={selectedBus ? 'edit' : 'add'} 
        selectedBus={selectedBus}
        getData = {getBuses}
        setSelectedBus = {setSelectedBus}
      />
      )}
    </div>
  )
}

export default  AdminBuses