'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createPerson, updatePerson } from '../../api/personData';

const initialState = {
  name: '',
  address: '',
};

export default function GiftForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      uid: user.uid,
    };
    console.log(payload);
    createPerson(payload).then(({ name }) => {
      const patchPayload = { personId: name };
      updatePerson(patchPayload).then(() => {
        router.push('/people');
      });
    });
  };

  return (
    <div className="flex justify-center">
      <Form className="w-3/4" onSubmit={handleSubmit}>
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
