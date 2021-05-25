import banner from '../../resources/david-van-dijk-3LTht2nxd34-unsplash.jpg'
import sideImage from '../../resources/pexels-godisable-jacob-963696.jpg'
import './Banner.css'

function Banner() {
    return (
  <>
   <div className="_banner_container ">
     <div className="_banner_heading">
      <h1>Fashion as unique<br/> as you are...</h1> 
     </div>
     <br/>
     <div className="_landing_banner ">
   {/* <img src={banner} alt="Banner" /> */}
    </div>
    <div className="_side_image">
         <div className="_image _front">
          <img src= {sideImage} alt="..."/>
          <div/>
      </div>
    </div>

   </div>
  </>
    )
}

export default Banner
