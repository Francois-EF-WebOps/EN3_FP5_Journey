
import React from 'react';

const WarningBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 shadow-sm rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <i className="fa-solid fa-triangle-exclamation text-amber-500 text-xl"></i>
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-800 font-bold uppercase tracking-wider">Safety Protocol Required</p>
          <p className="text-sm text-amber-700 mt-1">
            48V systems can cause severe burns, fire, and property damage. Never work on live terminals. 
            Ensure a fire extinguisher (Class C/D) is accessible at all times.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningBanner;
