import React from 'react';
import { Input } from 'reactstrap';

const Select = ({ options, value, ...rest }) => (
  <Input type="select" {...rest} value={value}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </Input>
);

export default Select;
