'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { getPeople } from '../../api/personData';
import { useAuth } from '../../utils/context/authContext';
import { createGift, updateGift } from '../../api/giftData';

const initialState = {
  name: '',
  url: '',
};

export default function GiftForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [people, setPeople] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.giftId) {
      const payload = { ...formInput, uid: user.uid };
      updateGift(payload).then(() => router.push(`/gifts`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createGift(payload).then(({ name }) => {
        const patchPayload = { giftId: name };
        updateGift(patchPayload).then(() => {
          router.push('/gifts');
        });
      });
    }
  };

  useEffect(() => {
    getPeople(user.uid).then(setPeople);
    if (obj.personId) setFormInput(obj);
  }, [obj, user]);

  return (
    <div className="flex justify-center">
      <Form className="w-3/4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter gift name" name="name" value={formInput.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="Enter gift URL" name="url" value={formInput.url} onChange={handleChange} />
        </Form.Group>

        <Form.Label>Person</Form.Label>
        <Form.Select aria-label="Person" name="personId" onChange={handleChange} className="mb-3" value={formInput.personId || ''} required>
          <option value="">Select a Person</option>
          {people.map((person) => (
            <option key={person.personId} value={person.personId}>
              {person.name}
            </option>
          ))}
        </Form.Select>

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
    url: PropTypes.string,
    personId: PropTypes.string,
  }),
};
