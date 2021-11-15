class PagoBoletos extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#render(shadow);
        this.#cargaNumeros(shadow);
        this.#agregaEstilo(shadow);
        this.#habilitaElementosPago(shadow);
    }
    #render(shadow) {
        shadow.innerHTML += `
        <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
    <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <h3 class="text-black text-capitalize ps-3">Paga tus Boletos</h6>
        </div>
        <div>
            <h5>Tus números a pagar:</h5>
            <div id="numerosPago">
            </div>
            
            <div class="checkboxes">
                <input type="checkbox" name="cbxBoletosCorrectos" id="cbxBoletosCorrectos" value="">
                <label for="cbxBoletosCorrectos">He verificado que estos boletos son los que pagaré.</label>
            </div>

            <form>


                <!-- Identify your business so that you can collect the payments. -->

                <input type="hidden" name="business" value="">


                <!-- Specify a Donate button. -->

                <input type="hidden" name="cmd" value="_donations">


                <!-- Specify details about the contribution -->

                <input type="hidden" name="item_name" value="boletos">

                <input type="hidden" name="item_number" value="boletos">

                <input type="hidden" name="currency_code" value="MXN">


                <!-- Display the payment button. -->

                <input id="btnPagar" type="image" name="submit"
                    src="https://www.paypalobjects.com/marketing/web/mx/logos-buttons/Paga-con_227x44.png" alt="Pagar">

                <img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif">


            </form>
            <img width="200px" height="50px"
                src="https://www.paypalobjects.com/marketing/web/mx/logos-buttons/tarjetas_BTN.png"
                alt="Paga con PayPal" />
        </div>
    </div>
</div>
		`;
    }
    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./PagoBoletosComponent/css/pagoBoletos.css");
        shadow.appendChild(link);
    }

    #cargaNumeros(shadow){
        let numerosPago = shadow.querySelector("#numerosPago");
        let pagando = JSON.parse(sessionStorage.getItem('pagando'));

        pagando.forEach(boleto => {
            numerosPago.innerHTML+=`<div class="boleto-cuadro">`+boleto.numero+`</div>`;
        });
    }

    #habilitaElementosPago(shadow){
        let btnPagar=shadow.querySelector("#btnPagar");
        let cbxBoletosCorrectos=shadow.querySelector("input[name='cbxBoletosCorrectos']");

        btnPagar.onclick=(event)=>{
            event.preventDefault();
            if(cbxBoletosCorrectos.checked){
                alert('aquí se envía al método de pago.');
            }else{
                alert('Verifica que tus boletos son correctos.');
            }
        }
    }
}
window.customElements.define('pago-boletos', PagoBoletos);