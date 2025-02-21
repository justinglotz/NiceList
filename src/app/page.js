'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import DashboardCard from '@/components/cards/DashboardCard';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <p>Create a Person for each person on your list</p>
      <p>Then create gifts and assign them to people</p>
      <DashboardCard />
    </div>
  );
}

export default Home;
