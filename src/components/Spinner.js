import React from 'react';
import { Spinner } from 'reactstrap';

const CenterSpinner = () => <Spinner
  className="mx-auto"
  style={{
    display: 'block',
    position: 'absolute',
    left: '0',
    right: '0',
  }}
/>;
export default CenterSpinner;
