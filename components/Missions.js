import React from 'react';

const Missions = ({ activeMissions, completedMissions }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Missions</h2>
            <div>
                <h3 className="text-md font-semibold mb-2">Active Missions</h3>
                <ul>
                    {activeMissions.length > 0 ? (
                        activeMissions.map(mission => (
                            <li key={mission.id}>
                                {mission.description}: {mission.progress}/{mission.goal}
                            </li>
                        ))
                    ) : (
                        <p>No active missions</p>
                    )}
                </ul>
            </div>
            <div>
                <h3 className="text-md font-semibold mb-2">Completed Missions</h3>
                <ul>
                    {completedMissions.length > 0 ? (
                        completedMissions.map(mission => (
                            <li key={mission.id}>
                                {mission.description}
                            </li>
                        ))
                    ) : (
                        <p>No completed missions</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Missions;
