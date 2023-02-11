import React from "react";
import { Component } from "react";
import InputCrypto from "./InputCrypto";
import { Transition } from "react-transition-group";
import './HandlerCrypto.css'

let url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=7a2265da-55d4-4fce-9ee9-9721b6e17845';


class CryptoBody extends Component {
  state = {
    data: null,
    Buscar: '',
  };

  ObtenerBusquedad = (Buscar) => {
    this.Buscar = Buscar.toUpperCase();
    console.log('Busquedad desde cryptobody', Buscar)
  }

  ObtenerData = (e) => {
    // setInterval(() => {
    e.preventDefault();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ data })
        console.log(data)
      })
    // }, 10000)
  }
  render() {
    const container = [];
    let Nameaux = new RegExp('^' + this.Buscar + '$', 'i');
    if (this.state.data === null) {
      return <><InputCrypto Buscar={this.ObtenerBusquedad} myOnClick={this.ObtenerData} />
      </>
    }
    else {
      for (let i in this.state.data.data) {

        if (this.state.data.data[i].symbol == this.Buscar || Nameaux.test(this.state.data.data[i].name)) {
          console.log(this.state.data.data[i])
          container.push(<div key={this.state.data.data[i].id} className="ContenedorData" >
            <div className="DataCrypto">Simbolo: {this.state.data.data[i].symbol} </div>
            <div className="DataCrypto">Nombre: {this.state.data.data[i].name}</div>
            <div className="DataCrypto">Precio: {(this.state.data.data[i].quote.USD.price).toFixed(3)}</div>
            <div className="DataCrypto">Rank: {this.state.data.data[i].cmc_rank} </div>
          </div>)
        }
      }
    }
    return (
      <><InputCrypto Buscar={this.ObtenerBusquedad} myOnClick={this.ObtenerData} />
        <div className="ContenedorData">
          {container}
        </div>
      </>
    );
  }
}

export default CryptoBody;