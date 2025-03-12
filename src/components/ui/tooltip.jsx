'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import PropTypes from 'prop-types'; // Import PropTypes
import cn from '@/lib/utils';

function TooltipProvider({ delayDuration = 0, ...props }) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

// Add prop-types validation for TooltipProvider
TooltipProvider.propTypes = {
  delayDuration: PropTypes.number,
};

function Tooltip({ ...props }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

// Add prop-types validation for TooltipTrigger
TooltipTrigger.propTypes = {
  children: PropTypes.node.isRequired,
};

function TooltipContent({ className, sideOffset = 0, children, ...props }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content data-slot="tooltip-content" sideOffset={sideOffset} className={cn('bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance', className)} {...props}>
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

// Add prop-types validation for TooltipContent
TooltipContent.propTypes = {
  className: PropTypes.string,
  sideOffset: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
