import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import { Image } from 'react-bootstrap';
import axios from 'axios'

import './styles/hedgehogPanel.css'

require('dotenv').config();

export default class Hedgehog extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: undefined,
      imgURL: undefined,
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getHedgehog();
  }

  //Function to get the image
  getHedgehog() {

    let code = (this.props.location.search).replace("?code=", "");

    if (!this.props.location.search) {
      this.getHedgehogFromServer();
    } else {
      this.getHedgehogFromCode(code);
    }
  };

  //Function to get the image from server
  getHedgehogFromServer() {

    let request = `${process.env.REACT_APP_SERVER}/api/v1/random`
    this.setState({id: undefined})
    this.setState({imgURL: undefined})

    axios.get(request).then(response => {
      this.setState({id: response.data.data._id})
      this.setState({imgURL: response.data.data.url})
    })
  };

  //Function to get the image from server
  getHedgehogFromCode(code) {

    let request = `${process.env.REACT_APP_SERVER}/api/v1/codes/?code=${code}`
    this.setState({id: undefined})
    this.setState({imgURL: undefined})

    axios.get(request).then(response => {
      this.setState({id: response.data.data.codeRequest})
      this.setState({imgURL: response.data.data.imageURI})
    }).catch (() => {
      this.getHedgehogFromServer();
    })
    
  };

  //Function to delete the image from server
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
          <Panel className="centeralign">
            
            <Image src={this.state.imgURL} className="hedgehogImg" rounded />

            <Panel.Body>
              <Button className='getBtn' onClick={() => {
                  this.getHedgehog();
                }}>

                Click to View A New Hedgehog

              </Button>
              <br/>
              <Button className='deleteBtn' onClick={() => {
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
