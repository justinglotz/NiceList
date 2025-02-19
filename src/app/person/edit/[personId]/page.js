'use client';

import React, { useEffect, useState } from 'react';
import { getSinglePerson } from '@/api/personData';
import PersonForm from '@/components/forms/PersonForm';
import PropTypes from 'prop-types';

export default function EditPerson({ params }) {
  const [editItem, setEditItem] = useState({});
  const { personId } = params;

  useEffect(() => {
    getSinglePerson(personId).then(setEditItem);
  }, [personId]);

  return <PersonForm obj={editItem} />;
}

EditPerson.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
