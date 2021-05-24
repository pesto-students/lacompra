import {Link} from 'react-router-dom';
import {FaTwitter,FaInstagram,FaFacebookF,FaGooglePlusG} from 'react-icons/fa';
import './Footer.css'

function Footer() {
    return (
        <>
        <div className="_footer_container">
        <footer>
                <div className="footer-content">
            <h3>La Compra</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo iste corrupti doloribus odio sed!</p>
            <ul className="socials">
                {/* <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li> */}
                <Link to='/' className="_facebook"><FaFacebookF/></Link>
                <Link to='/' className="_twitter"><FaTwitter/></Link>
                <Link to='/' className="_instagram"><FaInstagram/></Link>
                <Link to='/' className="_google-plus"><FaGooglePlusG/></Link>
            </ul>
        </div>
        <div class="footer-bottom">
            <p>copyright &copy;2020 codeOpacity. designed by <span>nethunt</span></p>
        </div>
    </footer>
        </div>
            
        </>
    )
}

export default Footer
