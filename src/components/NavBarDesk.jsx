import { Component } from "react";
import './NavBarDesk.css'
import { NavLink } from "react-router-dom";
class NavBarDesk extends Component {

    render() {
        return (
            <div className="Header">

                <NavLink to="/" className="Logo"><img className="Logo" src='/images/Logo.jpg' alt="Logo" /></NavLink>
                <nav className="Nav">
                    <ul className="List">
                        <li key={'tracker'} className="BtnNavBar"><NavLink to="/CryptoT"><img src="/images/Track.png" alt="" /></NavLink></li>
                        <li key={'calcuator'} className="BtnNavBar"><NavLink to="#"><img src="/images/Calc.png" alt="" /></NavLink></li>
                        <li key={'contact'} className="BtnNavBar"><NavLink to="#"><img src="/images/Bag.png" alt="" /></NavLink></li>
                    </ul>
                </nav>

            </div>
        );

    };
};



export default NavBarDesk;