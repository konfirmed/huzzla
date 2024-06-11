import React from 'react';

const BusinessUpgrade = ({ upgradeCost, upgradeBusiness }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Upgrade Business</h2>
            <button onClick={upgradeBusiness} className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold">
                Upgrade Business (₦{upgradeCost})
            </button>
        </div>
    );
};

export default BusinessUpgrade;
