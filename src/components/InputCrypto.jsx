import { Component } from "react";
import './InputCrypto.css'
const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=7a2265da-55d4-4fce-9ee9-9721b6e17845';



class InputCrypto extends Component {

    state = {
        dataSearch: undefined,
        cache: {},
        showResult: true,
        currentIndex: -1,
        dataSearchHandle: '',
    };

    SetShowResult = (value) => {
        this.setState({ showResult: value, currentIndex: -1 });
    }

    HandleBusquedad = (e) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.setState({ dataSearchHandle: e.target.value })
        const dataSearchHandle = this.state.dataSearchHandle;
        setTimeout(() => {
            if (dataSearchHandle.length > 2) {
                this.SetShowResult(true)
                if (this.state.cache[dataSearchHandle]) {
                    console.log('data cache', this.state.cache)
                    // Si el resultado ya está en caché, actualiza el estado del componente
                    this.setState({
                        dataSearch: this.state.cache[dataSearchHandle],
                    });
                } else {
                    console.log('data update online')
                    let nameAux = new RegExp(dataSearchHandle, 'i');
                    // let symbolAux = new RegExp('^' + dataSearchHandle + '\\D','i');
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            const dataArray = data.data.reduce((acc, curr) => {
                                const dataName = curr.name;
                                const dataSlug = curr.slug;
                                const dataSymbol = curr.symbol;
                                if ((nameAux.test(dataName)) || (nameAux.test(dataSlug)) || (nameAux.test(dataSymbol))) {
                                    acc.unshift(dataName);
                                }
                                return acc;
                            }, []);
                            // Almacena el resultado de la búsqueda en caché
                            const cache = {
                                ...this.state.cache,
                                [dataSearchHandle]: dataArray,
                            };
                            this.setState({
                                dataSearch: dataArray,
                                cache: cache,
                            });
                            console.log('data data', this.state.dataSearch)
                            this.SetShowResult(true)
                        });
                }
            } else {
                this.setState({ dataSearch: [] })
                this.SetShowResult(false)
            }
        }, 500)

    }


    BuscarData = (e) => {
        let data = document.getElementById('MyForm')
        this.props.Buscar(data.elements.Busquedad.value);
        this.SetShowResult(false);
    }
    KeyDownHandler = (e) => {
        console.log(e.key)
        if (e.key === 'ArrowDown') {

            try {
                if (this.state.currentIndex >= -1 && this.state.currentIndex < (this.state.dataSearch).length - 1) {
                    this.setState({ currentIndex: this.state.currentIndex + 1 })
                }
            } catch (error) { console.error(error) }

            console.log(e.key)
            console.log(this.state.currentIndex)
        } else if (e.key === 'ArrowUp') {
            try {
                if (this.state.currentIndex > -1 && this.state.currentIndex <= (this.state.dataSearch).length - 1) {
                    this.setState({ currentIndex: this.state.currentIndex - 1 })
                }
            } catch (error) { console.error(error) }

        } else if (e.key === 'Enter') {
            try {
                if (this.state.currentIndex != -1) {
                    e.target.value = this.state.dataSearch[this.state.currentIndex]
                }
                console.log('desde el enter')
            } catch (error) { console.error(error) }
        }
    }
    componentDidMount() {
        console.log('ONLINE')
        this.setState({ showResult: false })
    }

    DataHandlerUp = (e) => { 
        let inputChange = document.getElementById('Busquedad')
        inputChange.value = 'hola'
        // dataChange.te
        let dataChange = document.querySelectorAll('#data')
        
        console.log(dataChange)
    }

    render() {
        var div = [];
        if ((this.state.dataSearch))
            for (let i in this.state.dataSearch) {
                div.push(<div id={`data`} key={i} onClick={this.DataHandlerUp} style={{ backgroundColor: this.state.currentIndex == i ? '#ccc' : '#fff' }} className="celdaBuscador">{this.state.dataSearch[i]}</div>)
            }

        return (
            <>
                <form id="MyForm" className="Form">
                    <input autoComplete="off" type="text" onChange={this.HandleBusquedad} name="Busquedad" id="Busquedad" placeholder="Escribe el nombre o la abreviatura: "
                        onFocus={() => this.SetShowResult(true)} onBlur={() => setTimeout(() => this.SetShowResult(false), 200)}
                        onKeyDown={(e) => this.KeyDownHandler(e)}
                    />
                    <button onClickCapture={this.props.myOnClick} onClick={this.BuscarData} type="submit" id={'Buscar'} >Buscar</button>
                    {this.state.showResult &&
                        div
                    }
                </form >
            </>
        );
    };

}



export default InputCrypto;