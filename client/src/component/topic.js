import React from 'react'
import {Grid, Row, Col, Panel, ButtonGroup, DropdownButton, MenuItem, Button, Glyphicon} from 'react-bootstrap'

const Topic = (props) => {

	return <Panel>
			 <Grid>
				 <h3>This is a topic</h3>
				 <p>Votes: 100</p>

				 <ButtonGroup>
				  <Button>Upvote</Button>
				  <Button>Downvote</Button>
				  <DropdownButton title="Change" id="bg-nested-dropdown">
				    <MenuItem eventKey="1">Edit</MenuItem>
				    <MenuItem eventKey="2">Remove</MenuItem>
				  </DropdownButton>
				</ButtonGroup>

				<br/><br/>
			 </Grid>
		   </Panel>
}

export default Topic