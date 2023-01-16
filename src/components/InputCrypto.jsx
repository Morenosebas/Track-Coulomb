import { Component } from "react";
import './InputCrypto.css'


class InputCrypto extends Component {

    render() {
        return (
            <form className="Form">
                <input type="text" placeholder="Escribe el nombre o la abreviatura: " />
                <button type="button" id={'Buscar'}>Buscar</button>
            </form>
        );
    };

}



export default InputCrypto;