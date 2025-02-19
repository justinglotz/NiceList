'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const initialState = {
  name: '',
  address: '',
};

export default function GiftForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center">
      <Form className="w-3/4">
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter person name" name="name" value={formInput.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter person's address" name="address" value={formInput.address} onChange={handleChange} />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="w-25 mt-2 mb-4">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

GiftForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  }),
};
