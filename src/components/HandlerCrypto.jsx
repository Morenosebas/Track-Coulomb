import React from "react";
import { Component } from "react";
import InputCrypto from "./InputCrypto";
import { Transition } from "react-transition-group";
import './HandlerCrypto.css'
import url from "../controller/url";



class CryptoBody extends Component {
  state = {
    data: null,
    buscar: '',
  };

  ObtenerBusquedad = (Buscar) => {
    this.setState({ buscar: Buscar.toUpperCase() })
    console.log('Busquedad desde cryptobody', Buscar)
  }
  componentDidMount() {
    console.log('Cryptobody montado')
  }
  componentDidUpdate(prevProp, prepState) {
    if (prepState.buscar !== this.state.buscar) {
      this.ObtenerData()
    }
  }

  //error aca en la funcion Obtener Data
  ObtenerData = () => {
    // setInterval(() => {
    //excepcion de codigo
    // e.preventDefault();
    // try {
    //   if (e.preventDefault()) {
    //     e.preventDefault();
    //   }
    //   else {
    //     throw new Error("Error con el preventDefault");
    //   }
    // } catch (error) {
    // }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ data })
      })
      .catch(error => {
        console.error('Error al obtener la data:', error);
      });
    // }, 10000)
  }


  render() {
    const { data, buscar } = this.state;

    if (!data) {
      return <InputCrypto Buscar={this.ObtenerBusquedad} myOnClick={this.ObtenerData} />;
    }

    const Nameaux = buscar ? new RegExp(`^${buscar}$`, 'i') : null;

    const container = data.data
      .filter((item) => item.symbol === buscar || (Nameaux && Nameaux.test(item.name)))
      .map((item) => (
        <div key={item.id} className="ContenedorData">
          <div className="DataCrypto">Simbolo: {item.symbol}</div>
          <div className="DataCrypto">Nombre: {item.name}</div>
          <div className="DataCrypto">Precio: {item.quote.USD.price.toFixed(3)}</div>
          <div className="DataCrypto">Rank: {item.cmc_rank}</div>
        </div>
      ));

    return (
      <>
        <InputCrypto Buscar={this.ObtenerBusquedad} myOnClick={this.ObtenerData} />
        <div className="ContenedorData">{container}</div>
      </>
    );
  }

}

export default CryptoBody;


