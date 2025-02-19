'use client';

import React, { useEffect, useState } from 'react';
import { getSingleGift } from '@/api/giftData';
import GiftForm from '@/components/forms/GiftForm';
import PropTypes from 'prop-types';

export default function EditGift({ params }) {
  const [editItem, setEditItem] = useState({});
  const { giftId } = params;

  useEffect(() => {
    getSingleGift(giftId).then(setEditItem);
  }, [giftId]);

  return <GiftForm obj={editItem} />;
}

EditGift.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
