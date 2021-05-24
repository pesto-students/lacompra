import { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Banner from './componants/Banner/Banner';
import Header from './componants/Header/Header';
import Cards from './componants/Cards/Cards';
import Footer from './componants/Footer/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
const App = () => {
  useEffect(() => {
    fetch("https://lacompra-beta.herokuapp.com/").then((response) => {
      return response.json();
    }).then((data) => {
      console.log('data: ', data);
    })
  }, [])
  return (
    <div>
      <Router>
     <Header />
     <Banner />
     <Cards title="Featured products"/>
     <Cards title="Most popular"/>
     <Footer/>
     </Router>
    </div>
  );
}

export default App;
