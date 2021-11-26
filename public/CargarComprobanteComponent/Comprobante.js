class Comprobante extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const comprobante = this.getAttribute("comprobante");
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
    this.#mostrarSeleccionados(shadow);
    this.#enviarComprobantes(shadow);
    this.#agregarEstilo(shadow);
  }

  #render(shadow) {
    shadow.innerHTML += `
        <div class="container-fluid py-4 row mb-4 col-lg-4 col-md-6 card h-100" card-header pb-0">
            <a id="card-body">
            <h4>Subir comprobante para boleto(s):</h4>  
            </a>  
        </div>
                
        <div class="container-fluid py-4">
        <form action="./index.html" method="post" enctype="multipart/form-data" target="_blank">
        <input id="comprobantes-archivos" class="btn bg-gradient-primary mb-0" type="file" name="archivossubidos[]" multiple="multiple"
            accept=".png, .jpeg, .jpg, .pdf"> 
        </input>
                <!-- Cambiar la referencia al subir el archivo -->
                <a id="btnEnviarComprobante" class="btn bg-gradient-primary mb-0" >&nbsp;&nbsp;Enviar datos</a>
                <a class="btnCancelar btn bg-gradient-dark mb-0" href="./index.html">&nbsp;&nbsp;Cancelar</a>
            </form>
        </div>  
        `;
  }

  #agregarEstilo(shadow) {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./CargarComprobanteComponent/css/cargarComprobante.css");
    shadow.appendChild(link);
  }

  #mostrarSeleccionados(shadow) {
    let div = shadow.querySelector("#card-body");
    let comprobantes = JSON.parse(sessionStorage.getItem("comprobantes"));

    comprobantes.forEach((boleto) => {
      div.innerHTML +=
        `<li id="numero" class="container-fluid py-4 row mb-1 col-lg-4 col-md-6 card h-100" card-header pb-0">` +
        boleto.numero +
        `</li>`;
    });
  }

  #enviarComprobantes(shadow) {
    let comprobantes = Array();
    let input = shadow.querySelector("input");
    let cantidadArchivos = 0;
    const boton = shadow.querySelector("#btnEnviarComprobante");

    boton.onclick = () => {
      if (cantidadArchivos == 0) {
        alert("Seleccione el comprobante que desea subir");
      } else {
        var fileInput = shadow.querySelector('#comprobantes-archivos');
        var filePath = fileInput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.pdf)$/i;
        if(!allowedExtensions.exec(filePath)){
            alert('Verifique que su archivo termine con .jpeg/.jpg/.png/.pdf');
        }else{
            //shadow.querySelectorAll("li").forEach((comprobante) => {
            //comprobantes.push($(comprobante).text());
            //sessionStorage.setItem("subidos", JSON.stringify(comprobantes));
            //window.location = "./index.html";
            //});
            alert('Aquí se enviará el archivo al servidor y se guardará la ruta en bd para cada boleto.');
            window.location = "./index.html";
            return;
        }
      }
      input.click();
    };

    input.addEventListener("change", function () {
      cantidadArchivos = this.files.length;
    });
  }
}

window.customElements.define("comprobante-info", Comprobante);