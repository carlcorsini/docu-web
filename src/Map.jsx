import React, { Component } from "react";

import { Button, Card, Row, Col } from "react-materialize";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker
          title={"The marker`s title will appear as a tooltip."}
          name={"SOMA"}
          position={{
            lat: this.props.initialCenter.lat,
            lng: this.props.initialCenter.lng
          }}
        />
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{"something"}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAdNhs43ENdqBJLup0lWYBtl7US4qM7CXo"
})(MapContainer);
