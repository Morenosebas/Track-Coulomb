import { Component } from "react";
import './InputCrypto.css'
import url from "../controller/url";

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
        const dataSearchHandle = e.target.value
        // this.setState({ dataSearchHandle: dataSearchHandle })

        console.log(dataSearchHandle, 'this is datasearchhandle')
        if (dataSearchHandle.length > 2) {
            this.SetShowResult(true)
            if (this.state.cache[dataSearchHandle]) {
                this.setState({
                    dataSearch: this.state.cache[dataSearchHandle],
                });
            } else {
                console.log('data update online')
                let nameAux = new RegExp(`${dataSearchHandle}\\s*`, 'i');
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
                        const cache = {
                            ...this.state.cache,
                            [dataSearchHandle]: dataArray.reverse(),
                        };
                        this.setState({
                            dataSearch: dataArray,
                            cache: cache,
                        });
                    });
            }
        } else {
            this.setState({ dataSearch: [], currentIndex: -1 })
            this.SetShowResult(false)
        }

    }


    BuscarData = () => {
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

        } else if (e.key === 'ArrowUp') {
            try {
                if (this.state.currentIndex > -1 && this.state.currentIndex <= (this.state.dataSearch).length - 1) {
                    this.setState({ currentIndex: this.state.currentIndex - 1 })
                }
            } catch (error) { console.error(error) }

        } else if (e.key === 'Enter') {
            try {
                e.preventDefault()
                if (this.state.currentIndex !== -1) {
                    e.target.value = this.state.dataSearch[this.state.currentIndex]
                    this.setState({ dataSearch: undefined, currentIndex: -1 })
                    this.BuscarData()
                } else {
                    this.BuscarData()
                }
            } catch (error) { console.error(error) }
        }
    }
    componentDidMount() {
        console.log('ONLINE')
        this.setState({ showResult: false })
    }

    DataHandlerUp = (e) => {
        // let data = document.getElementById('MyForm')
        let inputChange = document.getElementById('Busquedad')
        // data.elements.Busquedad.value = e.target.innerHTML
        const textContent = e.target.innerHTML;
        inputChange.value = textContent.trimStart();
        this.SetShowResult(false)
        // await this.BuscarData();
        this.props.Buscar(inputChange.value);
        // this.SetShowResult(false);
        // if (this.state.currentIndex !== -1) {
        //     this.setState({ dataSearch: undefined })
        // }
        // this.setState({ dataSearch: this.state.cache[inputChange.value] })
        // this.BuscarData();
        // console.log(dataOption)
    }

    render() {
        let div = [];
        if ((this.state.dataSearch))
            for (let i in this.state.dataSearch) {
                div.push(<div key={`data-${i}`} onClick={this.DataHandlerUp}
                    style={{ borderRadius: i == this.state.dataSearch.length - 1 ? '0 0 5px 5px' : '0' }}
                    className={this.state.currentIndex == i ? "celdaBuscadorActive" : "celdaBuscador"}
                    onMouseEnter={() => { this.setState({ currentIndex: i }) }}
                    onMouseLeave={() => { this.setState({ currentIndex: -1 }) }}
                > {this.state.dataSearch[i]}</div >)
            }

        return (
            <>
                <div className="label"><b style={{ backgroundColor: "transparent" }}>Cryptocurrency</b></div>
                <form onSubmit={this.BuscarData} id="MyForm" className="Form">
                    <input  autoComplete="off" type="text" onChange={this.HandleBusquedad} name="Busquedad" id="Busquedad" placeholder="Escribe el nombre o la abreviatura: "
                        onFocus={() => this.SetShowResult(true)}
                        onBlur={() => setTimeout(() => this.SetShowResult(false), 150)}
                        onKeyDown={(e) => this.KeyDownHandler(e)}
                    />
                    <button onClickCapture={this.props.myOnClick} onClick={this.BuscarData} type="button" id={'Buscar'} >Buscar</button>
                    {this.state.showResult &&
                        div
                    }
                </form >
            </>
        );
    };

}



export default InputCrypto;