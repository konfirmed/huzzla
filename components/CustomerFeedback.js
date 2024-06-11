import React from 'react';

const CustomerFeedback = ({ customerFeedback }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Customer Feedback</h2>
            {customerFeedback.length > 0 ? (
                <ul>
                    {customerFeedback.map((feedback, index) => (
                        <li key={index}>
                            {feedback.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recent feedback</p>
            )}
        </div>
    );
};

export default CustomerFeedback;
