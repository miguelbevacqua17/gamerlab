const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito-vista');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('name');
const correo = document.getElementById('email');
const productosPagar = document.querySelector("#productosPagar");


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    document.addEventListener('DOMContentLoaded', compra.productoCompra())

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}

function procesarCompra() {
   //e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "/";
        })
    }

    else {

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = '/img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            emailjs.sendForm(service_id, template_id, myform[0])
                .then(() => {
                    cargandoGif.style.display = 'none';
                    document.querySelector('#loaders').appendChild(enviado);

                    setTimeout(() => {
                        compra.vaciarLocalStorage();
                        enviado.remove();
                        window.location = "index.ejs";
                    }, 2000);


                }, (err) => {
                    alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                    // myform.find("button").text("Send");
                });

            return false;
        //});
    }
}