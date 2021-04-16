import {Image, InputGroup, Container, Row, Col, Button, Form, FormControl} from "react-bootstrap";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mount from "./mountain2.jpg";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as Realm from "realm-web"
// import mongoose from "mongoose"

// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// let Trips = require('./trips.model')
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    //To handle changes to an alternate 'this', create a parent class and have each update in render
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    return (
      <div>
        
        <FormControl 
        type="text" 
        placeholder="Search Trips..." 
        onChange={this.handleChange} 
        onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    //To handle changes to an alternate 'this', create a parent class and have each update in render
    this.handleChange = this.handleChange.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
  }

  handleChange(event) {
    this.setState({ value: this.state.value });
  }

  handlePlus(event) {
    console.log(this.state.value);
    this.setState({ value: this.state.value + 1})
  }
  handleMinus(event) {
    if (this.state.value > 0) {
      this.setState({ value: this.state.value - 1})
    }
  }
  render() {
    return (
      <div>
        <InputGroup
         
        >
          <InputGroup.Prepend>
            <Button 
            variant="outline-success"
            onClick={this.handlePlus}
            >+</Button>
            <Button
            variant="outline-success"
            onClick={this.handleMinus}
            > - </Button>
          </InputGroup.Prepend>
          <FormControl 
            onChange={this.handleChange} 
            value = {this.state.value + " days"}

          />
        </InputGroup>
      </div>
    )
  }
}
const Trips = props => (
  <tr>
      <td>{props.trips.trips_name}</td>
      <td>{props.trips.trips_description}</td>
      <td>{props.trips.trips_difficulty}</td>
      <td>{props.trips.trips_days}</td>
      <td>{props.trips.trips_type}</td>
      <td>{props.trips.trips_x}</td>
      <td>{props.trips.trips_y}</td>
      {/* <td>
        <Link to={"/edit/"+props.trips._id}>Edit</Link> 
      </td> */}
  </tr>
)


