import '../assets/css/app.css';
import React, {Component} from "react"

class AmountProductsDb extends Component {
    constructor(){
        super()
        this.state = {
            products: []
        }
    }

    apiCall(url, consecuencia){
        fetch(url)
        .then(response => response.json())
        .then(data => consecuencia(data))
        .catch(error => console.log(error))
    }

    componentDidMount(){
        console.log("me monte")
        this.traerApi()
    }
    
    traerApi(){
        this.apiCall("http://localhost:3077/products/api", this.mostrarData)
    }

    mostrarData = (data) => {
        this.setState(
            {
                products: data.countProd
            }
        )
    }

  render(){
      return (
            <div className="col-md-4 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1"> Products in Data Base</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {
                                <h5>{this.state.products}</h5>      
                            }
            </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  );
  }
}

export default AmountProductsDb;