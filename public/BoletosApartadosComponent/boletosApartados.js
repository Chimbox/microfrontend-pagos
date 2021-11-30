class BoletosApartados extends HTMLElement {
    #urlGateway = "http://localhost:3002/res/";
    #urlBoletos = this.#urlGateway + "boletos";

    constructor() {
        super();
    }
    connectedCallback() {
        const idCliente = this.getAttribute("idCliente");
        const shadow = this.attachShadow({ mode: "open" });
        this.#render(shadow);
        this.#agregaEstilo(shadow);
        this.#cargaBoletosApartados(shadow, idCliente);
    }
    #render(shadow) {
        shadow.innerHTML += `
        <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">BOLETOS APARTADOS</h6>
                </div>
            </div>
            <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Boleto</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Seleccionar
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tablaBoletosApartados">
                            
                        </tbody>
                    </table>
                </div>
                <input id="btnPagar" class="btn bg-gradient-primary mb-0" type="submit" value="Pagar">
                <input id="btnCargarComprobante" class="btn bg-gradient-primary mb-0" type="submit" value="Cargar Comprobante">
            </div>
        </div>
    </div>
		`;
    }
    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./BoletosApartadosComponent/css/boletosApartados.css");
        shadow.appendChild(link);
    }

    #cargaBoletosApartados(shadow, idCliente) {
        let tabla = shadow.querySelector("#tablaBoletosApartados");

        fetch(this.#urlBoletos + "?idCliente=" + idCliente/*, {
            'mode': 'no-cors'
        }*/).then((response) => {
            return response.json();
        })
            .then((boletos) => {
                boletos.forEach(boleto => {

                    if(boleto.comprobantePago != ""){
                        tabla.innerHTML += `<tr> 
                            <td>Boleto `+boleto.numero+`</td>
                            <td>
                                <input type="checkbox" id="`+boleto._id+`" disabled value="`+boleto.numero+`">    
                            </td>
                            <td>
                                <button id="`+boleto._id+`" class="btnEliminar" value="`+boleto.numero+`">Eliminar Comprobante</button>
                            </td>
                        </tr>`;
                    }else{
                        tabla.innerHTML += `<tr> 
                            <td>Boleto `+boleto.numero+`</td>
                            <td>
                                <input type="checkbox" id="`+boleto._id+`" value="`+boleto.numero+`">    
                            </td>
                            <td>
                                <button id="`+boleto._id+`" disabled lass="btnEliminar">Eliminar Comprobante</button>
                            </td>
                        </tr>`;
                    }
                    this.#eliminarComprobante(shadow)
                });

               
            });

        shadow.querySelector("#btnPagar").onclick = () => {
            let pagando = this.#getBoletosSeleccionados(shadow);

            if (pagando.length > 0) {
                sessionStorage.setItem('pagando', JSON.stringify(pagando));
                window.location = "./pagos.html";
            } else {
                alert('Primero debe seleccionar al menos 1 boleto a pagar.');
            }
        }

        shadow.querySelector("#btnCargarComprobante").onclick = () => {
            let pagando = this.#getBoletosSeleccionados(shadow);

            if (pagando.length > 0) {
                sessionStorage.setItem('comprobantes', JSON.stringify(pagando));
                window.location = "./upload.html";
            } else {
                alert('Primero debe seleccionar al menos 1 boleto a pagar.');
            }
        }
    }

    #getBoletosSeleccionados(shadow){
        let pagando = new Array();
            shadow.querySelectorAll("input[type=checkbox]:checked").forEach(element => {
                let boleto=new Object();
                boleto.id=element.id;
                boleto.numero=element.value;
                pagando.push(boleto);
            });
        return pagando;
    }

    #eliminarComprobante(shadow){
        let botones = shadow.querySelectorAll(".btnEliminar")
        console.log(botones)
        botones.forEach((boton) =>{
            boton.onclick = () =>{
                let boletos = new Array();
                let boleto=new Object();
                boleto.id=boton.id;
                boleto.numero=boton.value;
                boletos.push(boleto)

                var opcion = confirm("¿Esta seguro que desea eliminar este comprobante?");
                if (opcion == true) {
                    const formData = new FormData();
                    formData.append('boleto', JSON.stringify(boletos));
                    formData.append('file', "");

                    fetch('http://localhost:3001/servicioNumPagos/boletos/comprobantesEliminar',{
                    method: 'PUT',
                    body: formData
                    })
                    .then(res => {
                    window.location = "./index.html";
                    })
                    .catch(err => {
                    console.log(err.message);

                    });

                    return
                } 
            }
        })

    }
}
window.customElements.define('boletos-apartados', BoletosApartados);
