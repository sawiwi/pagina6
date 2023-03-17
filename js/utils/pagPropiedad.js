import { getProperties } from "../services/PropertiesServices.js";


const list_props = document.getElementById('list_props')


let btnNext;
let btnPrevious;

export const getProps = (page , limit) =>{
    const response  =  getProps(page, limit);
    const result= response.json();

}

