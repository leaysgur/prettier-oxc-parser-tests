// Small TSX file for benchmarking
import React from 'react';

export const Button = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};