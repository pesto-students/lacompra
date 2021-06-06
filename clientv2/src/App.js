import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Homepage from './pages/homepage/Homepage'
import Filtered from './pages/filtered/Filtered'

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Sidedrawer from "./components/sidedrawer/Sidedrawer.jsx";
import Modal from "./components/modal/Modal";

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Sidedrawer />
      <Modal />
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Route path='/filtered' component={Filtered} exact />
      <Route path='/' component={Homepage} exact />
      <Footer />
    </Router>
  );
}

export default App;
