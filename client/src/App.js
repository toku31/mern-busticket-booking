import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './resources/global.css'
import Register from './pages/ Register';
import Home from './pages/Home';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import AdminHome from './pages/Admin/AdminHome'
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import BookNow from './pages/BookNow';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';


function App() {
  const {loading} = useSelector(state => state.alerts)

  return (
    <div>
      {loading && <Loader />}
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path="/book-now/:id" element={<ProtectedRoute><BookNow /></ProtectedRoute>}></Route>
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>

          {/* <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>}></Route> */}
          <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses /></ProtectedRoute>}></Route>
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>}></Route>

          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}  />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}  />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
