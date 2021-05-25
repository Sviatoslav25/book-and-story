import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import searchIMG from '../../assets/search.png';
import style from './Search.module.scss';

export default function Search({ search, deleteSearch, isFound }) {
  const [value, setValue] = useState('');

  const changeValue = (v) => {
    setValue(v.target.value);
  };

  const submit = () => {
    search(value);
  };

  return (
    <InputGroup className={style.inputGroup}>
      <FormControl onChange={changeValue} value={value} placeholder="Search" aria-label="Search" />
      <InputGroup.Prepend>
        <Button variant="outline-secondary" onClick={submit}>
          <img className={style.searchIMG} alt="search img" src={searchIMG} />
        </Button>
        {isFound && (
          <Button variant="danger" onClick={deleteSearch}>
            reset search
          </Button>
        )}
      </InputGroup.Prepend>
    </InputGroup>
  );
}
