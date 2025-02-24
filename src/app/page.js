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
  }, [user.uid]);

  console.log(people);

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-row flex-wrap justify-start gap-4 p-8 ">
        {people.map((personObj) => (
          <DashboardCard key={personObj.personId} personObj={personObj} />
        ))}
      </div>
    </div>
  );
}

export default Home;
