import React, {Component} from "react"
import '../assets/css/app.css';

class LastProductDb extends Component {
  constructor(){
    super();
    this.state = {
        products: []
    }
}

componentDidMount(){
    this.mostrarData()
}

mostrarData =  async () => {
    console.log('Function mostrarData()')
    await
    fetch(`http://localhost:3077/products/api`)
   
     .then(response => response.json())
     .then(data => { 
        console.log('data', data.products[data.products.length-1])
        this.setState
        ({
         products: data.products[data.products.length-1]})
     })
    
    .catch(error => console.log(error))
}

render(){

  return (
    <div className="col-lg-6 mb-4">
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Last product in Data Base</h6>
        </div>
        <div className="card-body">
            <div className="text-center">      
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style= {{width: 25 + "rem"}} src={`http://localhost:3077/img/products/${this.state.products.imagen}`} alt="ultimoProducto"/>
            <h2>{this.state.products.nombre}</h2>
            <h3>{this.state.products.precio_lista}</h3>
            <p>{this.state.products.descripcion}</p>
            </div>
        </div>
    </div>
  </div>
  );
}
}

export default LastProductDb