import React from 'react';

const ClickButton = ({ onClick, item }) => {
    return (
        <button onClick={onClick} className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold">
            Sell {item.name} (₦{item.price} each)
        </button>
    );
};

export default ClickButton;
