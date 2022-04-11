import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import { Image } from 'react-bootstrap';
import axios from 'axios'

import './styles/hedgehogPanel.css'

require('dotenv').config();

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: undefined,
      imgURL: undefined,
      title: "Click Below to Get a Hedgehog!"
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getHedgehog();
  }

  //Function to get the Customer Data from json
  getHedgehog() {

    let request = `${process.env.REACT_APP_SERVER}/api/v1/random`
    this.setState({id: undefined})
    this.setState({imgURL: undefined})

    axios.get(request).then(response => {
      this.setState({id: response.data.data._id})
      this.setState({imgURL: response.data.data.url})
    })
  };

  //Function to get the Customer Data from json
  deleteHedgehog() {

    let request = `${process.env.REACT_APP_SERVER}/api/v1/delete`

    axios.delete(request, {
      headers: {
        undefined
      },
      data: {
        id: this.state.id
      }})
      .then(response => {

        this.setState({id: response.data.data._id})
        this.getHedgehog();
    })
  };

  render() {
    if (!this.state.id)
      return (<p>Loading data</p>)
      
    return (
    
    <div className="addmargin hedgehogContainer">
      <div className="col-md-8 hedgehogContents">
        {
          <Panel bsStyle="info" key={this.state.title} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{this.state.title}</Panel.Title>
            </Panel.Heading>
            
            <Image src={this.state.imgURL} className="hedgehogImg" rounded />

            <Panel.Body>
              <Button bsStyle="info" onClick={() => {
                  this.getHedgehog();
                }}>

                Click to View A New Hedgehog

              </Button>

              <Button bsStyle="danger" onClick={() => {
                  this.deleteHedgehog();
                }}>

                Click to Delete Hedgehog

              </Button>

            </Panel.Body>
          </Panel>
        }
      </div>
    </div>)
  }

}
