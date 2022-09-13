import React from 'react'
import { GoogleMap, MarkerClusterer, useJsApiLoader, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '101vw',
    height: '100vh',
    marginLeft: -140
};

function Map(props) {
    
    const address = JSON.parse(localStorage.getItem('address'));
    console.log(address);
    const center = {
        lat: address.latitude,
        lng: address.longitude
    }
    const [map, setMap] = React.useState(null)
    const [info, setinfo] = React.useState(false)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAiOEixVl4_Xip7RnI-ZmDLT3cXgv3xoYA"
    })
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    return isLoaded ? (
        <>
        <h1 style={{position: 'absolute', top: '1rem', left: '576px', color: '#281414', zIndex: 10, margin: 0, padding: 0}}>PUTATOE DELIVERIES</h1>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Marker position={{lat: address.latitude, lng: address.longitude}} onClick={()=> setinfo(true)}></Marker>
          {info ? <InfoWindow position={{lat: address.latitude, lng: address.longitude}} onCloseClick={()=> setinfo(false)}>
            <div>
                <div>Address Line1: {address.address_line1}</div>
                <div>Address Line2: {address.address_line2}</div>
                <div>Town: {address.town}</div>
                <div>Landmark: {address.landmark}</div>
                <div>District: {address.district}</div>
                <div>State: {address.state}</div>
            </div>
          </InfoWindow>: <></>}
        </GoogleMap>
        </>
    ) : <></>
}

export default React.memo(Map)