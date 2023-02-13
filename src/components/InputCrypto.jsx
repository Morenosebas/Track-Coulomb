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
        if (this.state.dataSearchHandle.length > 1) {
            if (this.state.cache[this.state.dataSearchHandle]) {
                this.SetShowResult(true)
                console.log('data cache', this.state.cache)
                // Si el resultado ya está en caché, actualiza el estado del componente
                this.setState({
                    dataSearch: this.state.cache[this.state.dataSearchHandle],
                });
            } else {
                console.log('data update online')
                let nameAux = new RegExp('^' + this.state.dataSearchHandle + '\\w+', 'i');
                let symbolAux = new RegExp('^' + this.state.dataSearchHandle + '$', 'i');
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const dataArray = data.data.reduce((acc, curr) => {
                            const dataName = curr.name;
                            const dataSlug = curr.slug;
                            const dataSymbol = curr.symbol;
                            if ((symbolAux.test(dataName)) || (nameAux.test(dataSlug)) || (symbolAux.test(dataSymbol))) {
                                acc.unshift(dataName);
                            }
                            return acc;
                        }, []);
                        // Almacena el resultado de la búsqueda en caché
                        const cache = {
                            ...this.state.cache,
                            [this.state.dataSearchHandle]: dataArray,
                        };
                        this.setState({
                            dataSearch: dataArray,
                            cache: cache,
                        });
                        console.log('data data', this.state.cache)
                        this.SetShowResult(true)
                    });
            }
        } else {
            this.setState({ dataSearch: []})
            this.SetShowResult(false)
        }
    }


    BuscarData = (e) => {
        let data = document.getElementById('MyForm')
        this.props.Buscar(data.elements.Busquedad.value);
        this.SetShowResult(false);
    }
    KeyDownHandler = (e) => {

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
                e.target.value = this.state.dataSearch[this.state.currentIndex]
                console.log('desde el enter')
            } catch (error) { console.error(error) }
        }
    }
    componentDidMount() {
        console.log('ONLINE')
    }

    render() {
        var div = [];
        if ((this.state.dataSearch))
            for (let i in this.state.dataSearch) {
                div.push(<div key={i} style={{ backgroundColor: this.state.currentIndex == i ? '#ccc' : '#fff' }} className="celdaBuscador">{this.state.dataSearch[i]}</div>)
            }

        return (
            <>
                <form id="MyForm" className="Form">
                    <input autoComplete="off" type="text" onChange={this.HandleBusquedad} name="Busquedad" id="Busquedad" placeholder="Escribe el nombre o la abreviatura: "
                        onFocus={() => this.SetShowResult(true)} onBlur={() => setTimeout(() => this.SetShowResult(false), 100)}
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