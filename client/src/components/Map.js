import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, Polyline} from "react-google-maps";



function Map({form}){
  const coordinates = [{lat: Number.parseFloat(form.lat1), lng: Number.parseFloat(form.lon1)},{lat: Number.parseFloat(form.lat2), lng: Number.parseFloat(form.lon2)}]
  return(
    <div>
      <GoogleMap defaultZoom={5} defaultCenter={{lat: Number.parseFloat(form.lat1), lng: Number.parseFloat(form.lon1)}}>
        <Marker position={{lat: Number.parseFloat(form.lat1), lng: Number.parseFloat(form.lon1)}} />
        <Marker position={{lat: Number.parseFloat(form.lat2), lng: Number.parseFloat(form.lon2)}} />
        <Polyline
          path={coordinates}
          options={{
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </div>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function MapContainer({form, distance}){
  return(
    <div style={{width: "700px", height: "500px"}}>
      <h1>Расстояние между точками {distance} км</h1>
      <WrappedMap
        containerElement={<div style={{height: "100%"}}/>}
        mapElement={<div style={{height: "100%"}}/>}
        googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDbKDDln0bJkfX4tO4fywUHiGFZaNzKSpc"}
        loadingElement={<div style={{height: "100%"}}/>}
        form={form}
      />
    </div>
  )
}