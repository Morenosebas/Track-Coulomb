import { Component } from "react";
import InputCrypto from "./InputCrypto";
import CryptoBody from './HandlerCrypto'
import './BodyContent.css'



class BodyContent extends Component {



    render() {

        return (
            <div className="BodyContent">
                <div className="contenedor">
                    <CryptoBody/>
                </div>
            </div>
        );

    };
};

export default BodyContent;
