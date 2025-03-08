'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import PropTypes from 'prop-types';

import cn from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

// Define icon components outside of the Calendar component
function IconLeft({ className, ...iconProps }) {
  return <ChevronLeft className={cn('size-4', className)} {...iconProps} />
}

function IconRight({ className, ...iconProps }) {
  return <ChevronRight className={cn('size-4', className)} {...iconProps} />
}

IconLeft.propTypes = {
  className: PropTypes.string,
};

IconRight.propTypes = {
  className: PropTypes.string,
};

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-4',
        caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1',
        nav_button: cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-x-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn('relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md', props.mode === 'range' ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md' : '[&:has([aria-selected])]:rounded-md'),
        day: cn(buttonVariants({ variant: 'ghost' }), 'size-8 p-0 font-normal aria-selected:opacity-100'),
        day_range_start: 'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
        day_range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
        day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
      }}
      {...props}
    />
  );
}

Calendar.propTypes = {
  /**
   * Additional class name for the calendar container
   */
  className: PropTypes.string,

  /**
   * Custom class names for DayPicker elements
   */
  classNames: PropTypes.shape({
    months: PropTypes.string,
    month: PropTypes.string,
    caption: PropTypes.string,
    caption_label: PropTypes.string,
    nav: PropTypes.string,
    nav_button: PropTypes.string,
    nav_button_previous: PropTypes.string,
    nav_button_next: PropTypes.string,
    table: PropTypes.string,
    head_row: PropTypes.string,
    head_cell: PropTypes.string,
    row: PropTypes.string,
    cell: PropTypes.string,
    day: PropTypes.string,
    day_selected: PropTypes.string,
    day_today: PropTypes.string,
    day_outside: PropTypes.string,
    day_disabled: PropTypes.string,
    day_hidden: PropTypes.string,
    day_range_start: PropTypes.string,
    day_range_end: PropTypes.string,
    day_range_middle: PropTypes.string,
  }),

  /**
   * Whether to show days from previous/next months
   */
  showOutsideDays: PropTypes.bool,

  /**
   * Selection mode ('single', 'multiple', 'range', etc.)
   */
  mode: PropTypes.string,

  /**
   * Selected day(s)
   */
  selected: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }),
  ]),

  /**
   * Day selection handler
   */
  onSelect: PropTypes.func,

  /**
   * Default selected day(s)
   */
  defaultSelected: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }),
  ]),

  /**
   * Minimum selectable date
   */
  fromDate: PropTypes.instanceOf(Date),

  /**
   * Maximum selectable date
   */
  toDate: PropTypes.instanceOf(Date),

  /**
   * Disabled dates
   */
  disabled: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.instanceOf(Date)), PropTypes.func]),

  /**
   * Initial month to display
   */
  defaultMonth: PropTypes.instanceOf(Date),

  /**
   * Number of months to display
   */
  numberOfMonths: PropTypes.number,

  /**
   * Locale for the calendar
   */
  locale: PropTypes.shape({
    locale: PropTypes.string,
    months: PropTypes.arrayOf(PropTypes.string),
    weekdays: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Calendar;
