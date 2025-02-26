'use client';

import PropTypes from 'prop-types';
import React from 'react';

export default function ProgressRing({ progress }) {
  // Set the radius and stroke width
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke dasharray and stroke dashoffset for the progress
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex justify-center items-center">
      <svg width="120" height="120" className="transform rotate-270">
        {/* Background circle (gray ring) */}
        <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
        {/* Foreground circle (progress ring) */}
        <circle
          className="transition-all duration-500 ease-out"
          cx="60"
          cy="60"
          r={radius}
          stroke="#4CAF50" // Green color for progress, change as needed
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="absolute text-xl font-bold text-white">{progress}%</span>
    </div>
  );
}

ProgressRing.propTypes = {
  progress: PropTypes.number.isRequired,
};
