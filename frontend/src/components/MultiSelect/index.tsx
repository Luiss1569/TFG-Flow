import React from 'react';
import Select from 'react-select'

// import { Container } from './styles';

interface Props {
  options?: { value: string; label: string }[];
}

const MultiSelect: React.FC<Props> = ({ options }) => {
  return <Select isMulti options={options} />
}

export default MultiSelect;