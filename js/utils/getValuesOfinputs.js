import { getProperties } from "../services/PropertiesServices.js";

let query = {}


//Guardo referencia a todos los inputs del filtro
document.getElementById("typeOfOperation").addEventListener( "change", (element) => {
  query.typeOperation = element.target.value;
});

document.getElementById("typeOfProperty").addEventListener( "change", (element) => {
  query.typeOfProperty = element.target.value;
});

document.getElementById("region").addEventListener( "change", (element) => {
  query.region = element.target.value;
});

document.getElementById("commune").addEventListener( "change", (element) => {
  query.commune = element.target.value;
});

document.getElementById("min_price").addEventListener( "change", (element) => {
  query.min_price = element.target.value;
});

document.getElementById("max_price").addEventListener( "change", (element) => {
  query.max_price = element.target.value;
});

document.getElementById("bathrooms").addEventListener( "change", (element) => {
  query.bathrooms = element.target.value;
});

document.getElementById("bedrooms").addEventListener( "change", (element) => {
  query.bedrooms = element.target.value;
});

document.getElementById("surface_m2").addEventListener( "change", (element) => {
  query.surface_m2 = element.target.value;
});

document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    query.covered_parking_lots = element.target.value+0;
  });
 


//Referencia al boton de buscar para comenzar la busqueda al hacer click
document.getElementById("buscar").addEventListener( "click", async() => {
  console.log('buscando');
  let {typeOperation, typeOfProperty, region, commune, min_price, max_price, bathrooms, bedrooms, surface_m2, covered_parking_lots} = query;
  //Paso por paramentro todos los valores de input para ser llamados en servicion 
  let {data} = await getProperties(1, 10, typeOperation, typeOfProperty, region, commune, min_price, max_price, bathrooms, bedrooms, surface_m2, covered_parking_lots)

  //Aqui agregamos nuestra plantilla y cada elemento encontrado en la busqueda anterior se generara un card y seteara los datos correspondientes
  //(Esta debe ser modifiquica de acuerdo a la plantilla requirada)

  //Referencia al contenedor donde se mapearan los elementos
  document.getElementById('container-prop-card').innerHTML = data.map(data => 
    `<div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" id="" data-aos="fade-up" data-aos-delay="100">
        <div class="media-entry">
          <a href="detalle_propiedad.html">
            <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "images/Sin.png"  } " alt="Image" class="img-fluid imgCasas">
          </a>
          <div class="bg-white m-body">
            <span class="date">${data.operation}</span>-
            <span class="date"><b>${data.currency.isoCode} , $${data.price}</b></span>
            <h3 class="mt-3"><a href="#">${data.title}</a></h3>
            <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
            <p><b>Habitacion(es):</b> ${data.bedrooms}</p>
            <p><b>Baños(s):</b>${data.bathrooms}</p>
            <p><b>Estacionamiento(s):</b> ${data.coveredParkingLots}</p>
      
            <a href="detalle_propiedad.html" name="VerDetalle" class="more d-flex align-items-center float-start">
              <span class="label">Ver Detalle</span>
              <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
            </a>
          </div>
        </div> 
      </div>`
    ).join('');

});