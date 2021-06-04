import { BrowserRouter as Router, Route } from 'react-router-dom'

import Homepage from './pages/homepage/Homepage'
import Filtered from './pages/filtered/Filtered'

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Sidedrawer from "./components/sidedrawer/Sidedrawer.jsx";


function App() {
  return (
    <Router>
      <Header />
      <Sidedrawer />
      <Route path='/filtered' component={Filtered} exact />
      <Route path='/' component={Homepage} exact />
      <Footer />
    </Router>
  );
}

export default App;
