import React from 'react'
import {Col, Button, FormGroup, ControlLabel, FormControl, Form, Glyphicon} from 'react-bootstrap'

import {createTopic} from '../action/topic'
import { connect } from 'react-redux'

import {Link} from 'react-router-dom'

class TopicAddition extends React.Component{
  
  constructor(props) {
  	super(props);

    this.state = {
      topic: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
      event.preventDefault();
      
      if (this.state.request === '') {
         alert('Fields cannot be blank!');
      } else {
        console.log(this.state.topic)
        this.props.dispatch(createTopic(this.state.topic));
      }
  }

  render(){
    return(
    	  <div className="container">
          <Link to={'/'}><Button bsStyle="default"><Glyphicon glyph="chevron-left" />&nbsp;Back</Button></Link>
          <h3>Add a topic</h3>
          <p>Be creative with your names so that more people will vote</p>
          <hr/>
          <Form horizontal onSubmit={this.handleSubmit}>

            <FormGroup controlId="formHorizontalPost">
              <Col componentClass={ControlLabel} sm={2}>
                Topic
              </Col>
              <Col sm={10}>
                <FormControl 
                  componentClass="textarea" placeholder="Write what topic you want here!" 
                  name="topic" value={this.state.topic}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">
                  Add
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
    );
  }
};

function mapStateToProps(state) {
  return { error: state.topic.error };
}

export default connect(mapStateToProps)(TopicAddition)


  
