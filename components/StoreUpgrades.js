import React from 'react';

const StoreUpgrades = ({ storeUpgrades, buyStoreUpgrade }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Store Upgrades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storeUpgrades.length > 0 ? (
                    storeUpgrades.map((upgrade, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition"
                            onClick={() => buyStoreUpgrade(upgrade)}
                        >
                            <h3 className="text-lg font-semibold mb-2">{upgrade.name}</h3>
                            <p className="text-gray-500 mb-2">Cost: ₦{upgrade.cost}</p>
                            <p className="text-gray-500">
                                Effect: {upgrade.effect === 'increaseCustomerFlow' ? 'Increase Customer Flow' : 'Increase Customer Satisfaction'} by {upgrade.value}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No upgrades available</p>
                )}
            </div>
        </div>
    );
};

export default StoreUpgrades;
