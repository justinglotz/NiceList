import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faGift, faUsers, faListUl, faMagnifyingGlass, faScroll } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { useSearch } from '../utils/context/searchContext';
import BudgetProgressBar from './budgetProgressBar';
import { Button } from './ui/button';
import Label from './ui/label';
import { Input } from './ui/input';
import { useBudget } from '../utils/context/budgetContext';
import { createBudget, getBudget, updateBudget } from '../api/budgetData';

export default function NavBar() {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const [budgetFormInput, setBudgetFormInput] = useState('');
  const { budgetAmount, setBudgetAmount } = useBudget();
  const [initialBudgetAmount, setInitialBudgetAmount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getBudget(user.uid)
      .then((data) => {
        console.log('Budget data:', data);
        if (data[0] && data[0].amount) {
          const { amount } = data[0];
          const { initialAmount } = data[0];
          setInitialBudgetAmount(initialAmount);
          setBudgetAmount(amount); // Use the value directly
          console.log('Budget Amount:', initialBudgetAmount);
        } else {
          setBudgetAmount(null);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching budget:', error);
        setIsLoading(false);
      });
  }, [user.uid, setBudgetAmount]);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(budgetFormInput, 10);
    if (!Number.isNaN(amount)) {
      const payload = {
        initialAmount: amount,
        amount,
        uid: user.uid,
      };
      createBudget(payload).then(({ name }) => {
        const patchPayload = { budgetId: name };
        updateBudget(patchPayload);
      });
      setBudgetAmount(amount);
      setBudgetFormInput('');
      setDialogOpen(false);
    }
  };

  const handleChange = (e) => {
    setBudgetFormInput(e.target.value);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="px-4 py-2 text-lg bg-[#7fa087] text-black rounded opacity-0">Loading...</div>;
    }

    if (budgetAmount) {
      return <BudgetProgressBar initialBudget={initialBudgetAmount} currentBudget={budgetAmount} />;
    }

    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" type="button" className="px-4 py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded">
            Add Budget
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleBudgetSubmit}>
            <DialogHeader>
              <DialogTitle>Add a budget</DialogTitle>
              <DialogDescription>Set your total budget for Christmas gifts this year to help you stay on track.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="budget" className="sr-only">
                  Budget
                </Label>
                <Input id="budget" placeholder="$..." className="border-1 border-grey-400" value={budgetFormInput} onChange={handleChange} />
              </div>
              <Button type="submit" size="sm" className="px-3 bg-[#7fa087] !rounded-[8px]">
                Submit
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              {/* <DialogClose asChild>
                <Button type="button" variant="secondary" className='!rounded-[8px] bg-[#7fa087] text-white'>
                  Close
                </Button>
              </DialogClose> */}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="flex flex-row mt-4 items-start justify-around">
        <div className="w-[331px] h-[105px] bg-[#7fa087] rounded-[17px] relative left-4 font-quicksand">
          <div className="p-2">
            <div className="text-black text-xl font-normal">{user.displayName}&apos;s</div>
            <div className="text-black text-7xl font-bold leading-none">NiceList</div>
          </div>
          <div className="absolute bottom-2 right-2">
            <FontAwesomeIcon icon={faScroll} size="2xl" className="text-black" />
          </div>
        </div>

        <div className="flex">
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
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-black w-full" />
              </div>
            </nav>
          </div>
        </div>

        {/* Budget Section */}
        <div>{renderContent()}</div>

        <div>
          <button type="button" className="px-4 py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
  );
}
