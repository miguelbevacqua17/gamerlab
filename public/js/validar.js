function validar(){
    const form = document.getElementById("form")
    var name,description, price,stock, discount,category, expresion;
    name = document.getElementById("name").value;
    description = document.getElementById("description").value;
    price = document.getElementById("price").value;
    stock = document.getElementById("stock").value;
    discount = document.getElementById("discount").value;
    category = document.getElementById("category").value;
    
    if(name === "" || description === "" || price === "" || stock === "" || discount === "" || category === "" ){
        Swal.fire("Todos los campos son obligatorios");
        return false;
    }
    else if(name.length>35){
        alert("El nombre es muy largo");
        return false;
    }
    else if(description.length>50000){
        alert("La descripcion es muy larga");
        return false;
    }

  //  image = document.getElementById('image');
   //if (!image.files) { 
     //  console.error("This browser doesn't seem to support the `files` property of file inputs.");
   // } else {
     // var file = input.files[0];
       // console.log("File " + file.name + " is " + file.size + " bytes in size");
   // }
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    })

  }