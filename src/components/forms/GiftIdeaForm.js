'use client';

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { createGiftIdea, updateGiftIdea } from '../../api/giftIdeaData';
import { useAuth } from '../../utils/context/authContext';

export default function GiftIdeaForm({ onOptimisticAdd, onFinalRefresh }) {
  const inputRef = useRef(null);
  const [formInput, setFormInput] = useState({
    giftIdeaName: '',
    giftIdeaUrl: '',
  });
  const { user } = useAuth();
  const initialState = {
    giftIdeaName: '',
    giftIdeaUrl: '',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      uid: user.uid,
      timestamp: Date.now(),
    };

    // Optimistically add to the UI
    onOptimisticAdd(payload);

    setFormInput(initialState);
    inputRef.current?.focus();

    // Create in DB
    try {
      const { name } = await createGiftIdea(payload);
      const patchPayload = { giftIdeaId: name };
      await updateGiftIdea(patchPayload);

      // Optional: Refresh to get the actual DB state
      onFinalRefresh();
    } catch (error) {
      console.error('Error creating gift idea:', error);
    }
  };

  return (
    <div>
      <h3 className="font-quicksand text-center">Gift Ideas</h3>
      <form onSubmit={handleSubmit}>
        <div className="rounded-[17px] border border-[#7fa087] h-[80px] w-4/5 mx-auto flex flex-row">
          <div className="w-[90%] flex justify-center flex-col">
            <Input ref={inputRef} type="text" placeholder="Gift Name..." value={formInput.giftIdeaName} onChange={handleChange} className="bg-transparent border-none outline-none text-black w-full" name="giftIdeaName" required />
            <Input type="text" placeholder="Gift URL..." value={formInput.giftIdeaUrl} onChange={handleChange} className="bg-transparent border-none outline-none text-black w-full" name="giftIdeaUrl" />
          </div>
          <div className="sm:w-[10%] w-[40%] rounded-[17px] overflow-hidden flex justify-center bg-[#7fa087] hover:bg-[#6b8872]">
            <Button type="submit" className="w-full h-full bg-[#7fa087] text-black hover:bg-[#6b8872] p-0">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

GiftIdeaForm.propTypes = {
  onOptimisticAdd: PropTypes.func,
  onFinalRefresh: PropTypes.func,
};
