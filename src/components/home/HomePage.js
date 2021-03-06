import React from 'react';
import {Link} from 'react-router';
import { Grid, Row, Col, Jumbotron, Container, Button, Nav, Card, CardTitle, CardBlock, CardText, ListGroup, ListGroupItem } from 'reactstrap';


import Icon from 'react-fontawesome';

import './home.css'
import '../../App.css'


class HomePage extends React.Component {
    render() {
        return (
          <div className="main-div">
            <Jumbotron fluid className="home-jumbotron">
              <Container fluid>
                <h1 className="display-3">Compatible Golf Groupings</h1>
                <p className="lead">Search for an existing group that matches your preferences, or start one of your own.</p>
                  <p className="lead">
              <Button className="jumbotron-button color-hit-orange" size="lg" href='/search'>Search</Button>
              <Button className="jumbotron-button color-hit-orange" size="lg" href="/post">Post</Button>
            </p>
              </Container>
            </Jumbotron>
            <div className="section-body">
                <Row className="section">
                  <Col xs="12" md="6" className="search-col">
                    <h2 className="row-header">Search</h2>
                      <h6 className="row-description">Find an existing group based on search preferences.</h6>
                      <p className="bullet"><Icon name='filter'/>&nbsp; Handicap</p>
                      <p className="bullet"> <Icon name='filter'/>&nbsp; Age</p>
                      <p className="bullet"><Icon name='filter'/>&nbsp; Gender</p>
                      <p className="bullet">
                        <Button className="color-hit-orange" href="/search">Try It Now</Button>
                      </p>
                  </Col>
                  <Col xs="12" md="6" className="img-col" className="mockup-col">
                    <div>
                    <img className="mockup" src={require('../../images/search_mockup.jpg')}/>
                    </div>
                  </Col>
                  </Row>
                  <hr className="section-break"/>
                  <Row className="section">
                    <Col xs="12" md='6' lg="5" className="mockup-col">
                      <div>
                        <img className="mockup" src={require('../../images/post_mockup.jpg')}/>
                      </div>
                  </Col>
                  <Col xs="12" md='6' lg="7" className="search-col">
                    <h2 className="row-header">Post</h2>
                    <h6 className="row-description">Post an existing group with pre-selected preferences for the remaining golfers who will join.</h6>
                    <p className="bullet"><Icon name='refresh'/>&nbsp; Preferences sync with golfer profiles and include handicap, age, and gender</p>
                    <p className="bullet"><Icon name='check'/>&nbsp; Accept or reject join requests</p>
                    <p className="bullet"><Icon name='user'/>&nbsp; Contact accepted group member to confirm addition to course tee time</p>
                  <p className="bullet">
                    <Button className="color-hit-orange" href="/post">Start New Post</Button>
                  </p>
                  </Col>
                </Row>
              </div>
            </div>
        );
    }
}

export default HomePage;
