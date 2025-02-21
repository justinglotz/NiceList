'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import DashboardCard from '@/components/cards/DashboardCard';
import { useEffect, useState } from 'react';
import { getPeople } from '../api/personData';

function Home() {
  const { user } = useAuth();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople(user.uid).then(setPeople);
  }, []);

  console.log(people);

  return (
    <div
      className="text-center d-flex flex-row justify-content-center align-content-center gap-4"
      style={{
        padding: '30px',
        margin: '0 auto',
      }}
    >
      {people.map((personObj) => (
        <DashboardCard key={personObj.personId} personObj={personObj} />
      ))}
    </div>
  );
}

export default Home;
