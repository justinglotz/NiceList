'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSinglePerson } from '../../api/personData';
import { deleteGift } from '../../api/giftData';

export default function GiftCard({ giftObj, onUpdate }) {
  const [person, setPerson] = useState('');

  const deleteThisGift = () => {
    if (window.confirm(`Delete ${giftObj.name}?`)) {
      deleteGift(giftObj.giftId).then(() => onUpdate());
    }
  };

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
          <Card.Link href={giftObj.url} target="_blank" rel="noopener noreferrer">
            Gift Link
          </Card.Link>
          <div>
            <Link href={`/gift/edit/${giftObj.giftId}`} passHref>
              <Button>Edit</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisGift}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

GiftCard.propTypes = { giftObj: PropTypes.shape({ name: PropTypes.string, personId: PropTypes.string, uid: PropTypes.string, url: PropTypes.string, giftId: PropTypes.string }).isRequired, onUpdate: PropTypes.func.isRequired };
