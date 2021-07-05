import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Homepage from './pages/homepage/Homepage'
import Filtered from './pages/filtered/Filtered'
import Checkout from './pages/checkout/Checkout'
import Info from './pages/info/Info'
import ProductDetails from './pages/productDetails/ProductDetails'
import ProductUpload from './pages/productUpload/ProductUpload'

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Sidedrawer from "./components/sidedrawer/Sidedrawer.jsx";
import Modal from "./components/modal/Modal";
import FileUpload from "./components/fileUpload/FileUpload";

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Sidedrawer />
      <Modal />
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover />
      <Route path='/info/:status/:id?' component={Info} />
      <Route path='/productdetails/:id' component={ProductDetails} />
      <Route path='/productupload' component={ProductUpload} />
      <Route path='/filtered' component={Filtered} />
      <Route path='/checkout' component={Checkout} />
      <Route path='/' component={Homepage} exact />
      <Footer />
    </Router>
  );
}

export default App;
