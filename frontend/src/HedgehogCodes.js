import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import { Link } from 'react-router-dom';

import './styles/hedgehogPanel.css'

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
                    <Link to={{
                      pathname: `/hedgehog/?code=${code.code}`
                    }}>
                      Get Hedgehog For {code.code}
                    </Link>
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
