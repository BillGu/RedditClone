import React from 'react'
import {Grid, Row, Col, Panel, ButtonGroup, DropdownButton, MenuItem, Button, Glyphicon} from 'react-bootstrap'

const Topic = (props) => {
	const {data, handleUpvote, handleDownvote, handleRemove, value} = props;

	return <Panel>
			 <Grid>
				 <h3>{data["Topic"]}</h3>
				 <p>Votes: {value[data["Id"]]}</p>

				 <ButtonGroup>
				  <Button name={data["Id"]} onClick={handleUpvote}>Upvote</Button>
				  <Button name={data["Id"]} onClick={handleDownvote}>Downvote</Button>
				  <DropdownButton title="Change" id="bg-nested-dropdown">
				    <MenuItem eventKey="1" name={data["Id"]} onClick={handleRemove}>Remove</MenuItem>
				  </DropdownButton>
				 </ButtonGroup>

				<br/><br/>
			 </Grid>
		   </Panel>
}

export default Topic