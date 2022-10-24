import React, { Component } from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit';

export default class Spinner extends Component {
  render() {
    return (
        <div className='d-flex justify-content-center'>
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
      )  }
    
  }

