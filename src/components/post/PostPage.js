import React from 'react';

import PostForm from './PostForm';
import LocationForm from './LocationForm';
import PreviewPost from './PreviewPost';


import './post.css'

import moment from 'moment'

const LOCAL_URL = 'http://localhost:4000'

class PostPage extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    date: moment(),
    ageRange: [25, 45],
    handicapRange: [15, 25],
    gender: 'any',
    sizeGroup: 1,
    toLocation: false,
    toPreview: false,
    address: '',
    geocodeResults: []
};

this.onChildChange = this.onChildChange.bind(this)

}

  onChildChange(newState){
    this.setState(newState, function() {
    })
    this.setState({toLocation: true})
   }

   onLocationChange(newState){
     this.setState(newState)
     this.setState({toPreview: true, toLocation: false})
    }


    render() {
      const toLocation = this.state.toLocation;
      const toPreview = this.state.toPreview;
      if (toLocation) {
        return <div>
                <LocationForm
                  initialState= {this.state}
                  onFormSubmit={(newState) => this.onLocationChange(newState) }/>
              </div>
      } else if(!toLocation && !toPreview) {
        return (
          <div>
            <PostForm
              buttonClick={this.handleClick}
              onFormSubmit={(newState) => this.onChildChange(newState) }
              initialState= {this.state}/>
          </div>
        )
      } else if(toPreview) {
        return (
          <div>
            <PreviewPost
              initialState= {this.state}
              submitFinalForm={this.postFunction(this.state)}/>
          </div>
        )
      }
    }


        postFunction() {
          console.log('will post all this as soon as preview is accepted!');
          // let url = `${LOCAL_URL}/posts`;
          // fetch(url, {
          //   method: 'POST',
          //   mode: 'cors',
          //   headers: {
          //       'Accept': 'application/json',
          //       'Content-Type': 'application/json'
          //     },
          //   body: JSON.stringify(this.state)
          // }).then(res => {
          //   return res.json()
          // }).then(data => {
          //   this.setState({toLocation: true})
          // }).catch(err => {
          //   console.log(err)
          // })
        }
}

export default PostPage;