// Create a component that lets an anonymous user log in
// const APP_ID = "tripwizard-lxwwv"
// const app = new Realm.App({ id: APP_ID });


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [], //to be moved to the trip find page
      // user : app.currentUser

    };
  }
  // setUser(user2){
  //   this.state.user = user2
  // }
  componentDidMount() {
    // const bodyParser = require('body-parser');
    // const mongoose = require('mongoose');
    // let Trips = require('./trips.model')
    // const URI1 = 'mongodb+srv://alexlink404:';
    // const URI2 = 'turtles@cluster0.8sigs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    // // mongoose.connect(URI1 + URI2, { useNewUrlParser: true });
    // const connection = mongoose.connection;connection.once('open', function() {
    //     console.log("MongoDB database connection established successfully");
    // })
    // let url =  `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/trips`
    // loginAnonymous()
    // const mongodb = context.services.get("mongodb-atlas");
    // const tripsCollection = mongodb.db("myFirstDatabase").collection("trips");
    // console.log(tripsCollection)
    // this.state.user = app.logIn(Realm.Credentials.anonymous())
    // console.log(app.currentUser.customData.memberOf)
    // this.setState({trips: app.currentUser.customData.memberOf});
    // fetch(url, { 
    //   method: 'GET',
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   }
    // })
    // .then(res => res.json())
    // .then((response) => {
    //   console.log("response from mongodb: ", response);
    //   this.setState({trips: response});
    // })
    // .catch(error => {
    //   console.log("There was an error with the mongodb request: ", error);
    // });
    // axios.get('http://localhost:'+PORT+'/trips/')
    //     .then(response => {
    //         this.setState({ trips: response.data });
    //     })
    //     .catch(function (error){
    //         console.log(error);
    // //     })
    // const id = "tripwizard-lxwwv";
    // const config = {
    //   id,
    // };
    const app = Realm.App.getApp("tripwizard-lxwwv"); 
    async function loginAnonymous() {
      // Create an anonymous credential
      const credentials = Realm.Credentials.anonymous();
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        // assert(user.id === app.currentUser.id)
        return user
      } catch(err) {
        console.error("Failed to log in", err);
      }
    }
    loginAnonymous().then(user => {
      console.log("Successfully logged in!", user)
    }).then(() => {
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const trips = mongodb.db("myFirstDatabase").collection("trips");
      const hikes = trips.find()
      return hikes;
    }).then((hikes) =>{
      this.state.trips = hikes;
      console.log(this.state.trips)
      this.forceUpdate()
    })
  } //to be moved to the trip find page
  tripsList() {
    return this.state.trips.map(function(currentTrips, i){
        return <Trips trips={currentTrips} key={i} />;
    })
  }
  render(){
  return (
    <div className="App">
      <Container >
      <br></br>
      <Form 
      >
        <Row>
          <Col>
            <Form.Group>
              <SearchBar 
              ></SearchBar>
            </Form.Group>
          </Col>
          <Col className="App-header">Trip OARganizer</Col>
          <Col>
            <Button variant="outline-secondary"
            as={Link}
            to="/create"
            > 
              Add a Trip! +
            </Button>
          </Col>
        </Row>
        <br></br>
        <Row> 
          <Col> 
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Trip Type</Form.Label>
                  <Form.Control as="select">
                    <option>Hiking</option>
                    <option>Backpacking</option>
                    <option>Climbing</option>
                    <option>Paddling</option>
                    <option>Caving</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                Trip Duration (days)
                <Stepper />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Control as="select"
                  id = "difficulty"
                  name = "difficulty"
                  required
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Experienced</option>
                    <option>Professional</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                  <Form.Group>
                    <Form.Label>Travel Distance (miles)</Form.Label>
                    <Form.Control
                     type="number"/>
                  </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Location (x-coord)</Form.Label>
                  <Form.Control
                    type="number"/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Start Location (y-coord)</Form.Label>
                  <Form.Control
                    type="number"/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  as={Link}
                  to= "/"
                  variant="success"
                  // onClick={this.addTrip}
                >
                  Find me a Trip!
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Image 
            src= {mount}
            fluid
            ></Image>
          </Col>
        </Row>
        </Form>
        <Row>
          <h3>Trip List</h3>
            <table className="table table-striped" >
                <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Difficulty</th>
                      <th>Days</th>
                      <th>Type</th>
                      <th>X</th>
                      <th>Y</th>
                      <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                  {this.tripsList() }
                </tbody>
            </table>
          </Row>
      </Container>
    </div>
  )
  }
}
class CreateTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        trips_name: '',
        trips_description: '',
        trips_difficulty: 'Beginner',
        trips_days: 0,
        trips_x: 0,
        trips_y: 0,
        trips_type: 'Hiking',
    }
    this.onChangeTripsName = this.onChangeTripsName.bind(this);
    this.onChangeTripsDescription = this.onChangeTripsDescription.bind(this);
    this.onChangeTripsDifficulty = this.onChangeTripsDifficulty.bind(this);
    this.onChangeTripsDays = this.onChangeTripsDays.bind(this);
    this.onChangeTripsType = this.onChangeTripsType.bind(this);
    this.onChangeTripsX = this.onChangeTripsX.bind(this);
    this.onChangeTripsY = this.onChangeTripsY.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeTripsName(e) {
    this.setState({
        trips_name: e.target.value
    });
  }
  onChangeTripsDescription(e) {
    this.setState({
      trips_description: e.target.value
    });
  }
  onChangeTripsDifficulty(e) {
    this.setState({
      trips_difficulty: e.target.value
    });
  }
  onChangeTripsDays(e) {
    this.setState({
      trips_days: e.target.value
    });
  }
  onChangeTripsX(e) {
    this.setState({
      trips_x: e.target.value
    });
  }
  onChangeTripsY(e) {
    this.setState({
      trips_y: e.target.value
    });
  }
  onChangeTripsType(e) {
    this.setState({
      trips_type: e.target.value
    });
  }
  onSubmit(e) {
    console.log(`Trip submitted: ${this.state.trips_name}`);
    
    const newTrips = {
      trips_name: this.state.trips_name,
      trips_description: this.state.trips_description,
      trips_difficulty: this.state.trips_difficulty,
      trips_days: this.state.trips_days,
      trips_type: this.state.trips_type,
      trips_x: this.state.trips_x,
      trips_y: this.state.trips_y
    }

    const app = Realm.App.getApp("tripwizard-lxwwv"); 
    async function loginAnonymous() {
      // Create an anonymous credential
      const credentials = Realm.Credentials.anonymous();
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        // assert(user.id === app.currentUser.id)
        return user
      } catch(err) {
        console.error("Failed to log in", err);
      }
    }
    loginAnonymous().then(user => {
      console.log("Successfully logged in!", user)
    }).then(() => {
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const trips = mongodb.db("myFirstDatabase").collection("trips");
      const hikes = trips.insertOne(newTrips)
      return hikes;
    }).then((hikes) =>{
      console.log("Inserted: ", hikes)
    })

    // axios.post('http://localhost:'+PORT+'/trips/add', newTrips)
    //         .then(res => console.log(res.data));

    this.setState({
      trips_name: '',
      trips_description: '',
      trips_difficulty: 'Beginner',
      trips_days: 0,
      trips_x: 0,
      trips_y: 0,
      trips_type: 'Hiking',
    })
    var form = document.getElementById("form");
    form.reset();
  }
  render (){
    return (
      <div className="App">
      <Container >
      <br></br>
      <Form id = "form"
      >
        <Row>
          <Col>
            <Form.Group>
              <SearchBar 
              ></SearchBar>
            </Form.Group>
          </Col>
          <Col className="App-header">Trip OARganizer</Col>
          <Col>
            <Button variant="outline-secondary"
            as={Link}
            to="/"
            > 
              Back To Trip Suggestion 
            </Button>
          </Col>
        </Row>
        <br></br>
        <Row> {/*body*/}
          <Col> {/*col for inputs*/}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    type = "text"
                    onChange={this.onChangeTripsName}
                  >
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    type = "text"
                    onChange={this.onChangeTripsDescription}
                  >
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Control as="select"
                  id = "difficulty"
                  name = "difficulty"
                  required
                  onChange={this.onChangeTripsDifficulty}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Experienced</option>
                    <option>Professional</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
              Trip Duration (days)
                <FormControl 
                type = "number"
                onChange={this.onChangeTripsDays}
                />
              </Col>
            </Row>
            <Row>
              <Col>
              Trip Location (x-coord)
                <FormControl 
                type = "number"
                onChange={this.onChangeTripsX}
                />
              </Col>
              <Col>
              Trip Location (y-coord)
                <FormControl 
                type = "number"
                onChange={this.onChangeTripsY}
                />
              </Col>
            </Row>
            <Row>
              <Col>
              <Form.Group>
                  <Form.Label>Trip Type</Form.Label>
                  <Form.Control as="select"
                  onChange={this.onChangeTripsType}
                  >
                    <option>Hiking</option>
                    <option>Backpacking</option>
                    <option>Climbing</option>
                    <option>Paddling</option>
                    <option>Caving</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="success"
                  onClick={this.onSubmit}
                  as={Link}
                  to="/create"
                >
                  Add Trip!
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Image 
            src= {mount}
            fluid
            ></Image>
          </Col>
        </Row>
        </Form>
      </Container>
    </div>
    )
  }
}

class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  
  // handleChange(event) {
  //   // Wat
  // }
  render() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/create" component={CreateTrip} />
      {/* <Route path="/find" component={FindTrip} /> */}
    </Router>
  );
  }
}

export default App;
