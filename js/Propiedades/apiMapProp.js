import { getProperties} from "../services/PropertiesServices.js";


export default async function apiCallMap() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ'
    const map = new mapboxgl.Map({
        
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.680628,-33.469970],
        projection: 'globe',
        zoom: 8.5
    });

    let {data} = await getProperties();
    const promiseMap = new Promise(
        (resolve)=>{
        data.map(data => {    
            
                if(data.LngLat === null )return; 

                const LngLat= data.LngLat.replace('{','').replace('}','').replace(',', '').replace('Lat', "").split(':');
                // console.log(LngLat[1])
                // console.log(LngLat[2])

                const propiedad = [parseFloat(LngLat[1]) , parseFloat(LngLat[2])];

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                    `${data.title}`,
                    `${data.price}`
                );
                
                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';
            
                new mapboxgl.Marker({
                    color: '#1ea498',
                    scale: .9
                })
            
                // create the marker
                // new mapboxgl.Marker(el)
                
                    
                    .setLngLat(propiedad)
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);
                    

            //         map.on('click', (event) => {
            //             // If the user clicked on one of your markers, get its information.
            //             const features = map.queryRenderedFeatures(event.point, {
            //               layers: ['YOUR_LAYER_NAME'] // replace with your layer name
            //             });
            //             if (!features.length) {
            //               return;
            //             }
            //             const feature = features[0];
                      
            //             // Code from the next step will go here.
            //           });
            })
            resolve()
        }
    ) 
    promiseMap.then(()=>{
          
        map.on('load', function () {
            map.resize();
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style

        });
    })
     

}


