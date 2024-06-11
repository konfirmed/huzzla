import React from 'react';

const InventoryList = ({ inventory, handleClick, restockItem, outOfStockWarning }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Inventory</h2>
            {outOfStockWarning && (
                <p className="text-red-500 mb-2">{outOfStockWarning}</p>
            )}
            <ul className="space-y-2">
                {inventory.map((item, index) => (
                    <li key={item.name} className="flex justify-between items-center">
                        <span>{item.name} ({item.quantity} available)</span>
                        <div>
                            <button onClick={() => handleClick(index)} className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold mr-2">
                                Sell (₦{item.price} each)
                            </button>
                            <button onClick={() => restockItem(index)} className="bg-green-500 text-white rounded-lg px-4 py-2 font-semibold">
                                Restock (₦{item.restockCost})
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;
