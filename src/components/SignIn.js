import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center flex flex-col justify-center items-center border-1 border-[#7fa087] rounded-[12px] h-[200px] max-w-[400px] mx-auto p-8">
        <p className="mt-2 mb-0">Welcome to</p>
        <h1 className="font-quicksand text-[60px]">NiceList</h1>
        <p className="mb-2">Click the button below to get started</p>
        <button type="button" className="bg-[#7fa087] text-black px-4 py-2 rounded-[12px] hover:bg-[#9ad0a8] transition" onClick={signIn} style={{ borderRadius: '12px' }}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Signin;
