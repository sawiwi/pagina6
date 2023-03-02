import { getProperties } from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"


export default async function apiDestaCall(){
    let {data} = await getProperties();
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted != false);

    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

    document.getElementById('container-props-destacadas').innerHTML = filtrado.map(filtrado => 
        `<div class="item">
            <div class="media-entry">
                <a href="/detalle_propiedad.html?${filtrado.id}&realtorId=${5}&statusId=${5}">
                    <img src="${filtrado.image != undefined && filtrado.image != null && filtrado.image != "" ? filtrado.image : "images/Sin.png"}" alt="Image" class="img-fluid imgCasas">
                </a>
                <div class="bg-white m-body">
                    <span class="date">${filtrado.operation}</span> -
                    <span class="date"><b>UF ${clpToUf(filtrado.price, ufValueAsNumber )}, ${parseToCLPCurrency(filtrado?.price)}</b></span>
                    <h3 class="mt-3"><a href="/detalle_propiedad.html?${filtrado.id}&realtorId=${5}&statusId=${5}">${filtrado.title}</a></h3>
                    <p>${filtrado.address != undefined && filtrado.address != null && filtrado.address != "" ? filtrado.address : "Sin registro Dirección" }, ${filtrado.commune != undefined && filtrado.commune != null && filtrado.commune != "" ? filtrado.commune : "Sin registro de Comuna "},${filtrado.city != undefined && filtrado.city != null && filtrado.city != "" ? filtrado.city : "Sin registro de Ciudad "}, Chile</p>
                    <p><b>Habitacion(es):</b> ${filtrado.bedrooms != undefined && filtrado.bedrooms != null && filtrado.bedrooms != "" ? filtrado.bedrooms : "0"}</p>
                    <p><b>Baños(s):</b> ${filtrado.bathrooms != undefined && filtrado.bathrooms != null && filtrado.bathrooms != "" ? filtrado.bathrooms : "0"}</p>
                    <p><b>Estacionamiento(s):</b> ${filtrado.coveredParkinLost != undefined && filtrado.coveredParkinLost != null && filtrado.coveredParkinLost != "" ? filtrado.coveredParkinLost : "0"}</p>

                    <a href="/detalle_propiedad.html?${filtrado.id}&realtorId=${5}&statusId=${5}" class="more d-flex align-items-center float-start">
                        <span class="label">Ver Detalle</span>
                        <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                    </a>
                </div>
            </div>
        </div>` 
).join('');

}