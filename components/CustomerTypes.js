import React from 'react';

const CustomerTypes = ({ customerTypes }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Customer Types</h2>
            <ul>
                {customerTypes.map((type, index) => (
                    <li key={index}>
                        {type.type}: Prefers {type.preference}, Satisfaction Impact: {type.satisfactionImpact}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerTypes;
