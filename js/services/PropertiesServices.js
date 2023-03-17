import api from "./AuthencationServices.js"

export const getProperties = async( page = 1, limit = 10, realtorId = 0, statusId = 5, companyId = 1, operationType = "", typeOfProperty = "", region = "", commune = "", min_price = 0, max_price = 10000000000000, bathrooms=0, bedrooms=0, surface_m2=0,covered_parking_lots=0) => {
  let {data} = await api.get(`properties?page=${page}&limit=${limit}&realtorId=${realtorId}&statusId=${statusId}&companyId=${companyId}&operationType=${operationType}&typeOfProperty=${typeOfProperty}&region=${region}&commune=${commune}&min_price=${min_price}&max_price=${max_price}&bathrooms=${bathrooms}&bedrooms=${bedrooms}&surface_m2=${surface_m2}&covered_parking_lots=${covered_parking_lots}`);
  return data;
}

// export const getPropertiesCant = async( totalItems = "") => {
//   let {meta} = await api.get(`properties?totalItems=${totalItems}`);
//   return meta;
// }

export const getPropertiesForId = async( id , realtorId = 0, statusId = 5, companyId= 1) => {
  let data = await api.get(`properties/${id}?&realtorId=${realtorId}&statusId=${statusId}&companyId=${companyId}`);
  return data;
}

