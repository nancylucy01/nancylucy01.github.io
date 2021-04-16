import {Image, InputGroup, Container, Row, Col, Button, Form, FormControl} from "react-bootstrap";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mount from "./mountain2.jpg";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as Realm from "realm-web"
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
const Trips = props => (
  <tr>
      <td>{props.trips.trips_name}</td>
      <td>{props.trips.trips_description}</td>
      <td>{props.trips.trips_difficulty}</td>
      <td>{props.trips.trips_days}</td>
      <td>{props.trips.trips_type}</td>
      <td>{props.trips.trips_x}</td>
      <td>{props.trips.trips_y}</td>
  </tr>
)
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [], 
      trips_name: '',
      trips_description: '',
      trips_difficulty: 'Beginner',
      trips_days: 0,
      trips_x: 0,
      trips_y: 0,
      trips_type: 'Hiking',
      trips_distance: 'Hiking'
    }
    this.onChangeTripsName = this.onChangeTripsName.bind(this);
    this.onChangeTripsDescription = this.onChangeTripsDescription.bind(this);
    this.onChangeTripsDifficulty = this.onChangeTripsDifficulty.bind(this);
    this.onChangeTripsDays = this.onChangeTripsDays.bind(this);
    this.onChangeTripsType = this.onChangeTripsType.bind(this);
    this.onChangeTripsX = this.onChangeTripsX.bind(this);
    this.onChangeTripsY = this.onChangeTripsY.bind(this);
    this.findTrip = this.findTrip.bind(this);
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
  onChangeTripsDistance(e) {
    this.setState({
      trips_distance: e.target.value
    });
  }
  componentDidMount() {
    const app = Realm.App.getApp("tripwizard-lxwwv"); 
    async function loginAnonymous() {
      // Create an anonymous credential
      const credentials = Realm.Credentials.anonymous();
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
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
  findTrip(){
    //update trips back to default
    const app = Realm.App.getApp("tripwizard-lxwwv"); 
    async function loginAnonymous() {
      // Create an anonymous credential
      const credentials = Realm.Credentials.anonymous();
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
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
    }).then(()=>{

    //Then do any new trip setting
    var i = 0;
    var newtrips = []
    while (i < this.state.trips.length){
      let curTrip = this.state.trips[i]
      if(curTrip.trips_type == this.state.trips_type){
        newtrips.push(curTrip)
      }
      i = i + 1;
    }
    this.setState({trips: newtrips})
    this.forceUpdate()
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
                <Form.Group>
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Control as="select"
                  id = "difficulty"
                  name = "difficulty"
                  onChange={this.onChangeTripsDifficulty}
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
                      onChange={this.onChangeTripsDistance}
                      type="number"/>
                  </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Location (longitude)</Form.Label>
                  <Form.Control
                    onChange={this.onChangeTripsX}
                    type="number"/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Start Location (latitude)</Form.Label>
                  <Form.Control
                    onChange={this.onChangeTripsY}
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
                  onClick={this.findTrip}
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
              Trip Location (longitude)
                <FormControl 
                type = "number"
                onChange={this.onChangeTripsX}
                />
              </Col>
              <Col>
              Trip Location (latitude)
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
  }
  render() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/create" component={CreateTrip} />
    </Router>
  );
  }
}

export default App;
