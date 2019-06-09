import React, { Component } from "react";
import ReactDOM from "react-dom";
import Moment from "react-moment";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import {
  Button,
  TextInput,
  Icon,
  Collection,
  CollectionItem
} from "react-materialize";

export class MapContainer extends Component {
  state = {
    name: "",
    email: "",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showingInfoWindow) {
      return false;
    }
    return true;
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    // if (this.state.showingInfoWindow) {
    console.log("map clicked");
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
    // }
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("hey");
    try {
      let response = await fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          fileName: this.state.activeMarker.fileName,
          title: this.state.activeMarker.title,
          desc: this.state.activeMarker.desc
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      let receipt = await response.json();
      console.log(receipt);
    } catch (error) {}
  };

  handleClick = async () => {
    console.log("hey");
  };

  onInfoWindowOpen(props, e) {
    const content = (
      <div>
        <Collection header={this.state.activeMarker.title}>
          <CollectionItem>
            <Moment format="D MMM YYYY" withTitle>
              {this.state.activeMarker.date}
            </Moment>
          </CollectionItem>
          <CollectionItem>
            <Moment date={this.state.activeMarker.date} fromNow />
          </CollectionItem>
          <CollectionItem>{this.state.activeMarker.name}</CollectionItem>
        </Collection>
        <TextInput
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
          label="Name"
        />
        <TextInput
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
          email
          validate
          label="Email"
        />
        <Button onClick={this.handleSubmit} waves="light">
          Submit
          <Icon right>send</Icon>
        </Button>
      </div>
    );

    ReactDOM.render(
      React.Children.only(content),
      document.getElementById("iwc")
    );
  }

  render() {
    return this.props.events ? (
      <div>
        <Map
          onClick={this.onMapClicked}
          style={{
            width: "100%",
            height: "100%"
          }}
          google={this.props.google}
          initialCenter={{
            lat: this.props.center.lat,
            lng: this.props.center.lng
          }}
        >
          {this.props.events.map(a => {
            return (
              <Marker
                key={a.id}
                desc={a.description}
                title={a.title}
                name={a.description}
                date={a.date}
                fileName={a.fileName}
                onClick={this.onMarkerClick}
                position={{
                  lat: a.lat,
                  lng: a.lng
                }}
              />
            );
          })}

          <InfoWindow
            onOpen={e => {
              this.onInfoWindowOpen(this.props, e);
            }}
            onClose={() => this.setState({ showingInfoWindow: false })}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div id="iwc" />
          </InfoWindow>
        </Map>
      </div>
    ) : (
      undefined
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(MapContainer);
