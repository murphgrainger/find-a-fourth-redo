import React from 'react';
import { Redirect } from 'react-router-dom';


import './post.css'
import 'rc-slider/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';


import { Grid, Row, Col, Form, FieldGroup, Checkbox, Input, FormControl, Button, FormGroup, ControlLabel, Label, Jumbotron, Container } from 'reactstrap';

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import moment from 'moment'

import { Calendar, DateRange } from 'react-date-range';
import DatePicker from 'react-datepicker';

const LOCAL_URL= 'http://localhost:4000'
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};

const handicapMarks = {
  0: <strong>0</strong>,
  10: '10',
  20: '20',
  30: '30',
  40: <strong>40</strong>,
};

const ageMarks = {
  17: <strong>17</strong>,
  25: '25',
  35: '35',
  45: '45',
  55: '55',
  65: '65',
  75: <strong>75</strong>,
};

class PostForm extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    date: moment(),
    ageRange: [25, 45],
    handicapRange: [10, 20],
    gender: 'any',
    sizeGroup: 1,
    redirect: false
};
  this.timeReformat = this.timeReformat.bind(this);
  this.handicapValues = this.handicapValues.bind(this)
  this.ageValues = this.ageValues.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.formSubmit = this.formSubmit.bind(this)
  this.genderVal = this.genderVal.bind(this)
  this.sizeGroupVal = this.sizeGroupVal.bind(this)
}

timeReformat(int) {
  return moment(int, 'HH').format('ha')
}

handicapValues(arrVals) {
  this.setState({
    handicapRange: arrVals
  });
}

ageValues(arrVals) {
  this.setState({
    ageRange: arrVals
  });
}

handleChange(date) {
  this.setState({
    date: date
  });
}

genderVal(e) {
  this.setState({
    gender: e.target.value
  });
}

sizeGroupVal(e) {
  this.setState({
    sizeGroup: e.target.value
  });
}

formSubmit(e) {
  e.preventDefault()
    this.setState({
      date: this.state.date,
      ageRange: this.state.ageRange,
      handicapRange: this.handicapRange,
      gender: this.gender,
      sizeGroup: this.sizeGroup,
    });
    this.postFunction(this.state)
}

    render() {
       const { redirect } = this.state;
       if (redirect) {
       return <Redirect to='/search'/>;
     }
        return (
          <div className="container">
            <Jumbotron fluid>
              <Container fluid>
                <h1 className="display-3">Post a Group</h1>
                <p className="lead">Select handicap, age, and gender preferences for players to join.  Input current group size.  Optionally add region.</p>
              </Container>
            </Jumbotron>
            <Row className="form-holder">
            <form onSubmit={this.formSubmit}>
              <p className="label">Available Date</p>
              <FormGroup id="date-container">
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleChange}
                  className="date-picker"
                  />
              </FormGroup>
              <p className="label">Handicap Range</p>
              <FormGroup>
                <div className="slider">
                  <Range min={0} max={40} defaultValue={[10, 20]} marks={handicapMarks} onAfterChange={this.handicapValues}	tipFormatter={value => `${value}`} />
                </div>
              </FormGroup>
                <p className="label">Age Range</p>
              <FormGroup>
                <div className="slider">
                  <Range min={17} max={75} defaultValue={[25, 45]} marks={ageMarks} onAfterChange={this.ageValues}	tipFormatter={value => `${value}`} />
                </div>
              </FormGroup>
              <p className="label">Gender Preference</p>
                <FormGroup className="radio-group">
                <Label check>
                  <Input type="radio" name="gender" value="Any" onChange={this.sizeGroupVal}/>{' '}
                    Any </Label>
                <Label check>
                  <Input type="radio" name="gender" value="Male" onChange={this.sizeGroupVal}/>{' '}
                    Male </Label>
                <Label check>
                  <Input type="radio" name="gender" value="Female" onChange={this.sizeGroupVal}/>{' '}
                    Female </Label>
                </FormGroup>
                <p className="label">Current Group Size</p>
                <FormGroup className="radio-group">
                <Label check>
                  <Input type="radio" name="sizeGroup" value="1" onChange={this.sizeGroupVal}/>{' '}
                    1 </Label>
                <Label check>
                  <Input type="radio" name="sizeGroup" value="2" onChange={this.sizeGroupVal}/>{' '}
                    2 </Label>
                <Label check>
                  <Input type="radio" name="sizeGroup" value="3" onChange={this.sizeGroupVal}/>{' '}
                    3 </Label>
                </FormGroup>
              <Button type="submit">
                Next
              </Button>
              </form>
            </Row>
          </div>
        );
    }

    postFunction(state) {
      let url = `${LOCAL_URL}/posts`;
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(state)
      }).then(res => {
        return res.json()
      }).then(data => {
        this.setState({
          redirect: true
        })
        console.log(data);
      }).catch(err => {
        console.log(err)
      })
    }
}

export default PostForm;
