import { BrowserRouter as Router, Route } from 'react-router-dom'

import Homepage from './pages/homepage/Homepage'
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Route path='/' component={Homepage} exact />
      <Footer />
    </Router>
  );
}

export default App;
