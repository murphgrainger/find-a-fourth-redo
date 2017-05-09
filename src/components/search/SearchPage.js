import React from 'react';
import {Button} from 'react-bootstrap';

import './search.css'

const LOCAL_URL= 'http://localhost:4000'


class SearchPage extends React.Component {
  constructor(props) {
  super(props);
  this.state = {};
  this.getPosts = this.getPosts.bind(this);
}

    render() {
        return (
          <div className="container">
            <h1>Join a Group</h1>
            <Button bsStyle="primary" onClick={this.getPosts}>Get Posts</Button>
          </div>
        );
    }

    getCourses() {
      let url = `${LOCAL_URL}/swingAPI`
      fetch(url, {
    	method: 'get',
      mode:'cors'
    }).then(response => {
    return response.json()
      }).then(data => {
      console.log(data)
      })
    }

    getPosts() {
      let url = `${LOCAL_URL}/post`;
      fetch(url, {
        method: 'get',
        mode: 'cors'
      }).then(res => {
        return res.json()
      }).then(data => {
        console.log(data);
      })
    }



}

export default SearchPage;
