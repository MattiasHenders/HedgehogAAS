import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'

import './styles/hedgehogPanel.css'
import { Title } from 'react-bootstrap/lib/Modal';

let codes = require('./data/codeList.json');

require('dotenv').config();

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    
  }

  render() {

    //Sort the array
    codes.sort((a,b) => {
      return a.code - b.code
    })
      
    return (

      <div className="addmargin hedgehogContainer">
        <div className="col-md-8 hedgehogContents">
          {

            <Panel>
              {
              codes.map((code) => {
                return(
                  <div>
                    <Button onClick={() => {
                      
                    }}>
                      Get Hedgehog For {code.code}
                    </Button>
                  </div>
                )
              })
              }
            </Panel>
          }
        </div>
      </div>
    )
  }

}
