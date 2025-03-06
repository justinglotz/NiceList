'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createPerson, updatePerson } from '../../api/personData';
import Checkbox from '../ui/checkbox';

const initialState = {
  name: '',
  address: '',
  shipped: false, // Add this field to initialState
};

export default function GiftForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  // Add a separate handler for the checkbox
  const handleCheckboxChange = (checked) => {
    setFormInput({ ...formInput, shipped: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.personId) {
      const payload = {
        ...formInput,
        uid: user.uid,
      };
      updatePerson(payload).then(() => router.push(`/people`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPerson(payload).then(({ name }) => {
        const patchPayload = { personId: name };
        updatePerson(patchPayload).then(() => {
          router.push('/people');
        });
      });
    }
  };

  useEffect(() => {
    if (obj.personId) {
      setFormInput(obj);
    }
  }, [obj, user]);

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

        <div className="flex flex-row gap-2 mx-1 items-center">
          <Checkbox
            id="shipped"
            checked={formInput.shipped}
            onCheckedChange={handleCheckboxChange}
            className="bg-white border-gray-300 text-primary-foreground 
              data-[state=checked]:bg-primary data-[state=checked]:text-black"
          />
          <label htmlFor="shipped" className="text-md font-medium leading-none cursor-pointer">
            Gifts for this person will be shipped directly to them
          </label>
        </div>

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
    shipped: PropTypes.bool,
  }),
};
