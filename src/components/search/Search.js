import React, { useState } from 'react';
import { FormControl, InputGroup, Button, Spinner } from 'react-bootstrap';
import searchIMG from '../../assets/search.png';
import style from './Search.module.scss';

export default function Search({ search, deleteSearch, isFound, isSearching, isResettingSearch }) {
  const [value, setValue] = useState('');
  const changeValue = (v) => {
    setValue(v.target.value);
  };

  const onDeleteSearch = () => {
    setValue('');
    deleteSearch();
  };

  const submit = () => {
    search(value);
  };

  return (
    <InputGroup className={style.inputGroup}>
      <FormControl onChange={changeValue} value={value} placeholder="Search" aria-label="Search" />
      <InputGroup.Prepend>
        <Button variant="outline-secondary" onClick={submit}>
          {isSearching ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </>
          ) : null}
          <img className={style.searchIMG} alt="search img" src={searchIMG} />
        </Button>
        {isFound && (
          <Button variant="danger" onClick={onDeleteSearch}>
            {isResettingSearch ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="sr-only">Loading...</span>
              </>
            ) : null}
            reset search
          </Button>
        )}
      </InputGroup.Prepend>
    </InputGroup>
  );
}
