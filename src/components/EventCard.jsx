import React from "react";
import {
  TextInput,
  DatePicker,
  TimePicker,
  Button,
  Icon
} from "react-materialize";

class EventCard extends React.Component {
  render() {
    const latitude = this.props.coords.latitude;
    const longitude = this.props.coords.longitude;

    return (
      <div className="newForm">
        <h1>Submit Event</h1>
        <h2>
          Title: <TextInput />
        </h2>
        <h2>
          Description: <TextInput />
        </h2>
        <section>
          <h2>Date:</h2>
          <DatePicker />
        </section>

        <section>
          <h2>Time: </h2>
          <TimePicker />
        </section>

        <section>
          <ul className="locationText">
            <li className="lat">Latitude: {latitude}</li>
            <li className="long">Longitude: {longitude}</li>
          </ul>
        </section>

        <Button type="submit" waves="light">
          Submit
          <Icon right>send</Icon>
        </Button>
      </div>
    );
  }
}

export default EventCard;
