import {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import '../resources/layout.css'
import { useSelector } from 'react-redux'; 

function DefaultLayout({children}) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {user} = useSelector(state => state.users)
  console.log('DefaultLayout:user', user)
  const userMenu = [
    {
      name: 'ホーム',
      path: '/',
      icon: 'ri-home-line'
    },
    {
      name: '予約リスト',
      path: '/bookings',
      icon: 'ri-file-list-line'
    },
    {
      name: 'プロフィール',
      path: '/profile',
      icon: 'ri-user-line'
    },
    {
      name: 'ログアウト',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]

  const adminMenu = [
    {
      name: 'ホーム',
      path: '/',
      icon: 'ri-home-line'
    },
    {
      name: 'バス',
      path: '/admin/buses',
      icon: 'ri-bus-line'
    },
    {
      name: 'ユーザー',
      path: '/admin/users',
      icon: 'ri-user-line'
    },
    {
      name: '予約リスト',
      path: '/admin/bookings',
      icon: 'ri-file-list-line'
    },
    {
      name: 'ログアウト',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu
  let activeRoute = window.location.pathname
  console.log('activeRoute', activeRoute)
  if (window.location.pathname.includes('book-now')){
    activeRoute=('/')
  }

   // className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
  return (
    <div className='layout-parent'>
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className='logo'>バスチケット予約</h1>
          <h1 className='role'>{user?.name} <br />Role : {user?.isAdmin ? '管理者' : 'ユーザー' }</h1>
        </div>
        <div className="d-flex flex-column gap-3 menu">
          {menuToBeRendered.map((item, index) => {
            return (
              <div key={index} className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
                <i className={item.icon} ></i>
                {!collapsed && 
                <span onClick={() => {
                  if(item.path==="/logout"){
                    localStorage.removeItem('token')
                    navigate('/login')
                    } else {
                      navigate(item.path)
                    }
                  }}
                >{item.name}</span>}
              </div>
            )
          })}
        </div>
      </div>
      <div className="body">
        <div className="header" onClick={()=>setCollapsed(!collapsed)}>
          {collapsed ? (<i className="ri-menu-2-fill"></i>) : (<i className="ri-close-line"></i>)}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout