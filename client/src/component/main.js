import React, { Component } from 'react';

import { Grid, Row, Col, Button, Glyphicon, PageHeader, Checkbox } from 'react-bootstrap';
import Topic from './topic';

import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { getTopic } from '../action/topic'
import { upVote, downVote } from '../action/vote'

class Main extends React.Component{

  constructor(props) {
    super(props);

    this.move = false;
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  } 

  componentDidMount() {
    this.props.dispatch(getTopic(1));
  }

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

  handleUpvote(event) {
    var id = event.target.name;
    var newVotes = this.state[id] + 1;

    this.props.dispatch(upVote(id));

    if (!this.props.error)
      this.setState({[id]: newVotes});
  } 

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
  	  			</Row>

            <Row>
              <Col sm={2}>
                <Link to={'/topic'}><Button bsStyle="primary">Add a topic</Button></Link>
              </Col>

              <Col sm={4}>
                <Checkbox>View all topics</Checkbox>
              </Col>
            </Row>

            <hr/>

            <Row>
              {topic && !error && this.move &&
              <Col sm={8} smOffset={1}>
                {topic.map((data) => <Topic data={data} key={data["Id"]} handleUpvote={this.handleUpvote} handleDownvote={this.handleDownvote} value={this.state}/>)}
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