import '../assets/css/app.css';
import React, {Component} from "react";

class CategoriesDb extends Component {
    constructor(){
        super()
        this.state = {
            categories: []
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
        this.apiCall("http://localhost:3077/products/api/categories", this.mostrarData)

    }
    mostrarData = (data) => {
        this.setState(
            {
                categories: data.countByCategory
            }
        )
    }
    render(){
  return (
            <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        
            {
                this.state.categories.map((categorie, i) => {
                    return (
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body" key={i}>
                                   <h5 key={i}>{categorie.nombre} - Cantidad: {categorie.cantidad} </h5>
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

export default CategoriesDb;