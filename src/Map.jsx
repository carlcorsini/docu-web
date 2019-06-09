import React, { Component } from "react";
import ReactDOM from "react-dom";
import Moment from "react-moment";
import {
  Navbar,
  NavItem,
  Modal,
  DatePicker,
  TimePicker
} from "react-materialize";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import {
  Button,
  TextInput,
  Icon,
  Collection,
  CollectionItem,
  CardPanel
} from "react-materialize";
require("dotenv").config();

export class MapContainer extends Component {
  state = {
    events: [
      {
        id: 1,
        title: "Muir Woods",
        description: "Garbage pickup",
        date: "2019-08-19T12:59-0500",
        lat: 37.897,
        lng: -122.5811,
        fileName: "yes.pdf"
      },
      {
        id: 2,
        title: "Stinson Beach",
        description: "beach cleanup",
        date: "2019-07-21T12:59-0500",
        lat: 37.9005,
        lng: -122.6444,
        fileName: "yes.pdf"
      },
      {
        id: 3,
        title: "Baker Beach",
        description: "Fundraiser",
        date: "2019-08-02T12:59-0500",
        lat: 37.7936,
        lng: -122.4836,
        fileName: "yes.pdf"
      },
      {
        id: 4,
        title: "Ocean Beach",
        description: "Dolphin Party",
        date: "2019-07-04T12:59-0500",
        lat: 32.7495,
        lng: -117.247,
        fileName: "yes.pdf"
      },
      {
        id: 6,
        title: "Grand Teton",
        description: "volunteer cleaning",
        date: "2019-06-12T12:59-0500",
        lat: 36.22525,
        lng: -115.42875,
        fileName: "yes.pdf"
      },
      {
        id: 7,
        title: "King Canyon",
        description: "Volunteer park rangers",
        date: "2019-06-12T12:59-0500",
        lat: 34.16063,
        lng: -111.88128,
        fileName: "yes.pdf"
      },
      {
        id: 8,
        title: "Joshua Tree",
        description: "Trash PickUp",
        date: "2019-06-12T12:59-0500",
        Lat: 34.126919,
        lng: -116.315132,
        fileName: "yes.pdf"
      },
      {
        id: 9,
        title: "Redwood",
        description: "Plant more Redwood trees",
        date: "2019-06-12T12:59-0500",
        lat: 42.422291,
        lng: -123.399582,
        fileName: "yes.pdf"
      },
      {
        id: 10,
        title: "Lassen Volcanic",
        description: "Let it Burn",
        date: "2019-06-12T12:59-0500",
        lat: 30.46715,
        lng: -97.615196,
        fileName: "yes.pdf"
      },
      {
        id: 11,
        title: "Channel Island",
        description: "Deep water trash pickup",
        date: "2019-06-12T12:59-0500",
        lat: 34.15753,
        Lng: -119.22354,
        fileName: "yes.pdf"
      },
      {
        id: 12,
        title: "Death Valley",
        description: "Survive",
        date: "2019-06-12T12:59-0500",
        lat: 36.457111,
        lng: -116.86525,
        fileName: "yes.pdf"
      },
      {
        id: 13,
        title: "Crater Lake",
        description: "Wildlife Preserve actions",
        date: "2019-06-12T12:59-0500",
        lat: 42.944588,
        lng: -122.109001,
        fileName: "yes.pdf"
      },
      {
        id: 14,
        title: "Great Basin",
        description: "Water clean up",
        date: "2019-06-12T12:59-0500",
        lat: 40.666668,
        lng: -117.666664,
        fileName: "yes.pdf"
      },
      {
        id: 15,
        title: "Zion",
        description: "Trash pickup Event",
        date: "2019-06-12T12:59-0500",
        lat: 37.163471,
        lng: -113.016441,
        fileName: "yes.pdf"
      },
      {
        id: 16,
        title: "Rights for Whales",
        description: "Clean up the coastline",
        date: "2019-06-12T12:59-0500",
        lat: 33.53467,
        lng: -117.71611,
        fileName: "yes.pdf"
      },
      {
        id: 17,
        title: "Clean Air Day",
        description: "Petition for annual day to ban cars",
        date: "2019-06-12T12:59-0500",
        lat: 38.57918,
        lng: -121.49516,
        fileName: "yes.pdf"
      },
      {
        id: 18,
        title: "Dogs Rights",
        description: "Just a Dog event <3",
        date: "2019-06-12T12:59-0500",
        lat: 37.29449,
        lng: -121.8501,
        fileName: "yes.pdf"
      },
      {
        id: 19,
        title: "Rally for Cats",
        description: "Petition Event to help cats",
        date: "2019-06-12T12:59-0500",
        lat: 34.43873,
        lng: -119.81389,
        fileName: "yes.pdf"
      },
      {
        id: 20,
        title: "Aquatic Life Reserve",
        description: "Petition event to help clean the Ocean",
        date: "2019-06-12T12:59-0500",
        lat: 34.13409,
        lng: -118.27306,
        fileName: "yes.pdf"
      }
    ],
    title: "",
    description: "",
    date: "",
    time: "",
    fileName: "yes.pdf",
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
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("hey");

    try {
      let response = await fetch(process.env.REACT_APP_API_URL, {
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
      if (receipt.status === "sent") {
        ReactDOM.render(
          React.Children.only(
            <CardPanel className="teal">
              <span className="white-text">Sent!</span>
            </CardPanel>
          ),
          document.getElementById("iwc")
        );
      }
      // console.log(receipt);
    } catch (error) {}
  };

  handleClick = async () => {
    console.log("hey");
  };

  handleCreate = () => {
    let { title, description, date, time, fileName } = this.state;
    let newEvent = {
      title,
      description,
      date: "2019-09-21T12:59-0500",
      fileName,
      lat: this.props.center.lat,
      lng: this.props.center.lng
    };
    this.setState({ events: [...this.state.events, newEvent] });
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
        </Button>
      </div>
    );

    ReactDOM.render(
      React.Children.only(content),
      document.getElementById("iwc")
    );
  }

  render() {
    return this.state.events ? (
      <div>
        <Navbar alignLinks="left">
          <NavItem>
            <Modal
              header="Create Event/Petition"
              trigger={<Button>Create Event/Petition</Button>}
            >
              <div className="newForm">
                <TextInput
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                  label="Title"
                />

                <TextInput
                  onChange={e => {
                    this.setState({ description: e.target.value });
                  }}
                  label="Description"
                />

                <DatePicker onChange={e => {}} label="Date" />

                <TimePicker label="Time" />

                <ul className="locationText">
                  <li className="lat">Latitude: {this.props.center.lat}</li>
                  <li className="long">Longitude: {this.props.center.lng}</li>
                </ul>

                <Button onClick={this.handleCreate} waves="light">
                  Submit
                  {/* <Icon right>send</Icon> */}
                </Button>
              </div>
            </Modal>
          </NavItem>
          {/* <NavItem href="components.html">Components</NavItem> */}
        </Navbar>
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
          {this.state.events.map(a => {
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
        {/* <EventCard coords={this.props.center} /> */}
      </div>
    ) : (
      undefined
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);
