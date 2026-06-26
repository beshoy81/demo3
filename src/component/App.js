import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Home/home'
import Nav from './Nav/nav'
import Login from './Login/login'
import Register from './Register/register'
import Notfound from './Notfound/notfound'
import ForgetPassword from './Forget/forget'
import VerifyEmail from './Verify-email/verify-email'
import NewPassword from './Newpassword/newpassword'
import ApartmentFormUI from './Addproperty/addproperty'
import PreferencesIntro from './PreferencesIntro/preferencesIntro'
import Hi from './Hi/hi'
import GoogleAuth from './GoogleAuth/GoogleAuth'
import Addpropertydone from '../AddPropertyDone/AddPropertyDone'
import PropertyType from './PropertyType/PropertyType'
import BrowseRooms from './BrowseRooms/bwseRooms'
import AddSharedProperty from './AddSharedProperty/AddSharedProperty'
import BrowseProperties from './BrowseProperties/BrowseProperties'
import ViewBrowseRooms from './ViewBrowseRooms/ViewBrowseRooms'
import PropertyDetails from './PropertyDetails/PropertyDetails'
import RoomDetails from './RoomDetails/RoomDetails'
import PreferencesForm from './PreferencesForm/PreferencesForm'
import BookingPage from './BookingPage/BookingPage'
import BookingRoom from './BookingRoom/BookingRoom' 
import Saved from './Saved/Saved'
import Profile from './Profile/Profile'
import MyProperties from '../Myproperties/Myproperties'
import PersonalInfo from '../PersonalInfo/PersonalInfo'
import HostBookingRequests from './HostBookingRequests/HostBookingRequests'
import ViewProfile from './ViewProfile/ViewProfile'
import PropertyReviews from './PropertyReviews/PropertyReviews'
import RoomReviews from './RoomReviews/RoomReviews'
import AddReview from './AddReview/AddReview'
import ReviewSuccess from './ReviewSuccess/ReviewSuccess'
import UserManagement from './UserManagement/UserManagement'
import AdminDashboard from './AdminDashboardPage/AdminDashboardPage'
import ReportsPage from './ReportsPage/ReportsPage'

function AppContent() {
  const location = useLocation();
  const hiddenNavRoutes = ["/admin-dashboard", "/user-management", "/reports"];
  const hideNav = hiddenNavRoutes.includes(location.pathname);

  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path='/Hi' element={<Hi/>}/>
        <Route path='/GoogleAuth' element={<GoogleAuth/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/ApartmentFormUI" element={<ApartmentFormUI />} />
        <Route path="/PreferencesIntro" element={<PreferencesIntro />} />
        <Route path="/Addpropertydone" element={<Addpropertydone />} />
        <Route path="/PropertyType" element={<PropertyType />} />
        <Route path="/BrowseRooms" element={<BrowseRooms />} />
        <Route path="/AddSharedProperty" element={<AddSharedProperty />} />
        <Route path="/BrowseProperties" element={<BrowseProperties />} />
        <Route path="/ViewBrowseRooms" element={<ViewBrowseRooms />} />
        <Route path="/property-details/:id" element={<PropertyDetails />} />
        <Route path="/room-details/:propertyId/:id" element={<RoomDetails />} />
        <Route path="/preferences" element={<PreferencesForm />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/booking-room/:id/:roomId" element={<BookingRoom />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/orders" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/host-booking-requests" element={<HostBookingRequests />} />
        <Route path="/view-profile/:id" element={<ViewProfile />} />
        <Route path="/property-reviews/:id" element={<PropertyReviews />} />
        <Route path="/room-reviews/:id" element={<RoomReviews />} />
        <Route path="/add-review/:id" element={<AddReview />} />
        <Route path="/review-success" element={<ReviewSuccess />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/reports" element={<ReportsPage />} />

        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Notfound/>} /> 
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
