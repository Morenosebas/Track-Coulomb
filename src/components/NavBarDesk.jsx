import { Component } from "react";
import './NavBarDesk.css'
class NavBarDesk extends Component {




    render() {
        return (
            <div className="Header">
                <img className="Logo" src='/images/Logo.jpg' alt="Logo" />

                <nav className="Nav">
                    <ul className="List">
                        <li key={'tracker'} className="BtnNavBar"><a href="#"><img src="/images/Track.png" alt="" /></a></li>
                        <li key={'calcuator'} className="BtnNavBar"><a href="#"><img src="/images/Calc.png" alt="" /></a></li>
                        <li key={'contact'} className="BtnNavBar"><a href="#"><img src="/images/Bag.png" alt="" /></a></li>
                    </ul>
                </nav>

            </div>
        );

    };
};



export default NavBarDesk;