import React from 'react';
import {
  Button,
} from 'reactstrap';

const ButtonRemove = () => (
    <div className="text-right">
      <Button type="submit" color="primary" disabled={!body}>Submit</Button>
    </div>
);

export default ButtonRemove;
