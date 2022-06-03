import React from "react";
import { useState, useEffect } from "react";
import "../css/Map.css";
import {
  getUserMeals,
  getDiningTotals,
} from "../components/firebaseConfig/utils";
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
  zIndex: 0,
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
    name: "Feast at Rieber",
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
    if (user) {
      getUserMeals(user?.uid).then((reviews) => {
        const locationsWithSize = initialLocations.map((location) => {
          location.size = reviews
            .filter((review) => review.location === location.name)
            .reverse();
          return location;
        });
        getDiningTotals().then((totals) => {
          const locationsWithTotalSize = locationsWithSize.map((location) => {
            location.totalSize = totals.filter(
              (t) => t.location === location.name
            )[0];
            location.totalSize = location.totalSize.total;
            return location;
          });
          setLocations(locationsWithTotalSize);
        });
      });
    }
    setDisplayMessage("Display Totals");
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setDisplayTotals(true);
    }, 500);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);
  const [displayTotals, setDisplayTotals] = React.useState(false);
  const [displayUsers, setDisplayUsers] = React.useState(false);
  const [displayMessage, setDisplayMessage] = React.useState("");

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
  const handleClick = () => {
    setDisplayTotals(!displayTotals);
    setDisplayUsers(!displayUsers);

    setDisplayMessage(!displayTotals ? "Display Users" : "Display Totals");
  };
  return (
    locations &&
    (isLoaded ? (
      <div>
        <button
          id="displayButton"
          className="btn btn-primary btn-lg"
          onClick={handleClick}
        >
          {displayMessage}
        </button>
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
                      radius={Math.sqrt((location.size.length * 80) / 3.1415)}
                      onMouseOver={() => {
                        handleMouseOver(i);
                      }}
                      onMouseOut={() => {
                        handleMouseOut(i);
                      }}
                      onDblClick={() => {
                        window.location.href = location.url;
                      }}
                      visible={displayUsers}
                      options={{
                        fillColor: "#ff0000",
                        fillOpacity: 0.2,
                        strokeColor: "#ff0000",
                        strokeOpacity: 1,
                        strokeWeight: 1,
                      }}
                    />
                    <Circle
                      center={{
                        lat: location.lat,
                        lng: location.lng,
                      }}
                      radius={Math.sqrt((location.totalSize * 80) / 3.1415)}
                      onMouseOver={() => {
                        handleMouseOver(i);
                      }}
                      onMouseOut={() => {
                        handleMouseOut(i);
                      }}
                      onDblClick={() => {
                        window.location.href = location.url;
                      }}
                      visible={displayTotals}
                      options={{
                        fillColor: "#0000ff",
                        fillOpacity: 0.2,
                        strokeColor: "#0000ff",
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
      </div>
    ) : (
      <></>
    ))
  );
}

export default Map;
