import { Component } from "react";
import './InputCrypto.css'


class InputCrypto extends Component {

    constructor(props) {
        super(props);
        this.state = { busquedad: '' }
    }
    BuscarData = (e) => {
        let data = document.getElementById('MyForm')
        this.busquedad = data.elements.Busquedad.value;
        console.log('busquedad: ', this.busquedad);
        this.props.Buscar(this.busquedad);

    }
    HandleBusquedad = () => {
        //pasando datos al padre
    }
    componentDidMount() {
        console.log('ONLINE')
    }


    render() {
        return (
            <form id="MyForm" className="Form">
                <input type="text" name="Busquedad" id="Busquedad" placeholder="Escribe el nombre o la abreviatura: " />
                <button onClickCapture={this.props.myOnClick} onClick={this.BuscarData} type="submit" id={'Buscar'} >Buscar</button>
            </form >
        );
    };

}



export default InputCrypto;