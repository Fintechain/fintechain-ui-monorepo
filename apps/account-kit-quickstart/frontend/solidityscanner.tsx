'use client';

import React from 'react';

const SolidityScanner: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Solidity Contract Scanner</h2>
        <textarea 
          className="w-full h-64 p-2 border rounded"
          placeholder="Paste your Solidity contract code here..."
          style={{
            backgroundColor: '#fff',
            color: '#0c2d48',
            border: '1px solid #2e8bc0'
          }}
        />
        <button
          className="w-full"
          style={{
            color: "#fff",
            fontSize: "15px",
            backgroundColor: "#0c2d48",
            border: "1px solid #fff",
            borderRadius: "0.25rem",
            padding: "0.3rem 0.6rem",
          }}
        >
          Scan Contract
        </button>
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold mb-2">Scan Results</h3>
          <p className="text-sm">Results will appear here after scanning...</p>
        </div>
      </div>
    </div>
  );
};

export default SolidityScanner; 