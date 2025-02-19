'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import PersonCard from '../../components/cards/personCard';
import { getPeople } from '../../api/personData';
import { useAuth } from '../../utils/context/authContext';

export default function PeoplePage() {
  const [people, setPeople] = useState([]);
  const { user } = useAuth();

  const getAllThePeople = () => {
    getPeople(user.uid).then(setPeople);
  };

  useEffect(() => {
    getAllThePeople();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        <Link href="/person/new" passHref>
          <Button>New Person</Button>
        </Link>
      </div>
      <div className="flex flex-row gap-3 m-2">
        {people.map((person) => (
          <PersonCard key={person.personId} personObj={person} onUpdate={getAllThePeople} />
        ))}
      </div>
    </div>
  );
}
