import React, { Component } from "react";

import { Button, Card, Row, Col } from "react-materialize";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <div className="container">
        <Map
          style={{
            width: "70%",
            height: "50%"
          }}
          google={this.props.google}
          initialCenter={{
            lat: this.props.center.lat,
            lng: this.props.center.lng
          }}
        >
          <Marker
            title={"Galvanize"}
            name={"SOMA"}
            position={{
              lat: this.props.center.lat,
              lng: this.props.center.lng
            }}
          />
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{"something"}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAdNhs43ENdqBJLup0lWYBtl7US4qM7CXo"
})(MapContainer);
