'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import PersonCard from '../../components/cards/personCard';
import { getPeople } from '../../api/personData';
import { useAuth } from '../../utils/context/authContext';
import { useSearch } from '../../utils/context/searchContext';

export default function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { searchQuery } = useSearch();

  const getAllThePeople = () => {
    setLoading(true);
    getPeople(user.uid).then((data) => {
      setPeople(data);
      setTimeout(() => setLoading(false), 900);
    });
  };

  const handleDeletePerson = (deletedPersonId) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.personId !== deletedPersonId));
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

    // Filter people that match the search query
    return people.filter((person) => {
      const searchLower = searchQuery.toLowerCase();
      return person.name?.toLowerCase().includes(searchLower) || person.address?.toLowerCase().includes(searchLower);
    });
  }, [people, searchQuery]);

  return (
    <>
      <div className="flex justify-center items-center flex-col mt-[15px]">
        <h3 className="font-quicksand">People</h3>
        <Link href="/person/new" passHref>
          <button type="button" className="px-4 py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded">
            New Person
          </button>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 px-8 mb-4 mt-2">
        {filteredPeople.map((person) => (
          <PersonCard key={person.personId} personObj={person} onUpdate={handleDeletePerson} loading={loading} />
        ))}
      </div>
    </>
  );
}
