import React from 'react';

const PlayerStats = ({ money, clicks, dailyExpenses, customerFlow, customerRating }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Player Stats</h2>
            <p>Money: ₦{money}</p>
            <p>Clicks: {clicks}</p>
            <p>Daily Expenses: ₦{dailyExpenses}</p>
            <p>Customer Flow: {customerFlow}</p>
            <p>Customer Satisfaction: {customerRating}/5</p>
        </div>
    );
};

export default PlayerStats;
