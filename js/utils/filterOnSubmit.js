import { getPropertiesOnForm } from "../services/PropertiesServices.js"
// import { getProperties } from "../services/PropertiesServices.js";
import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";
 



const onFormSubmit = (
    statusId,
    companyId,
    operationType,
    typeOfProperty,
    region,
    commune,
    min_price,
    max_price,
    bathrooms,
    bedrooms,
    surface_m2,
    covered_parking_lots
  ) => {
    return getPropertiesOnForm(
      statusId,
      companyId,
      operationType,
      typeOfProperty,
      region,
      commune,
      min_price,
      max_price,
      bathrooms,
      bedrooms,
      surface_m2,
      covered_parking_lots 
    );
  };

  let query = {
    realtorId: 0,
    statusId:1,
    companyId:1,
    operationType : "",
    typeOfProperty: "",
    region : "",
    commune: "",
    min_price: "",
    max_price: "",
    bathrooms: "",
    bedrooms: "",
    surface_m2:"",
    covered_parking_lots: "",
  }

  // let aux = new URLSearchParams(window.location.search);

  // for (let p of aux) {
  //   query[`${p[0]}`] = p[1];
  // }



  
document.getElementById('operationType').addEventListener('change',(element) =>{
    console.log(element.target.value)
    query.operationType = element.target.value;
    // const _operationType = operationType.length > 0 ? operationType : false;
    // return element.target.value;
    
 })
 document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
    query.typeOfProperty =  element.target.value;
    // return element.target.value;
})
document.getElementById("region").addEventListener( "change", (element) => {
 query.region = element.target.value;  
 console.log(element.target.value)
      // return element.target.value;
})
document.getElementById("commune").addEventListener( "change", (element) => {
    query.commune =  element.target.value;
    console.log(element.target.value)
  
    // return element.target.value;

  })

 document.getElementById("min_price").addEventListener( "change", (element) => {
    // return element.target.value;
     query.min_price = element.target.value;
})
  
 document.getElementById("max_price").addEventListener( "change", (element) => {
    query.max_price= element.target.value;
})
  
 document.getElementById("bathrooms").addEventListener( "change", (element) => {
    query.bathrooms= element.target.value; 
})
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
     query.bedrooms =  element.target.value;
  
  })
  
document.getElementById("surface_m2").addEventListener( "change", (element) => {
     query.surface_m2= element.target.value;
  
  })

document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    query.covered_parking_lots = element.target.value;  
})

 document.getElementById('buscar2')?.addEventListener('click', async() => {
  console.log('buscando');
  document.getElementById(
		"buscar2"
	).innerHTML = `    	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>`;
	// let  response  = await getProperties(0,1,1);
  // const data = response.data;
  let filtred = await onFormSubmit(
    1,
    1,
    query?.operationType,
    query?.typeOfProperty,
    query?.region,
    query?.commune,
    query?.min_price,
    query?.max_price,
    query?.bathrooms,
    query?.bedrooms,
    query?.surface_m2,
    query?.covered_parking_lots
    )    

  
  const response2= await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor


  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  console.log(filtred);
	document.getElementById("total-prop").innerHTML = `${filtred.meta.totalItems} Propiedades encontradas
	</div>`;
	setTimeout(() => {
		document.getElementById("buscar2").innerHTML = `Buscar`;
		window.scroll({
			top: 500,
			behavior: "smooth",
		});
   

  document.getElementById("container-prop-card").innerHTML = filtred.data.map((data) => 
        `<div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" id="" data-aos="fade-up" data-aos-delay="100">
        <div class="media-entry">
          <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}">
            <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "images/Sin.png"  } " alt="Image" class="img-fluid imgCasas">
          </a>
          <div class="bg-white m-body">
            <span class="date">${data.operation}</span>-
            <span class="date"><b> UF ${clpToUf(data?.price, ufValueAsNumber )} , $${parseToCLPCurrency(data?.price)}</b></span>
            <h3 class="mt-3"><a href="/detalle_propiedad.html?${data.id}statusId=${1}&companyId=${1}">${data.title}</a></h3>
            <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
            <p><b>Habitacion(es):</b> ${data.bedrooms != null && data.bedrooms != undefined && data.bedrooms != "" ? data.bedrooms : "0"}</p>
            <p><b>Baños(s):</b>${data.bathrooms != null && data.bathrooms != undefined && data.bathrooms != "" ? data.bathrooms : "0"}</p>
            <p><b>Estacionamiento(s):</b> ${data.coveredParkingLots != null && data.coveredParkingLots != undefined && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</p>
      
            <a href="/detalle_propiedad.html?${data.id}statusId=${1}&companyId=${1}" name="VerDetalle" class="more d-flex align-items-center float-start">
              <span class="label">Ver Detalle</span>
              <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
            </a>
          </div>
        </div> 
      </div>`
			).join("");

      document.getElementById('container-prop-list').innerHTML = filtred.data.map((data) => 
        `<div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div class="media-entry">
              <div class="row">
                <div class="col-4">
                  <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}">
                    <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "images/Sin.png"  }" alt="Image" class="img-fluid imgCasasList">
                  </a>
                </div>
                <div class="col-8">
                  <div class="bg-white m-body">
                    <span class="date">${data.operation}</span>-
                    <span class="date"><b>UF ${clpToUf(data.price, ufValueAsNumber)}, $${data.price} </b></span>
                    <h3 class="mt-3"><a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}">${data.title}</a></h3>
                    <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
                    <p><b>Habitacion(es):</b> ${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0" }</p>
                    <p><b>Baños(s):</b> ${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}</p>
                    <p><b>Estacionamiento(s):</b>${data.coveredParkingLots != undefined && data.coveredParkingLots != null && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</p>
      
                    <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" class="more d-flex align-items-center float-start">
                      <span class="label">Ver Detalle</span>
                      <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                    </a>
                  </div>
                </div>
              </div>	
            </div>
          </div>`
        ).join('');
	}, 3000);

  

    
   
  })
