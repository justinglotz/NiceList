'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Loader2 } from 'lucide-react'; // Import loading spinner
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button';
import { getPeople } from '../../api/personData';
import { useAuth } from '../../utils/context/authContext';
import { createGift, updateGift } from '../../api/giftData';
import { deleteGiftIdea } from '../../api/giftIdeaData';
import GiftIdeaForm from '../forms/GiftIdeaForm';

export default function GiftIdeaCard({ giftIdea, onGiftIdeaDelete, loading, onPersonSelect }) {
  const { user } = useAuth();
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentGiftIdea, setCurrentGiftIdea] = useState(giftIdea);

  useEffect(() => {
    getPeople(user.uid).then(setPeople);
  }, [user.uid]);

  const handlePersonSelect = async (person) => {
    try {
      onPersonSelect();
      // Create gift process...
      const payload = {
        name: currentGiftIdea.giftIdeaName,
        personId: person.personId,
        status: 1,
        uid: user.uid,
        url: currentGiftIdea.giftIdeaUrl,
        shipped: person.shipped,
      };

      await new Promise((resolve, reject) => {
        createGift(payload)
          .then(({ name }) => {
            const patchPayload = {
              ...payload,
              giftId: name,
            };
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

  const onGiftIdeaUpdate = (payload) => {
    setEditing(false);
    // set the gift idea to the updated version
    setCurrentGiftIdea(payload);
  };

  useEffect(() => {}, [currentGiftIdea]);

  const handleDeleteGiftIdea = (giftIdeaId) => {
    if (window.confirm(`Delete ${currentGiftIdea.giftIdeaName}?`)) {
      deleteGiftIdea(giftIdea.giftIdeaId).then(() => {
        onGiftIdeaDelete(giftIdeaId);
      });
    }
  };

  return editing ? (
    <GiftIdeaForm giftIdeaId={giftIdea.giftIdeaId} existingFormInput={{ giftIdeaName: currentGiftIdea.giftIdeaName, giftIdeaUrl: currentGiftIdea.giftIdeaUrl }} onGiftIdeaUpdate={onGiftIdeaUpdate} />
  ) : (
    <div className="mb-2">
      <div className="rounded-[17px] border border-[#7fa087] h-[80px] w-4/5 mx-auto flex flex-row">
        <div className="w-[90%] flex flex-col justify-center">
          <div className="h-1/2 flex items-center">
            <h6 className="mx-3 text-black m-0 p-0 leading-none">{currentGiftIdea?.giftIdeaName}</h6>
          </div>
          <div className="h-1/2 flex items-center">
            <h6 className="mx-3 text-black m-0 p-0 leading-none">
              {currentGiftIdea.giftIdeaUrl && (
                <Link href={currentGiftIdea.giftIdeaUrl} target="_blank" rel="noopener noreferrer">
                  Link
                </Link>
              )}
            </h6>
          </div>
        </div>
        <div className="sm:w-[10%] w-[40%] rounded-[17px] overflow-hidden flex justify-center relative border-1 sm:border-none">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-full">
              <Button type="button" className="w-full h-full bg-transparent text-black p-0">
                <FontAwesomeIcon icon={faEllipsis} className="text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Button variant="outline" className="w-[50%]" onClick={() => setEditing(true)}>
                Edit{' '}
              </Button>
              <Button variant="outline" className="w-[50%]" onClick={() => handleDeleteGiftIdea(giftIdea.giftIdeaId)}>
                Delete{' '}
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="sm:w-[10%] w-[40%] rounded-[17px] overflow-hidden flex justify-center bg-[#7fa087] hover:bg-[#6b8872] relative">
          {loading ? (
            <Button disabled className="w-full h-full bg-[#7fa087] text-black p-0">
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full h-full">
                <Button type="button" className="w-full h-full bg-[#7fa087] text-black hover:bg-[#6b8872] p-0">
                  Assign...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {people.length < 1 ? (
                  <DropdownMenuItem disabled>You need to create a person before you can assign this gift.</DropdownMenuItem>
                ) : (
                  people.map((person) => (
                    <DropdownMenuItem key={person.id} onSelect={() => handlePersonSelect(person, currentGiftIdea)}>
                      {person.name}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}

GiftIdeaCard.propTypes = {
  giftIdea: PropTypes.shape({
    giftIdeaName: PropTypes.string,
    giftIdeaUrl: PropTypes.string,
    giftIdeaId: PropTypes.string,
  }),
  onGiftIdeaDelete: PropTypes.func,
  onPersonSelect: PropTypes.func,
  loading: PropTypes.bool,
};
