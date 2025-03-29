import React from 'react';
import PersonForm from '../../../components/forms/PersonForm';

export default function page() {
  return (
    <div className="mt-[15px]">
      <h3 className="font-quicksand text-center">New Person</h3>
      <PersonForm />
    </div>
  );
}
