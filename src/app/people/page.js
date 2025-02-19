import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function PeoplePage() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Link href="/person/new" passHref>
          <Button>New Person</Button>
        </Link>
      </div>
    </div>
  );
}
