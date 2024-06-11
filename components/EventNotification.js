import React from 'react';

const EventNotification = ({ event }) => {
    if (!event) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Event: </strong>
            <span className="block sm:inline">{event.message}</span>
        </div>
    );
};

export default EventNotification;
