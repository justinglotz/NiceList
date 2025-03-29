'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
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
      // Find the selected person to get their shipped attribute
      const selectedPerson = people.find((person) => person.personId === formInput.personId);
      const shipped = selectedPerson?.shipped || false;

      // Include the shipped attribute in the gift payload
      const payload = {
        ...formInput,
        uid: user.uid,
        status: 1,
        shipped, // Add the shipped attribute from the person
      };

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
    <div className="flex justify-center mt-3">
      <Form className="w-3/4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter gift name" name="name" value={formInput.name} onChange={handleChange} required />
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
          <button type="submit" className="px-4 py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded">
            Submit
          </button>
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
