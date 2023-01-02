import '../assets/css/app.css';
import React, {Component} from "react";

class ProductsTotal extends Component {
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
                products: data.products
            }
        )
    }
    render(){
  return (
            <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Products in Data Base</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        
            {
                this.state.products.map((product, i) => {
                    return (
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body" key={i}>
                                   <h5 key={i}>{product.nombre} - Stock: {product.stock} - Precio: {product.precio_lista} </h5>
                                </div>
                            </div>
                        </div>
                    )
                })
            }   
                    </div>
                </div>
            </div>
        </div>
  );
}
}

export default ProductsTotal;