import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

// import { makeStyles, Theme } from '@material-ui/core/styles';





// const useStyles = makeStyles((theme: Theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.paper,
//         width: '100vw',
//         Height: '100vh',
//         Border: '1px solid red'
//     },
// }));

interface MapProps {
    pos: any,
    zoom: number,
    radius: number,
    
};

function Map(props: MapProps) {
    const { pos, zoom, radius } = props;
    const [places, setPlaces] = useState([]);

    const request: {} = {
        location: {
            lat: pos.latitude,
            lng: pos.longitude
        },
        radius: radius,
        type: ['hospital'],
    };
    const div = document.createElement('div');
    div.style.width = "100%";
    div.style.height = "100%";
    div.id = "map";
    console.log(typeof (div))


    const map = new google.maps.Map(div, { center: { lat: pos.latitude, lng: pos.longitude }, zoom: zoom });

    useEffect(() => { fetchPlaces() })

    function fetchPlaces() {

        const service = new google.maps.places.PlacesService(map);
        console.log(service);
        service.nearbySearch(request, (results: any, status: string) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(results.geometry);
                setPlaces(results.geometry.location);
                return results;
            } else console.log(status);
        });
        
    }

    return (
        <div>
            <GoogleMap
                onBoundsChanged={fetchPlaces}
                defaultZoom={zoom}
                defaultCenter={{ lat: pos.latitude, lng: pos.longitude }}
            >
                <Marker position={{ lat: pos.latitude, lng: pos.longitude }} />
                {/* {places.map((place, i) =>
                <Marker key={i} position={{ lat: place.lat, lng: place.lng }} />
            )} */}
                {places}

            </GoogleMap>
        </div>
    );

};

const WrappedMap = withScriptjs(withGoogleMap(Map));

interface MapContainerProps {
    location: any;
    radius: number;
};

function MapContainer(props: MapContainerProps) {
    // const classes = useStyles();
    const { location, radius } = props;
    const zoom = 11;

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <WrappedMap
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
                googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyAv3B4WEFcTBWcb-_jBKCv6hiQYFSqedvE&libraries=places'}
                pos={location}
                zoom={zoom}
                radius={radius}
            />
        </div>

    );
}

export default MapContainer;