import React from "react";
import { TextInput } from "react-materialize";

class EventCard extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="locationText">
        <ul>
          <li className="lat">Latitude: {this.props.coords.latitude}</li>
          <li className="long">Longitude: {this.props.coords.longitude}</li>
        </ul>
      </div>
    );
  }
}

export default EventCard;
