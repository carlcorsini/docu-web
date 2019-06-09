import React from "react";
import Map from "./Map";

import "./App.css";
import { Navbar, NavItem } from "react-materialize";
import { geolocated } from "react-geolocated";
import { events } from "./events";

class App extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div className="App">
        {console.log(this.props.coords.latitude, this.props.coords.longitude)}
        <Navbar alignLinks="left">
          <NavItem onClick={console.log("hey")}>Getting started</NavItem>
          <NavItem href="components.html">Components</NavItem>
        </Navbar>
        <Map
          events={events}
          center={{
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude
          }}
        />
        {/* <EventCard coords={this.props.coords} /> */}
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);
