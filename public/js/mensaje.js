function mensaje(){
    return Swal.fire('Para ingresar a tu carrito debes iniciar sesión o registrarte')                 
}
function verificar(){
event.preventDefault(); 
if(!locals.isLogged){
event.currentTarget.submit();
}}
function someFunc() {
      mensaje();
      verificar();
}