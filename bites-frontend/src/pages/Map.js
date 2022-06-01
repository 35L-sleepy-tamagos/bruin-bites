import React from "react";
import { useState, useEffect } from "react";

import { getUserMeals } from "../components/firebaseConfig/utils";
import {
  Circle,
  Marker,
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "90vh",
  position: "absolute",
  top: "10vh",
};

const center = {
  lat: 34.072017,
  lng: -118.45182,
};
const initialLocations = [
  {
    name: "De Neve",
    lat: 34.070472,
    lng: -118.4502176,
    visible: false,
    url: "/deneve",
  },
  {
    name: "Epicuria",
    lat: 34.0729426,
    lng: -118.4500778,
    visible: false,
    url: "/epicuria",
  },
  {
    name: "Bruin Plate",
    lat: 34.0718529,
    lng: -118.4497989,
    visible: false,
    url: "/bruinplate",
  },
  {
    name: "Feast",
    lat: 34.0716303,
    lng: -118.4513632,
    visible: false,
    url: "/thefeast",
  },
  {
    name: "Rendezvous",
    lat: 34.0726527,
    lng: -118.4517826,
    visible: false,
    url: "/rendezvous",
  },
  {
    name: "The Study",
    lat: 34.0731466,
    lng: -118.4522589,
    visible: false,
    url: "/thestudy",
  },
  {
    name: "Bruin Cafe",
    lat: 34.0726197,
    lng: -118.4503495,
    visible: false,
    url: "/bruincafe",
  },
  {
    name: "The Drey",
    lat: 34.0725337,
    lng: -118.4535461,
    visible: false,
    url: "/thedrey",
  },
];
function Map({ user }) {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    getUserMeals(user?.uid).then((reviews) => {
      const locationsWithSize = initialLocations.map((location) => {
        location.size = reviews
          .filter((review) => review.location === location.name)
          .reverse();
        return location;
      });
      /*console.log(locationsWithSize);*/
      setLocations(locationsWithSize);
    });
  }, [user]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA-_Ydwt65E_qhTCt7Ma2wx2yvC-q1uTrY",
  });

  const [map, setMap] = React.useState(null);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMouseOver = (i) => {
    const newLocations = locations.map((location, index) => {
      if (i === index) {
        return { ...location, visible: true };
      }
      return location;
    });
    setLocations(newLocations);
  };
  const handleMouseOut = (i) => {
    const newLocations = locations.map((location, index) => {
      if (i === index) {
        return { ...location, visible: false };
      }
      return location;
    });
    setLocations(newLocations);
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      onUnmount={onUnmount}
      style={{ margin: "auto" }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {locations.map((location, i) => {
          if (location.size.length !== 0) {
            return (
              <Marker
                key={i}
                animation={window.google.maps.Animation.DROP}
                position={{
                  lat: location.lat,
                  lng: location.lng,
                }}
              >
                {location.visible && (
                  <InfoWindow
                    position={{ lat: location.lat, lng: location.lng }}
                  >
                    <div>
                      <h3>{location.name}</h3>
                      {location.size.slice(0, 5).map((review) => {
                        return (
                          <div>
                            <p>{review.createdAt}</p>
                          </div>
                        );
                      })}
                    </div>
                  </InfoWindow>
                )}

                <Circle
                  center={{
                    lat: location.lat,
                    lng: location.lng,
                  }}
                  radius={location.size.length * 5}
                  onMouseOver={() => {
                    handleMouseOver(i);
                  }}
                  onMouseOut={() => {
                    handleMouseOut(i);
                  }}
                  onDblClick={() => {
                    window.location.href = location.url;
                  }}
                  options={{
                    fillColor: "#ff0000",
                    fillOpacity: 0.2,
                    strokeColor: "#ff0000",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                  }}
                />
              </Marker>
            );
          }
        })}
        ;
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
