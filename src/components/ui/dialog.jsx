'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import PropTypes from 'prop-types';

import cn from '@/lib/utils';

function Dialog({ ...props }) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

Dialog.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  modal: PropTypes.bool,
};

function DialogTrigger({ ...props }) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

DialogTrigger.propTypes = {
  children: PropTypes.node,
  asChild: PropTypes.bool,
};

function DialogPortal({ ...props }) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

DialogPortal.propTypes = {
  children: PropTypes.node,
};

function DialogClose({ ...props }) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

DialogClose.propTypes = {
  children: PropTypes.node,
  asChild: PropTypes.bool,
};

function DialogOverlay({ className, ...props }) {
  return <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80', className)} {...props} />;
}

DialogOverlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  asChild: PropTypes.bool,
};

function DialogContent({ className, children, ...props }) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content data-slot="dialog-content" className={cn('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className)} {...props}>
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

DialogContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  asChild: PropTypes.bool,
  onOpenAutoFocus: PropTypes.func,
  onCloseAutoFocus: PropTypes.func,
  onEscapeKeyDown: PropTypes.func,
  onPointerDownOutside: PropTypes.func,
  onInteractOutside: PropTypes.func,
  forceMount: PropTypes.bool,
};

function DialogHeader({ className, ...props }) {
  return <div data-slot="dialog-header" className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />;
}

DialogHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function DialogFooter({ className, ...props }) {
  return <div data-slot="dialog-footer" className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />;
}

DialogFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function DialogTitle({ className, ...props }) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn('text-lg leading-none font-semibold', className)} {...props} />;
}

DialogTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  asChild: PropTypes.bool,
};

function DialogDescription({ className, ...props }) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

DialogDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  asChild: PropTypes.bool,
};

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
