// import { getProperties } from "../services/PropertiesServices";

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    alert(JSON.stringify(data))
    // console.log(JSON.stringify(data))
})