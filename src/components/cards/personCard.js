'use client';

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deletePerson } from '../../api/personData';

export default function PersonCard({ personObj, onUpdate }) {
  const deleteThisPerson = () => {
    if (window.confirm(`Delete ${personObj.name}?`)) {
      deletePerson(personObj.personId).then(() => onUpdate());
    }
  };
  return (
    <div>
      <Card className="w-[300px]">
        <Card.Body>
          <Card.Title>{personObj.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{personObj.address}</Card.Subtitle>
          <Link href={`/person/edit/${personObj.personId}`} passHref>
            <Button>Edit</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPerson}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

PersonCard.propTypes = {
  personObj: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    uid: PropTypes.string,
    personId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
