import React, { Component } from 'react';

import { Grid, Row, Col, Button, Glyphicon, PageHeader, Checkbox } from 'react-bootstrap';
import Topic from './topic';

import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { getTopic } from '../action/topic'

class Main extends React.Component{

  constructor(props) {
    super(props);
  } 

  componentDidMount() {
    this.props.dispatch(getTopic(1));
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
              {topic && !error &&
              <Col sm={8} smOffset={1}>
                {topic.map((data) => <Topic data={data} key={data["Id"]}/>)}
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