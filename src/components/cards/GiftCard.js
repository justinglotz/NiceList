'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSinglePerson } from '../../api/personData';

export default function GiftCard({ giftObj }) {
  const [person, setPerson] = useState('woo');

  useEffect(() => {
    if (giftObj.personId) {
      getSinglePerson(giftObj.personId).then((data) => setPerson(data));
    }
  }, [giftObj.personId]);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{giftObj.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Person: {person.name}</Card.Subtitle>
          <Card.Link href={giftObj.url}>Gift Link</Card.Link>
          <div>
            <Button>Edit</Button>
            <Button variant="danger">Delete</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

GiftCard.propTypes = {
  giftObj: PropTypes.shape({
    name: PropTypes.string,
    personId: PropTypes.string,
    uid: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
