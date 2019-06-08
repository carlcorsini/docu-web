import React, { Component } from "react";

import { Button, Card, Row, Col } from "react-materialize";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = { cardDisplay: false };

  markerClick = () => {
    this.setState({ cardDisplay: !this.state.cardDisplay });
  };

  render() {
    return (
      <div className="container">
        <Map
          style={{
            width: "70%",
            height: "60%"
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
            onClick={this.markerClick}
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

        <Card
          className="blue-grey darken-1"
          style={
            this.state.cardDisplay ? { display: "block" } : { display: "none" }
          }
          textClassName="white-text"
          title="Beach Clean Up"
        >
          Fort Baker Beach Cleanup
        </Card>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAdNhs43ENdqBJLup0lWYBtl7US4qM7CXo"
})(MapContainer);
