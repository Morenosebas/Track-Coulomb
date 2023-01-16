import React from "react";
import { Component } from "react";
import './HandlerCrypto.css'

let url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=7a2265da-55d4-4fce-9ee9-9721b6e17845';


class CryptoBody extends Component {
  state = {
    data: null,
    name: '',
    symbol: '',
    price: 0,

  };

  ObtenerData = (e) => {
    // setInterval(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({ data })
          console.log(data.data[0])
        })
    // }, 10000)

  }
  render() {
    if (this.state.data === null) {
      return <p onClick={this.ObtenerData} className="ContenedorData" style={{ color: 'white', fontSize: '40px' }}>Cargando...</p>;
    }
    return (
      <div className="ContenedorData">
        <div className="ContenedorData" >
          <div className="DataCrypto">Simbolo: {this.state.data.data[0].symbol}  </div>
          <div className="DataCrypto">Nombre: {this.state.data.data[0].name}</div>
          <div className="DataCrypto">Precio: {(this.state.data.data[0].quote.USD.price).toFixed(3)}</div>
          <div className="DataCrypto">Rank: {this.state.data.data[0].cmc_rank} </div>
        </div>
      </div>
    );
  }
}

export default CryptoBody;