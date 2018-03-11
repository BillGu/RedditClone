import React, { Component } from 'react';

import { Grid, Row, Col, Button, Jumbotron, Glyphicon, PageHeader, Panel, Table } from 'react-bootstrap';


const Help = () => (
    <Grid>

      <Row>
        <PageHeader><Glyphicon glyph="wrench" />&nbsp;Help <small>How do I use this application?</small></PageHeader>
        <ul>
          <li>Think of this as a mini Reddit: You can create the topics you want and vote on other people's topics!</li><br/>
          <li>Click 'Add a topic' on the home page to create a topic (do note that there is a character limit of 255)</li><br/>
          <li>Click Upvote/Downvote to vote on your topics!</li><br/>
          <li>Click 'Change' and 'Remove' to delete a topic. Do note that this action cannot be reversed</li><br/>
          <li>The topics will be automatically sorted and by default the top 20 will be shown (refresh to sort it again after voting)</li><br/>
          <li>Tick the checkbox 'View all topics' to see ALL topics instead of just the top 20</li><br/>
          <li>To return to the home page anytime, just click on the Reddit 2.0 button on the NavBar (try it!)</li><br/>
        </ul>
      </Row>

   
    </Grid>
)


export default Help;

