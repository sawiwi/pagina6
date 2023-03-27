import api from "./AuthencationServices.js"

export const getProperties = async(realtorId, statusId , companyId) => {
  let {data} = await api.get(`properties?realtorId=${realtorId}&statusId=${statusId}&companyId=${companyId}`);
  return data;
}

// export const getPropertiesCant = async( totalItems = "") => {
//   let {meta} = await api.get(`properties?totalItems=${totalItems}`);
//   return meta;
// }

export const getPropertiesForId = async( id ,  statusId, companyId) => {
  let data = await api.get(`properties/${id}?&statusId=${statusId}&companyId=${companyId}`);
  return data;
}


export const getPropertiesOnForm = async(statusId = 1, companyId=1, operationType="", typeOfProperty="", region="", commune="", min_price=0, max_price, bathrooms, bedrooms, surface_m2,covered_parking_lots) => {
const _statusId = `${statusId}`;
const _companyId = `${companyId}`;
const _operationType = operationType?.length > 0 ? operationType : false;
const _typeOfProperty = typeOfProperty?.length > 0 ? typeOfProperty : false;
const _region = region > 0 ? region : false;
const _commune = commune?.length > 0 ? commune : false;
const _min_price = min_price > 0 ? min_price : false;
const _max_price = max_price > 0 ? max_price : false;
const _bathrooms = bathrooms > 0 || bathrooms > '0' ? bathrooms : false;
const _bedrooms = bedrooms > 0 || bedrooms > '0' ? bedrooms : false;
const _surface_m2 = surface_m2 > 0 || surface_m2 > '0' ? surface_m2 : false;
const _covered_parking_lots = covered_parking_lots > 0 ? covered_parking_lots : false;


const response = await api.get(`properties?statusId=${_statusId}&companyId=${_companyId}${_operationType?`&operationType=${_operationType}`:''}${_typeOfProperty?`&typeOfProperty=${_typeOfProperty}`:''}${_region?`&region=${_region}`:''}${_commune?`&commune=${_commune}`:''}${_min_price?`&min_price=${_min_price}`:''}${_max_price ? `&max_price=${_max_price}`:''}${_bathrooms ? `&bathrooms=${_bathrooms}` : ''}${_bedrooms ? `&bedrooms=${_bedrooms}` : ''}${_surface_m2?`&surface_m2=${_surface_m2}`:''}${_covered_parking_lots?`&covered_parking_lots=${_covered_parking_lots}`:''}`);
return response.data;

}


export const getRegiones = async () => {
  let data = await api.get(`properties/select-filters`);
  return data;
}


export const getCommune = async (id) => {
  let data = await api.get(`properties/communes?stateId=${id}`);
  return data;
}