import React, { Component } from 'react';

import { Grid, Row, Col, Button, Glyphicon, PageHeader, Checkbox } from 'react-bootstrap';
import Topic from './topic';

import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { getTopic, removeTopic } from '../action/topic'
import { upVote, downVote } from '../action/vote'

//Main Page
class Main extends React.Component{

  constructor(props) {
    super(props);

    this.move = false;
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  } 

  //gets all topics or just top 20 based on checkbox click
  handleChange(event) {
    console.log(event.target.checked);

    if (event.target.checked) {
      this.props.dispatch(getTopic(0));
    } else {
      this.props.dispatch(getTopic(1));
    }
  }

  //removes a topic on button press
  handleRemove(event) {
    if (window.confirm("Are you sure you want to delete this topic? All votes will be lost")) {
      this.props.dispatch(removeTopic(event.target.name));
      this.props.dispatch(getTopic(1));
    }
  }

  //gets top 20 topics on button press
  componentDidMount() {
    this.props.dispatch(getTopic(1));
  }

  //sets the state for votes so that button press increments/decrements counter
  componentWillReceiveProps(props) {
    const data = props.topic;
    const error = props.error;

    if (!error) {
      for (var i = 0; i < data.length; ++i) {
        const key = data[i]["Id"];
        const value = data[i]["Votes"];
        this.setState({[key]: value});
      }

      this.move = true;
    }
  }

  //dispatches action to upvote a topic
  handleUpvote(event) {
    var id = event.target.name;
    var newVotes = this.state[id] + 1;

    this.props.dispatch(upVote(id));

    if (!this.props.error)
      this.setState({[id]: newVotes});
  } 

  //similar to above but just downvote
  handleDownvote(event) {
    var id = event.target.name;
    var newVotes = this.state[id] - 1;

    this.props.dispatch(downVote(id));

    if (!this.props.error)
      this.setState({[id]: newVotes});
  }

  render() {

    const {topic, error} = this.props;

  	return (
          <Grid>
  	  			<Row>
  	  				<PageHeader><Glyphicon glyph="time" />&nbsp;Reddit Clone <small>Some say its better than reddit itself...</small></PageHeader>
              <p><i>Vote on your favourite topics below. Top 20 topics are shown below (refresh page to reorder after voting!) Refer to help page (navbar top right) for more information</i></p><br/>
  	  			</Row>

            <Row>
              <Col sm={2}>
                <Link to={'/topic'}><Button bsStyle="primary">Add a topic</Button></Link>
              </Col>

              <Col sm={4}>
                <Checkbox onChange={this.handleChange}>View all topics</Checkbox>
              </Col>
            </Row>

            <hr/>

            <Row>
              {topic && !error && this.move &&
              <Col sm={8} smOffset={1}>
                {topic.map((data) => <Topic data={data} key={data["Id"]} handleUpvote={this.handleUpvote} handleDownvote={this.handleDownvote} handleRemove={this.handleRemove} value={this.state}/>)}
              </Col>
              }
            </Row>
  		    </Grid>
          )
  }
}

function mapStateToProps(state) {
  return { topic: state.topic.data, error: state.topic.error };
}

export default connect(mapStateToProps)(Main)