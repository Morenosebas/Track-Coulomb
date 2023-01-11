import { Component } from "react";
import './BodyContent.css'
class BodyContent extends Component {



    render() {

        return (
            <div className="BodyContent">
                <div className="contenedor">
                    <div className="label">Cryptocurrency</div>
                    <input type="text"/>
                </div>
            </div>
        );

    };
};

export default BodyContent;