import React from "react";
import { TextInput } from "react-materialize";

class EventCard extends React.Component {
  render() {
    const latitude = this.props.coords.latitude;
    const longitude = this.props.coords.longitude;
    console.log(this.props);
    return (
      <div className="locationText">
        <ul>
          <li className="lat">Latitude: {latitude}</li>
          <li className="long">Longitude: {longitude}</li>
        </ul>
      </div>
    );
  }
}

export default EventCard;
