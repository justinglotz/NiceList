import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faGift, faUsers, faListUl, faMagnifyingGlass, faScroll } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { useSearch } from '../utils/context/searchContext';
import BudgetProgressBar from './budgetProgressBar';
import { Button } from './ui/button';
import Label from './ui/label';
import { Input } from './ui/input';
import { useBudget } from '../utils/context/budgetContext';
import { createBudget, deleteBudget, getBudget, updateBudget } from '../api/budgetData';

export default function NavBar() {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const [budgetFormInput, setBudgetFormInput] = useState('');
  const { budgetAmount, setBudgetAmount } = useBudget();
  const [initialBudgetAmount, setInitialBudgetAmount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [budgetId, setBudgetId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBudget(user.uid)
      .then((data) => {
        if (data[0] && data[0].amount) {
          const { amount } = data[0];
          const { initialAmount } = data[0];
          setInitialBudgetAmount(initialAmount);
          setBudgetAmount(amount); // Use the value directly
          setBudgetId(data[0].budgetId || data[0].firebaseKey);
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
    const amount = parseInt(budgetFormInput, 10).toFixed(2);
    if (!Number.isNaN(amount)) {
      if (isEditing && budgetId) {
        // Calculate how much the initial budget has changed
        const budgetDifference = amount - initialBudgetAmount;

        // Calculate the new current budget by adding the difference to the current budgetAmount
        const newCurrentBudget = parseFloat(budgetAmount) + parseFloat(budgetDifference);

        // Update existing budget with both new initialAmount and adjusted current amount
        const payload = {
          initialAmount: amount,
          amount: newCurrentBudget.toFixed(2),
          uid: user.uid,
          budgetId,
        };
        updateBudget(payload);

        // Update state
        setInitialBudgetAmount(amount);
        setBudgetAmount(newCurrentBudget.toFixed(2));
      } else {
        // Create new budget
        const payload = {
          initialAmount: amount,
          amount,
          uid: user.uid,
        };
        createBudget(payload).then(({ name }) => {
          const patchPayload = { budgetId: name };
          updateBudget(patchPayload);
          setBudgetId(name);
        });
        setBudgetAmount(amount);
        setInitialBudgetAmount(amount);
      }
      setBudgetFormInput('');
      setDialogOpen(false);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setBudgetFormInput(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setBudgetFormInput(initialBudgetAmount); // Pre-populate with initial budget amount
    setDialogOpen(true);
  };

  const handleResetClick = () => {
    setBudgetAmount(null);
    deleteBudget(budgetId);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="px-4 py-2 text-lg bg-[#7fa087] text-black rounded opacity-0">Loading...</div>;
    }

    if (budgetAmount) {
      return (
        <div className="w-full max-w-md mx-auto border-1 border-[#7fa087] p-2 rounded-xl mb-4">
          <BudgetProgressBar initialBudget={initialBudgetAmount} currentBudget={budgetAmount} />
          <div className="flex flex-row">
            <Button variant="outline" type="button" className="px-4 mt-2 mx-auto py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded flex items-center gap-2 w-1/2" onClick={handleEditClick}>
              Edit
            </Button>
            <Button variant="outline" type="button" className="px-4 mt-2 mx-auto py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded flex items-center gap-2 w-1/2" onClick={handleResetClick}>
              Reset
            </Button>
          </div>

          {/* New budget dialog */}
          <Dialog
            open={dialogOpen && isEditing}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) setIsEditing(false);
            }}
          >
            <DialogContent>
              <form onSubmit={handleBudgetSubmit}>
                <DialogHeader>
                  <DialogTitle>Edit your budget</DialogTitle>
                  <DialogDescription>Update your total budget for Christmas gifts.</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="budget" className="sr-only">
                      Budget
                    </Label>
                    <div className="relative">
                      <span className="absolute left-[6px] top-1/2 -translate-y-1/2">$</span>
                      <Input id="budget" placeholder="0.00" className="border-1 border-grey-400 pl-8" value={budgetFormInput} onChange={handleChange} type="text" inputMode="decimal" />
                    </div>
                  </div>
                  <Button type="submit" size="sm" className="px-3 bg-[#7fa087] !rounded-[8px]">
                    Update
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      );
    }

    // New budget dialog
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="flex justify-center mt-2 sm:mt-0">
            <Button variant="outline" type="button" className="px-4 py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded mb-4">
              Add Budget
            </Button>
          </div>
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
                <div className="relative">
                  <span className="absolute left-[6px] top-1/2 -translate-y-1/2">$</span>
                  <Input id="budget" placeholder="0.00" className="border-1 border-grey-400 pl-8" value={budgetFormInput} onChange={handleChange} type="text" inputMode="decimal" />
                </div>
              </div>
              <Button type="submit" size="sm" className="px-3 bg-[#7fa087] !rounded-[8px]">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  // Create navigation content function to avoid duplication
  const renderNavigation = () => (
    <nav className="flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-[#7fa087] rounded-t-[17px] h-[60px] flex items-center">
        <div className="flex items-center justify-between w-full px-4">
          {/* Dashboard Link */}
          <div className="flex items-center gap-3">
            <Link className="nav-link text-black text-base" href="/">
              <FontAwesomeIcon icon={faSignal} className="text-black" size="lg" /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>

          {/* People Link */}
          <div className="flex items-center gap-3">
            <Link className="nav-link text-black text-base" href="/people">
              <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-black" size="lg" /> <span className="hidden sm:inline">People</span>
            </Link>
          </div>

          {/* Gifts Link */}
          <div className="flex items-center gap-3">
            <Link className="nav-link text-black text-base" href="/gifts">
              <FontAwesomeIcon icon={faGift} className="w-6 h-6 text-black" size="lg" /> <span className="hidden sm:inline">Gifts</span>
            </Link>
          </div>

          {/* Gift Ideas Link */}
          <div className="flex items-center gap-3">
            <Link className="nav-link text-black text-base" href="/gift-ideas">
              <FontAwesomeIcon icon={faListUl} className="w-6 h-6" size="lg" /> <span className="hidden sm:inline">Gift Ideas</span>
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
  );

  // Create logo content function to avoid duplication
  const renderLogo = () => (
    <div className="relative sm:w-[331px] w-4/5 h-[105px] mx-auto my-[8px] bg-[#7fa087] rounded-[17px] font-quicksand">
      <div className="p-2">
        <div className="text-black text-xl font-normal">{user.displayName}&apos;s</div>
        <div className="text-black text-7xl font-bold leading-none">NiceList</div>
      </div>
      <div className="absolute bottom-2 right-2">
        <FontAwesomeIcon icon={faScroll} size="2xl" className="text-black" />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Layout - Only shown on small screens */}
      <div className="sm:hidden">
        <div className="flex flex-row justify-end mx-3 mt-3 mb-0">
          <button type="button" className="px-4 py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded" onClick={signOut}>
            Sign Out
          </button>
        </div>

        {/* First: Logo */}
        <div className="mt-3">{renderLogo()}</div>

        {/* Second: Budget */}
        <div className="mx-auto sm:mx-3">
          <div className="mx-auto w-4/5 sm:w-full">{renderContent()}</div>
        </div>

        {/* Third: Navigation */}
        <div className="mx-3 sm:mt-3">{renderNavigation()}</div>
      </div>

      {/* Desktop Layout - Only shown on sm screens and up */}
      <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4 sm:mt-4 sm:px-4 sm:h-[105px]">
        {/* Left Column - Logo */}
        <div className="flex justify-start">{renderLogo()}</div>

        {/* Center Column - Navigation */}
        <div className="flex justify-center">
          <div className="w-[670px]">{renderNavigation()}</div>
        </div>

        {/* Right Column - Budget */}
        <div className="flex flex-row justify-between">
          <div className="mb-4 mx-auto w-4/5 sm:w-auto my-[8px] sm:my-0">{renderContent()}</div>
          <button type="button" className="px-4 py-2 h-[40px] text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
