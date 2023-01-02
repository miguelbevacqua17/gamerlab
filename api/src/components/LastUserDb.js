import React, {Component} from "react"
import '../assets/css/app.css';

class LastUserDb extends Component {
  constructor(){
    super();
    this.state = {
        users: []
    }
}

componentDidMount(){
    this.mostrarData()
}

mostrarData =  async () => {
    await fetch(`http://localhost:3077/users/api`)
     .then(response => response.json())
     .then(data => { 
        console.log('data', data.data[data.data.length-1])
        this.setState
        ({
         users: data.data[data.data.length-1]})
     })
    
    .catch(error => console.log(error))
}

render(){

  return (
    <div className="col-lg-6 mb-4">
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Last user in Data Base</h6>
        </div>
        <div className="card-body">
            <div className="text-center">      
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style= {{width: 25 + "rem"}} src={`http://localhost:3077/img/avatars/${this.state.users.imagen}`} alt="ultimoUsuario"/>
            <h2>{this.state.users.nombre}</h2>
            <p>{this.state.users.email}</p>
            </div>
        </div>
    </div>
  </div>
  );
}
}

export default LastUserDb