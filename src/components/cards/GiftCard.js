'use client';

import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function GiftCard() {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Name</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Person</Card.Subtitle>
          <Card.Text>URL</Card.Text>
          <Button>Edit</Button>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
