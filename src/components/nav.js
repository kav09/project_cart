import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

const Navbar = () => {
  return (
    <div>
      {/*kindly use this structure 
       <nav className="home-nav">
         <ul className="home-ul">
           <li className="home-li">
           </li> 
         </ul>
       </nav>*/
       <nav className="home-nav">
        <ul className="home-ul">
        <li className="home-li">
            <Link  className="home-link" to="/">Home</Link> 
        </li>
        
        <li className="home-li">
            <Link className="home-link" to="/cart">Cart</Link> 
        </li>
        
        <li className="home-li">
            <Link className="home-link" to="/myorder">My Order</Link> 
        </li>
        </ul>
   </nav>
       }
    </div>
  );
};
export default Navbar;
