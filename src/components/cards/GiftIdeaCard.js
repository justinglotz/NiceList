'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { getPeople } from '../../api/personData';
import { useAuth } from '../../utils/context/authContext';
import { createGift, updateGift } from '../../api/giftData';
import { deleteGiftIdea } from '../../api/giftIdeaData';

export default function GiftIdeaCard({ giftIdea, onGiftIdeaDelete }) {
  const { user } = useAuth();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople(user.uid).then(setPeople);
  }, [user.uid]);

  const handlePersonSelect = async (person) => {
    try {
      // Create gift process...
      const payload = {
        name: giftIdea.giftIdeaName,
        personId: person.personId,
        status: 1,
        uid: user.uid,
        url: giftIdea.giftIdeaUrl,
        shipped: person.shipped,
      };

      await new Promise((resolve, reject) => {
        createGift(payload)
          .then(({ name }) => {
            const patchPayload = {
              ...payload,
              giftId: name,
            };
            console.log(`Deleting gift idea: ${giftIdea.giftIdeaId}`);
            updateGift(patchPayload)
              .then(() => deleteGiftIdea(giftIdea.giftIdeaId))
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });

      // Call onGiftIdeaDelete AFTER all operations complete
      onGiftIdeaDelete(giftIdea.giftIdeaId);
    } catch (error) {
      console.error('Error processing gift idea:', error);
    }
  };

  return (
    <div className="mb-2">
      <div className="rounded-[17px] border border-[#7fa087] h-[80px] w-4/5 mx-auto flex flex-row">
        <div className="w-[90%] flex flex-col justify-center">
          <div className="h-1/2 flex items-center">
            <h6 className="mx-3 text-black m-0 p-0 leading-none">{giftIdea.giftIdeaName}</h6>
          </div>
          <div className="h-1/2 flex items-center">
            <h6 className="mx-3 text-black m-0 p-0 leading-none">
              <Link href={giftIdea.giftIdeaUrl} target="_blank" rel="noopener noreferrer">
                Link
              </Link>
            </h6>
          </div>
        </div>
        <div className="w-[10%] rounded-[17px] overflow-hidden flex justify-center bg-[#7fa087] hover:bg-[#6b8872] relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-full">
              <Button type="button" className="w-full h-full bg-[#7fa087] text-black hover:bg-[#6b8872] p-0">
                Assign...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {people.map((person) => (
                <DropdownMenuItem key={person.id} onSelect={() => handlePersonSelect(person, giftIdea)}>
                  {person.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

GiftIdeaCard.propTypes = {
  giftIdea: PropTypes.shape({ giftIdeaName: PropTypes.string, giftIdeaUrl: PropTypes.string, giftIdeaId: PropTypes.string }),
  onGiftIdeaDelete: PropTypes.func,
};
