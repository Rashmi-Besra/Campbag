
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import About from './pages/About'
import Product from './pages/Product'
import Note from './pages/Note'
import NotesCollection from './pages/NotesCollection'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Placeorder from './pages/Placeorder'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import Completeprofile from './pages/Completeprofile'
import EditProfile from './pages/Editprofile'
import Profile from './pages/Profile'
import Signup from './pages/SignUp'
import VerifyOTP from './pages/VerifyOTP'
import Wishlist from "./pages/Wishlist";
import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import AddProduct from './pages/AddProduct'
import SellerOrders from "./pages/SellerOrders";
import EditProduct from "./pages/EditProduct";
import SellerProfile from './pages/SellerProfile';
import PersonalInformation from "./pages/PersonalInformation";
import AccountSettings from "./pages/AccountSettings";
import DeleteAccount from "./pages/DeleteAccount";
import SellerOrderDetails from "./pages/SellerOrderDetails";
import OrderDetails from "./pages/OrderDetails";




import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[3vw] '>
      <ToastContainer/>
      <Navbar />
      <Searchbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection/:category/:subCategory' element={<Collection/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
      <Route path="/notes" element={<NotesCollection />} />
      <Route path="/notes/:noteId" element={<Note />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path='/place-order' element={<Placeorder/>}/>
        <Route path='/orders' element={<Orders/>}/>
       
        <Route path='/Profile' element={<Profile/>}/>
         <Route path='/edit-profile' element={<EditProfile/>}/>
         <Route
  path="/personal-info"
  element={<PersonalInformation />}
/>
         <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/seller" element={<SellerDashboard />} />

<Route path="/seller/products" element={<SellerProducts />} />

<Route path="/seller/add-product" element={<AddProduct />} />

<Route path="/seller/orders" element={<SellerOrders />} />
<Route
    path="/seller/edit-product/:id"
    element={<EditProduct />}
/>
<Route
    path="/seller/:sellerId"
    element={<SellerProfile />}
/>
<Route
    path="/complete-profile"
    element={<Completeprofile />}
/>
<Route
    path="/account-settings"
    element={<AccountSettings />}
/>
<Route
  path="/delete-account"
  element={<DeleteAccount />}
/>

<Route
    path="/seller/orders/:id"
    element={<SellerOrderDetails />}
/>
<Route
    path="/orders/:id"
    element={<OrderDetails />}
/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
