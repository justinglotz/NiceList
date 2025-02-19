import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import GiftCard from '../../components/cards/GiftCard';

export default function GiftsPage() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Link href="/gift/new" passHref>
          <Button>New Gift</Button>
        </Link>
      </div>

      <GiftCard />
    </>
  );
}
