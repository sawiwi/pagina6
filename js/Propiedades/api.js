import { getProperties} from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

export default async function apiCall() {
  let {data} = await getProperties();

const response = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  // let filtrado = data.filter(data => data.city != null && data.commune != null);

  document.getElementById('container-prop-card').innerHTML = data.map(data => 
    `<div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" id="" data-aos="fade-up" data-aos-delay="100" >
        <div class="media-entry" id="getProperty">
          <a href="/detalle_propiedad.html?${data.id}&realtorId=${5}&statusId=${5}" >
            <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "images/Sin.png"  } " alt="Image" class="img-fluid imgCasas">
          </a>
          <div class="bg-white m-body">
            <span class="date" >${data.operation}</span> -
            <span class="date"><b>UF ${clpToUf(data.price, ufValueAsNumber)} , ${parseToCLPCurrency(data?.price)}</b></span>
            <h3 class="mt-3"><a href="/detalle_propiedad.html?${data.id}&realtorId=${5}&statusId=${5}">${data.title}</a></h3>
            <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
            <p><b>Habitacion(es):</b> ${data.bedrooms}</p>
            <p><b>Baños(s):</b>${data.bathrooms}</p>
            <p><b>Estacionamiento(s):</b> ${data.coveredParkingLots}</p>
            <a href="/detalle_propiedad.html?${data.id}&realtorId=${5}&statusId=${5}" name="VerDetalle"  class="more d-flex align-items-center float-start">
              <span class="label" id="getProperty">Ver Detalle</span>
              <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
            </a>
          </div>
        </div> 
      </div>`
    ).join('');
  document.getElementById('container-prop-list').innerHTML = data.map(data => 
    `<div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-4" data-aos="fade-up" data-aos-delay="100">
        <div class="media-entry">
          <div class="row">
            <div class="col-4">
              <a href="/detalle_propiedad.html?${data.id}&realtorId=${5}&statusId=${5}">
                <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "images/Sin.png"  }" alt="Image" class="img-fluid imgCasasList">
              </a>
            </div>
            <div class="col-8">
              <div class="bg-white m-body">
                <span class="date">${data.operation}</span>-
                <span class="date"><b>UF ${clpToUf(data.price, ufValueAsNumber)}, $${data.price} </b></span>
                <h3 class="mt-3"><a href="/detalle_propiedad.html?${data.id}&realtorId=${5}&statusId=${5}">${data.title}</a></h3>
                <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
                <p><b>Habitacion(es):</b> ${data.bedrooms}</p>
                <p><b>Baños(s):</b> ${data.bathrooms}</p>
                <p><b>Estacionamiento(s):</b>${data.coveredParkingLots}</p>
  
                <a href="/detalle_propiedad.html?${data.id}&realtorId=${5}&statusId=${5}" class="more d-flex align-items-center float-start">
                  <span class="label">Ver Detalle</span>
                  <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                </a>
              </div>
            </div>
          </div>	
        </div>
      </div>`
    ).join('');
    

}

