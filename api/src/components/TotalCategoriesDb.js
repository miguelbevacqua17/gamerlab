import React, {Component} from "react"
import '../assets/css/app.css';


class TotalCategoriesDb extends Component {
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
                    categories: data.count
                }
            )
        }

        render(){
        return (
            <div className="col-md-4 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1"> Categories in Data Base</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800"> {<h5>{this.state.categories}</h5>}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
        }
        }

export default TotalCategoriesDb;