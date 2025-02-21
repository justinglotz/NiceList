import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faGift, faUsers, faListUl, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="w-[670px]">
          {/* Main Navigation */}
          <nav className="flex flex-col">
            {/* Top Navigation Bar */}
            <div className="bg-[#7fa087] rounded-t-[17px] h-[60px] flex items-center">
              <div className="flex items-center justify-between w-full px-4">
                {/* Dashboard Link */}
                <div className="flex items-center gap-3">
                  <Link className="nav-link text-black text-base" href="/">
                    <FontAwesomeIcon icon={faSignal} className="text-black" size="lg" /> Dashboard
                  </Link>
                </div>

                {/* Gifts Link */}
                <div className="flex items-center gap-3">
                  <Link className="nav-link text-black text-base" href="/gifts">
                    <FontAwesomeIcon icon={faGift} className="w-6 h-6 text-black" size="lg" /> Gifts
                  </Link>
                </div>

                {/* People Link */}
                <div className="flex items-center gap-3">
                  <Link className="nav-link text-black text-base" href="/people">
                    <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-black" size="lg" /> People
                  </Link>
                </div>

                {/* Gift Ideas Link */}
                <div className="flex items-center gap-3">
                  <Link className="nav-link text-black text-base" href="/gift-ideas">
                    <FontAwesomeIcon icon={faListUl} className="w-6 h-6" size="lg" /> Gift Ideas
                  </Link>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center bg-[#FDF6F6] h-[45px] rounded-b-[17px] border border-[#7fa087] p-3">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400 mr-3" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-black w-full" />
            </div>
          </nav>

          {/* Sign Out Button */}
        </div>
      </div>
      <div className="absolute top-4 right-4 mt-1">
        <button type="button" className="px-4 py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </>
  );
}
