import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ParentDashboard from './Components/ParentDashboard'
import Notifications from './Components/Notifications'
import Children from './Components/Children'


export const MyRoutes = () =>
  <Router>
    <Routes>
      <Route path="/login" element={<ParentDashboard />} />
      <Route path="/parentDashboard" element={<ParentDashboard />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path='/children' element={<Children/>}/>
      <Route path='*' element={<Navigate to='/login' />} /> 
    </Routes>
  </Router>
