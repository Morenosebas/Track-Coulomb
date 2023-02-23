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
    loading: false,
  };

  ObtenerBusquedad = (Buscar) => {

    this.setState({ buscar: Buscar.toUpperCase(), loading: true })
    console.log('Busquedad desde cryptobody', this.state.buscar)
    this.ObtenerData()
  }
  componentDidMount() {
    console.log('Cryptobody montado')

  }
  componentDidUpdate(prevProp, prepState) {
    if (this.state.buscar !== '') {
      console.log("update", this.state.buscar)
      console.log("update", this.state.data)
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("next state:", nextState.buscar, " this.state :", this.state.buscar)
  //   return nextState.buscar !== this.state.buscar && this.state.buscar !== 0;
  // }


  //error aca en la funcion Obtener Data
  ObtenerData = (e) => {
    // this.setState({ data: null })
    console.log("ObtenerData....")
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("ObtenerDataThen....")
        this.setState({ data, loading: false })
      })
      .catch(error => {
        console.error('Error al obtener la data:', error);
      });
  }


  render() {
    const { data, buscar, loading } = this.state;

    if (!data) {
      return <><InputCrypto Buscar={this.ObtenerBusquedad} myOnClick={this.ObtenerData} />
        {loading && <div className="divBeforeData">
          <div className="spinner-border  text-success  bg-transparent" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}

      </>;
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


