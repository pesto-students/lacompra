import React from 'react'
import basic from '../../resources/david-lezcano-NfZiOJzZgcg-unsplash.jpg';
import  './Card.css';

function Card() {
    return (
        <>
 <div className="_card" >
     <div className="_image">
  <img src= {basic} alt="..."/>
      </div>
  <div className="_card-body">
    <h5 className="_card-title">Woman Tops</h5>
    <p className="_card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    {/* have a Link Tag later */}
    <a href="#" className="btn btn-primary">Go somewhere</a>  
  </div>
</div>
        </>
    )
}

export default Card
