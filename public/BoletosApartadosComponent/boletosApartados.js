class BoletosApartados extends HTMLElement {
    #urlGateway = "http://127.0.0.1:3001/servicioNumPagos/";
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
                    tabla.innerHTML += `<tr>
        <td>Boleto `+boleto.numero+`</td>
        <td>
        <input type="checkbox" name="" id="`+boleto.id+`" value="`+boleto.numero+`">
        </td>
    </tr>`;
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
}
window.customElements.define('boletos-apartados', BoletosApartados);
