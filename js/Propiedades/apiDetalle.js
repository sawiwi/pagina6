import { getPropertiesForId } from "../services/PropertiesServices.js";
// import { clpToUf } from "../utils/getExchangeRate.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

// let response = ExchangeRateServices(data);
// const ufValue = parseFloat(response.data);

// const response = await ExchangeRateServices.getExchangeRateUF();
// const valueUf= response?.UF[0].Valor;
// console.log(valueUf);

// const getExchangeRateUF = async () => {
//     try {
//       const response = await ExchangeRateServices.getExchangeRateUF();
//       const ufValue = response?.UFs[0]?.Valor;
//       const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
// 	  return (ufValueAsNumber);
    
//     } catch (error) {
//       throw error.response;
//     }
//   };

export default async function apiDetalleCall(id, realtorId, statusId) {
let {data} = await getPropertiesForId(id, realtorId, statusId);

const response = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

	document.getElementById('container-detail-prop').innerHTML =
    `<div class="hero overlay">
		<div class="img-bg rellax">
			<img src="images/interiores4.jpg" alt="Image" class="img-fluid">
		</div>
	</div>
	
	<div class="section" style="padding-top: 1rem;padding-bottom: 0rem;">
		<div class="container">
			<div class="row mb-4">
				<div class="col-8">
					<h1><b>${data.title}</b></h1>
					<span>Cod: ${data.id}</span><br>
					<span><i class='bx bx-map'></i> ${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</span>

				</div>
				<div class="col-4 d-flex justify-content-end">
					<div class="text-center">
						<h1 id="valueUf"><b>UF ${clpToUf(data?.price, ufValueAsNumber )}</b></h1>
						<span style="font-size: 29px;">${parseToCLPCurrency(data?.price)}</span><br>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "images/Sin.png" }" alt="Image" class="img-fluid">
				</div>
			</div>
		</div>
	</div>
	
	<div class="section" style="padding-top:2rem; padding-bottom: 1rem;">
		<div class="container">
			<div class="row">
				<div class="col-md-12 blog-content ">
					<p class="lead">DESCRIPCIÓN</p>
					<p>${data?.description || "No cuenta con descripción"}</p>

				</div>
				<div class="col-md-8 blog-content pe-5">
					<p class="lead">REQUISITOS</p>
					<p>-Acreditar renta 3 veces al valor arriendo</p>
					<p>-Contrato dde trabajo vigente</p>
					<p>-Informe Dicom Platinium</p>
					<div class="sidebar-box" style="padding: 0px;">
						<div class="categories">
							<p class="lead">DETALLES DE LA PROPIEDAD</p>
							<li><a>País: <span>Chile</span></a></li>
							<li><a>Región: <span>${data?.region || "Sin registro de region"}</span></a></li>
							<li><a>Ciudad: <span>${data?.city || "Sin registro de ciudad"}</span></a></li>
							<li><a>Código: <span>${data?.id}</span></a></li>
							<li><a>Estado: <span>${data?.installment_type || "No registra"}</span></a></li>
							<li><a>Superficie construida: <span>${data?.surface_m2}</span></a></li>
							<li><a>Superficie Terreno: <span>${data?.surface_m2}</span></a></li>
							<li><a>Superficie Privada: <span>${data?.surface_m2}</span></a></li>
							<li><a>Baños: <span>${data?.bathroom || "0"}</span></a></li>
							<li><a>Estacionamiento: <span>${data?.coveredParkingLots || "0"}</span></a></li>
							<li><a>Piso: <span>2</span></a></li>
							<li><a>Tipo de propiedad:<span>${data?.types}</span></a></li>
							<li><a>Tipo de operación: <span>${data?.operation}</span></a></li>
						</div>
					</div>
				</div>
				<div class="col-md-4 sidebar">
					<div class="">
						<div class="sidebar-box text-center">
							<img src="images/gal_6.jpg" class="img-fluid imgCorredor mb-3">
							<h3 class="text-black">Nancy Deverenux</h3>
							<p>Nancydeverenux@gmail.com</p>
							<p>+569 9 41198136</p>
							<div class="">
								<input type="button" value="Contactar por whatsapp" class="btn btn-primary btn-md text-white">
							</div>

						</div>
						<div class="comment-form-wrap ">
							<h3 class="mb-3 text-center">Contactar al corredor</h3>
							<form action="#" class="">
								<div class="mb-3">
									<input type="text" class="form-control" id="name" placeholder="Nombre">
								</div>
								<div class="mb-3">
									<input type="email" class="form-control" id="email" placeholder="E-mail">
								</div>
								<div class="mb-3">
									<input type="text" class="form-control" id="asunto" placeholder="Asunto">
								</div>
								<div class="mb-3">
									<textarea name="" id="message" cols="30" rows="3" class="form-control" placeholder="Mensaje"></textarea>
								</div>
								<div class="mb-3">
									<input type="submit" value="Enviar" class="btn btn-primary btn-md text-white">
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="section" style="padding-top:0rem; padding-bottom: 1rem;">
		<div class="container">
			<div class="row">
				<h1><b>UBICACIÓN DE LA PROPIEDAD</b></h1>
				<p><i class='bx bx-map'></i> ${data.address || "No registra dirección"}, ${data.region || "No registra Región"}, Chile</p>
				<div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-4" data-aos="fade-up" data-aos-delay="100">
					
			</div>	
		</div>
	</div>`


// .join('');

// function getProperty(id, realtorId, statusId){
//     const response =  api.get(
//       `properties/${id}?realtorId=${realtorId}&statusId=${statusId}`
//     );
//     return response.data;
//   }
// const getProperty = document.getElementById('getProperty');


// let listaProp = {
//     id : data.id,
//     title : data.title,
//     clp : data.price,
//     type_prop: data.types,
//     type_operation: data.operation,
//     city: data.city,
//     address: data.address,
//     communes: data.commune,
//     image: data.image,
//     description: data.description,
//     bathrooms: data.bathrooms,
//     bedrooms: data.bedrooms,
//     suface_m2: data.suface_m2,
//     coveredParkingLots: data.coveredParkingLots,
//     uncoveredParkingLots: data.uncoveredParkingLots
//  }
 

//  document.getElementById('verProp').addEventListener('click', () =>{
//     alert(listaProp.id)
//  })

// }

// // localStorage.setItem('VerDetalle', '${dataId}');

// // console.log(localStorage.getItem('VerDetalle'));

// lista = [
//     {
//      id : dataId.id,
//      realtorId : dataId.realtorId,
//     //  statusId : dataId.statusId
//     },

//   ];
  
//   localStorage.setItem('lista', JSON.stringify(lista));
  
//  let getItems = JSON.parse(localStorage.getItem('lista'));
  
  

//      getItems.forEach(element => {
//         const btn = document.getElementsByName('btn');

//         let id = element.id;
//         // let realtor = element.realtorId;
//         // let status = element.statusId;

//         let ver = `<a href="${id}" class="more d-flex align-items-center float-start">
//         <span class="label">Ver Detalle</span>
//         <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
//       </a>`

//      });+



// console.log(getPropertiesForId(357, 5, 5));
// let {data} = await getPropertiesForId(id, 5, 5);
// let {data} = await getProperties();
// let data = data.filter(data => data.id != null && data.id != false);
}

	

