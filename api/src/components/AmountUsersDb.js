import '../assets/css/app.css';
import React, {Component} from "react"

class AmountUsersDb extends Component {
    constructor(){
        super()
        this.state = {
            users: []
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
        this.apiCall("http://localhost:3077/users/api", this.mostrarData)
    }

    mostrarData = (data) => {
        this.setState(
            {
                users: data.total
            }
        )
    }

    render(){ 
    return (
        <div className="col-md-4 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Users quantity
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                           
                           {
                                <h5>{this.state.users.totalUsers}</h5>
                                   
                            }
                           
                                    
                        </div>
                    </div>
                    <div className="col-auto">
                        <i className="fas fa-user-check fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
    }
}

export default AmountUsersDb;