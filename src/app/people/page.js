'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import PersonCard from '../../components/cards/personCard';
import { getPeople } from '../../api/personData';
import { useAuth } from '../../utils/context/authContext';
import { useSearch } from '../../utils/context/searchContext';

export default function PeoplePage() {
  const [people, setPeople] = useState([]);
  const { user } = useAuth();
  const { searchQuery } = useSearch();

  const getAllThePeople = () => {
    getPeople(user.uid).then(setPeople);
  };

  useEffect(() => {
    getAllThePeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  const filteredPeople = useMemo(() => {
    // Show all ideas if search query is empty or just 1 character
    if (!searchQuery || searchQuery.length <= 1) {
      return people;
    }

    // Filter ideas that match the search query
    return people.filter((person) => {
      const searchLower = searchQuery.toLowerCase();
      // Adjust these fields based on your gift idea structure
      return person.name?.toLowerCase().includes(searchLower) || person.address?.toLowerCase().includes(searchLower);
    });
  }, [people, searchQuery]);

  return (
    <div>
      <div className="flex justify-center items-center">
        <Link href="/person/new" passHref>
          <Button>New Person</Button>
        </Link>
      </div>
      <div className="mx-auto w-4/5">
        <div className="flex flex-row flex-wrap justify-start gap-3 m-2">
          {filteredPeople.map((person) => (
            <PersonCard key={person.personId} personObj={person} onUpdate={getAllThePeople} />
          ))}
        </div>
      </div>
    </div>
  );
}
