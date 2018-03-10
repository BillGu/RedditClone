import React, { Component } from 'react';

import { Grid, Row, Col, Button, Glyphicon, PageHeader, Checkbox } from 'react-bootstrap';
import Topic from './topic';

class Main extends React.Component{

  constructor(props) {
    super(props);
  } 

  render() {

    const numbers = [100, 29, 13, 4, 3, 2, 1];

  	return (
          <Grid>
  	  			<Row>
  	  				<PageHeader><Glyphicon glyph="time" />&nbsp;Reddit Clone <small>Some say its better than reddit itself...</small></PageHeader>
  	  			</Row>	
            <Row>
              <Col sm={2}>
                <Button bsStyle="primary">Add a topic</Button>
              </Col>

              <Col sm={4}>
                <Checkbox>View all topics</Checkbox>
              </Col>
            </Row>

            <hr/>

            <Row>
              <Col sm={8} smOffset={2}>
                {numbers.map((data) => <Topic data={data}/>)}
              </Col>
            </Row>
  		    </Grid>
          )
  }
}

export default Main;