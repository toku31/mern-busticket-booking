import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle'
import { axiosInstance } from '../../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../../redux/alertsSlice';
import UserTable from '../../components/UserTable';

function  AdminUsers() {
  const dispatch = useDispatch()
  // const [showUserForm, setShowUserForm] = useState(false)
  // const [actionType, setActionType] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const getUsers = async()=> {
    console.log('User data success1:')
    try {
      dispatch(ShowLoading()) 
      console.log('User data success2:')
      const response = await axiosInstance.post('/api/users/get-all-users', {})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('User data success3:', response.data.data)
        setUsers(response.data.data) 
      }else {
        console.log('User data else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('User data error:')
      toast.error(error.message)
    }
  }

  const updateUserPermissions = async (user, action) => {
    console.log('updateUserPermissions start')
    try {
      let payload = null
      if (action === "make-admin"){
        console.log('make-admin')
        payload = {
          ...user,
          isAdmin:true,
        }
      } else if (action === "remove-admin"){
        console.log('remove-admin')
        payload = {
          ...user,
          isAdmin:false,
        }
      } else if (action === "block"){
        console.log('block')
        payload = {
          ...user,
          isBlocked:true,
        }
      } else if (action === "unblock"){
        console.log('unblock')
        payload = {
          ...user,
          isBlocked:false,
        }
      }
      dispatch(ShowLoading()) 
      console.log('updateUserPermissions start2')
      const response = await axiosInstance.post('/api/users/update-user-permissions', payload)
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('updateUserPermissions success')
        getUsers()
      }else {
        console.log('User delete else')
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading())  
      console.log('User delete error')
      toast.error(error.message)
    }
  }


  // const deleteUser = async(id) => {
  //   console.log('User data success:')
  //   try {
  //     dispatch(ShowLoading()) 
  //     console.log('User data success:')
  //     const response = await axiosInstance.post('/api/users/delete-User', {_id: id})
  //     dispatch(HideLoading())  
  //     if(response.data.success){
  //       console.log('User deleted')
  //       getUsers()
  //       toast.success(response.data.message)
  //     }else {
  //       console.log('User delete else')
  //       toast.error(response.data.message)
  //     }
  //   } catch (error) {
  //     console.log('User delete error')
  //     toast.error(error.message)
  //   }
  // }

  useEffect(()=> {
    getUsers()
  }, [])

  return (
    <div>
      <div className='d-flex justify-content-between my-2'>
        <PageTitle title='ユーザー' />
        {/* <button className="primary-btn" onClick={()=>setShowUserForm(true)}>
          バスを追加
        </button> */}
      </div>

      <div className="User-table">
        <UserTable  
          users={users} 
          setSelectedUser={setSelectedUser} 
          // setShowUserForm={setShowUserForm}
          // deleteUser = {deleteUser}
          updateUserPermissions = {updateUserPermissions}
        />
      </div>

    </div>
  )
}

export default  AdminUsers