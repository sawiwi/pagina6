import { getProperties } from "../services/PropertiesServices.js";

let query = {
	page: 1,
	limit: 10,
	realtorId: 0,
	statusId: 5,
	companyId:1,
	operationType: "",
	typeOfProperty: "",
	region: "0",
	commune: "0",
	min_price: 0,
	max_price: 0,
	bathrooms: 0,
	bedrooms: 0,
	surface_m2: 0,
	covered_parking_lots: 0,

};

let aux = new URLSearchParams(window.location.search);

for (let p of aux) {
	query[`${p[0]}`] = p[1];
}

// var rad = document.myForm.flexRadioDefault;
// for (var i = 0; i < rad.length; i++) {
// 	if (query.operationType == rad[i].value) rad[i].checked = true;
// }

// var rad1 = document.myForm1.flexRadioDefault;
// for (var i = 0; i < rad1.length; i++) {
// 	if (query.currency == rad1[i].value) rad1[i].checked = true;
// }
document.getElementById("operationType").value = query.operationType;
document.getElementById("typeOfProperty").value = query.typeOfProperty;
document.getElementById("region").value = query.region;
document.getElementById("commune").value = query.commune;
document.getElementById("min_price").value = query.min_price;
document.getElementById("max_price").value = query.max_price;
document.getElementById("bathrooms").value = query.bathrooms;
document.getElementById("bedrooms").value = query.bedrooms;
document.getElementById("surface_m2").value = query.surface_m2;
document.getElementById("covered_parking_lots").value = query.covered_parking_lots;

document.getElementById("buscar2").click();
								
