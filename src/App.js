import React from "react";
import Map from "./Map";
import "./App.css";
import { Navbar, NavItem } from "react-materialize";
import { geolocated } from "react-geolocated";

class App extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div className="App">
        {console.log(this.props.coords.latitude, this.props.coords.longitude)}
        <Navbar brand={<a />} alignLinks="left">
          <NavItem onClick={console.log("hey")}>Getting started</NavItem>
          <NavItem>Components</NavItem>
        </Navbar>
        <Map
          google={this.props.google}
          initialCenter={
            {
              // lat: this.props.coords.latitude,
              // lng: this.props.coords.longitude
            }
          }
          zoom={15}
          onClick={this.onMapClicked}
          isGeolocationAvailable={true}
        />
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: false,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true
})(App);
