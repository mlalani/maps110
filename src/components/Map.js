import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Popup, Marker, useMap} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";

let polygonArrya = []

function ResetCenterView(props) {
    const { searchlocation } = props;
    const map = useMap();
    
    useEffect(() => {
      if (searchlocation) {
        let type = searchlocation?.geojson.type
        map.setView(
          Leaflet.latLng(searchlocation?.lat, searchlocation?.lon),
          map.getZoom(),
          {
            animate: true
          }
        )    

        {polygonArrya && 
          polygonArrya.map((polygona)=>{
            map.removeLayer(polygona);
         })
        }

        let Newcoordinate = []        
        if(type ==="MultiPolygon"){
          searchlocation?.geojson.coordinates.map((coordinate) => {
            Newcoordinate = coordinate[0].map((item) => [item[1], item[0]]);
            let polygon = Leaflet.polygon(Newcoordinate, {
                color: '#51F03B',
              }).addTo(map);
              polygonArrya.push(polygon)
            })
        }else{
          searchlocation?.geojson.coordinates.map((coordinate) => {
            Newcoordinate = coordinate.map((item) => [item[1], item[0]]);
            let polygon = Leaflet.polygon(Newcoordinate, {
                color: '#51F03B',
              }).addTo(map);
              polygonArrya.push(polygon)
            })
          }
      }
    }, [searchlocation]);
  
    return null;
  }

const Map = (props) => {
    const {searchlocation} = props
    const location = [searchlocation?.lat, searchlocation?.lon]

    const icon = Leaflet.icon({
        iconUrl: "./location.png",
        iconSize: [34, 48],
      });

      return ( 
        <>
            <div className='row'>
                <div className='col'>
                <MapContainer center={[42.3554334, -71.060511]} zoom={8} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=tKE3aJXn0tEskxZAIrwy"
                       
                    />
                    {!searchlocation && <Marker position={[42.3554334, -71.060511]} icon={icon}></Marker>}
                    {searchlocation && 
                    <Marker position={location} icon={icon}>
                        <Popup>
                            {searchlocation.display_name}
                        </Popup>
                    </Marker>
                    }

                    <ResetCenterView searchlocation={searchlocation} />
                </MapContainer>
                </div>
            </div>
        </>
    )
}

export default Map