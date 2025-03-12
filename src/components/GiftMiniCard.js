import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import dayjs from 'dayjs';
import { updateGift } from '../api/giftData';
import { useSearch } from '../utils/context/searchContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Calendar from './ui/calendar';
import { useBudget } from '../utils/context/budgetContext';
import { Badge } from './ui/badge';

import { updateBudget, getBudget } from '../api/budgetData';
import { useAuth } from '../utils/context/authContext';

export default function GiftMiniCard({ giftObj, onGiftUpdate }) {
  const [currentGiftObj, setCurrentGiftObj] = useState(giftObj);
  const { searchQuery } = useSearch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [purchaseFormInput, setPurchaseFormInput] = useState('');
  const [date, setDate] = React.useState(new Date());
  const { budgetAmount, setBudgetAmount } = useBudget();
  const { user } = useAuth();

  useEffect(() => {
    setCurrentGiftObj(giftObj); // Update local state when giftObj prop changes
  }, [giftObj]);

  const handleChange = (e) => {
    // Get the raw input value and remove any non-numeric characters except decimal point
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    setPurchaseFormInput(rawValue);
  };

  // Adjusts style for each div based on status of the gift
  const status1Style = [1, 2, 3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status2Style = [2, 3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status3Style = [3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status4Style = [4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';

  const handleClick1 = async () => {
    if (window.confirm(`Set status of ${currentGiftObj.name} to Selected?`)) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: 1,
        });
        setCurrentGiftObj(updatedGift); // Update local state immediately
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift); // Notify the parent component
        }
      } catch (error) {
        console.error('Error updating gift:', error);
        // Handle error, e.g., display an error message
      }
    }
  };

  const handleClick2 = async () => {
    if (!giftObj.price || parseFloat(giftObj.price) <= 0) {
      setDialogOpen(true);
    } else if (window.confirm(`Set status of ${currentGiftObj.name} to Purchased?`)) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: 2,
        });
        setCurrentGiftObj(updatedGift); // Update local state immediately
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift); // Notify the parent component
        }
      } catch (error) {
        console.error('Error updating gift:', error);
      }
    }
  };

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    const budgetData = await getBudget(user.uid);
    const currentBudget = budgetData[0];

    // Convert string to number
    const purchaseAmount = parseFloat(purchaseFormInput);
    const newBudgetAmount = budgetAmount - purchaseAmount;

    // Update local state
    setBudgetAmount(newBudgetAmount);

    console.log(currentBudget.budgetId);

    // Create minimal payload with only what updateBudget needs
    const payload = {
      amount: newBudgetAmount,
      budgetId: currentBudget.budgetId,
    };

    await updateBudget(payload);

    // Need to get the id of this particular budget
    if (purchaseFormInput) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: 2,
          price: purchaseAmount,
          date,
        });
        setCurrentGiftObj(updatedGift);
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift);
        }
        setPurchaseFormInput('');
        setDialogOpen(false);
      } catch (error) {
        console.error('Error updating gift:', error);
      }
    }
  };

  const handleClick3 = async () => {
    if (window.confirm(`Set status of ${currentGiftObj.name} to Arrived?`)) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: currentGiftObj.shipped === true ? 4 : 3,
        });
        setCurrentGiftObj(updatedGift); // Update local state immediately
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift); // Notify the parent component
        }
      } catch (error) {
        console.error('Error updating gift:', error);
        // Handle error, e.g., display an error message
      }
    }
  };

  const handleClick4 = async () => {
    if (window.confirm(`Set status of ${currentGiftObj.name} to Complete?`)) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: 4,
          completed: true,
        });
        setCurrentGiftObj(updatedGift); // Update local state immediately
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift); // Notify the parent component
        }
      } catch (error) {
        console.error('Error updating gift:', error);
        // Handle error, e.g., display an error message
      }
    }
  };

  const daysUntilArrival = dayjs(giftObj.date).startOf('day').diff(dayjs().startOf('day'), 'day');
  const daysUntilArrivalText = () => {
    if (daysUntilArrival === 1) return 'Arrives tomorrow';
    if (daysUntilArrival === 0) return 'Arrives today';
    if (daysUntilArrival === -1) return 'Arrived yesterday';
    if (daysUntilArrival < 0) return `Arrived ${Math.abs(daysUntilArrival)} days ago`;
    return `Arrives in ${daysUntilArrival} days`;
  };
  const getArrivalDateBackgroundColor = () => {
    if (daysUntilArrival > 10) return 'bg-[#4CAF50] text-white'; // Plenty of time (green)
    if (daysUntilArrival > 3) return 'bg-[#FFA726] text-white'; // Getting closer (orange)
    if (daysUntilArrival === 0) return 'bg-[#FF6347] text-white'; // Arrives today (tomato red)
    if (daysUntilArrival >= 0) return 'bg-[#C25B5D] text-white'; // Very soon (red)
    return 'bg-[#8B0000] text-white'; // Past due (darker red)
  };

  return (
    <>
      <div className="h-[50px] w-[285px] overflow-hidden rounded-[6px]">
        <div className="h-[25px] bg-[#E6DADA] flex flex-row justify-between">
          <p className={`mx-1 ${searchQuery.length > 0 && giftObj.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'text-red-700' : 'text-black'}`}>{giftObj.name}</p> <p className="mr-0.5">{giftObj.date && giftObj.status === 2 ? <Badge className={`${getArrivalDateBackgroundColor()} `}>{daysUntilArrivalText()}</Badge> : ''}</p>
        </div>
        <div className="h-[25px] bg-[#C25B5D] flex flex-row divide-x divide-solid divide-black">
          <div className={status1Style}>
            <button type="button" onClick={handleClick1}>
              <p className="text-white text-[12px] my-1">Selected</p>
            </button>
          </div>
          <div className={status2Style}>
            <button type="button" onClick={handleClick2}>
              <p className="text-white text-[12px] my-1">Purchased</p>
            </button>
          </div>
          <div className={status3Style}>
            <button type="button" onClick={handleClick3}>
              <p className="text-white text-[12px] my-1">Arrived</p>
            </button>
          </div>
          <div className={status4Style}>
            <button type="button" onClick={handleClick4}>
              <p className="text-white text-[12px] my-1">Complete</p>
            </button>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <form onSubmit={handlePurchaseSubmit}>
            <DialogHeader>
              <DialogTitle>Enter Purchase & Delivery Info</DialogTitle>
              <DialogDescription className="text-center">
                How much did you pay for <strong>{currentGiftObj.name}?</strong>
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-4">
              <div className="relative mx-auto">
                <span className="absolute left-[6px] top-1/2 -translate-y-1/2">$</span>
                <Input id="purchasePrice" placeholder="0.00" className="w-[258px] border-1 h-full border-gray-200 mx-auto pl-8" value={purchaseFormInput} onChange={handleChange} type="text" inputMode="decimal" />
              </div>
            </div>
            <DialogDescription className="mt-4 text-center">
              Select the <strong>estimated delivery date</strong>
            </DialogDescription>
            <div className="flex flex-col items-center">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border mx-auto" />
              <Button type="submit" className="mt-4 h-[34px] px-6 bg-[#7fa087] rounded">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

GiftMiniCard.propTypes = {
  giftObj: PropTypes.shape({
    name: PropTypes.string,
    giftId: PropTypes.string,
    status: PropTypes.number,
    shipped: PropTypes.bool,
    price: PropTypes.string,
    date: PropTypes.string,
  }),
  onGiftUpdate: PropTypes.func,
};
