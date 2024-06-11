import React from 'react';
import Layout from '../components/Layout';
import InventoryList from '../components/InventoryList';
import PlayerStats from '../components/PlayerStats';
import EventNotification from '../components/EventNotification';
import BusinessUpgrade from '../components/BusinessUpgrade';
import StoreUpgrades from '../components/StoreUpgrades';
import Missions from '../components/Missions';
import CustomerFeedback from '../components/CustomerFeedback';
import CustomerTypes from '../components/CustomerTypes';
import { useGameLogic } from '../hooks/useGameLogic';

export default function Home() {
    const { 
        inventory, 
        money, 
        clicks, 
        business, 
        handleClick, 
        restockItem, 
        upgradeBusiness, 
        upgradeCost, 
        event, 
        storeUpgrades, 
        buyStoreUpgrade, 
        dailyExpenses, 
        customerFlow, 
        customerRating,
        activeMissions,
        completedMissions,
        customerTypes,
        customerFeedback 
    } = useGameLogic();

    return (
        <Layout>
            <div className="flex flex-col items-center gap-8 p-2 max-w-3xl mx-auto">
                <div className="text-center">
                    <p className="text-gray-500">
                        {business === "Street Vendor"
                            ? "You are a street vendor in Lagos, Nigeria."
                            : `You own a ${business} in Lagos, Nigeria.`}
                    </p>
                </div>
                <EventNotification event={event} />
                <InventoryList inventory={inventory} handleClick={handleClick} restockItem={restockItem} />
                <PlayerStats 
                    money={money} 
                    clicks={clicks} 
                    dailyExpenses={dailyExpenses} 
                    customerFlow={customerFlow} 
                    customerRating={customerRating} 
                />
                <BusinessUpgrade upgradeCost={upgradeCost} upgradeBusiness={upgradeBusiness} />
                <StoreUpgrades storeUpgrades={storeUpgrades} buyStoreUpgrade={buyStoreUpgrade} />
                <Missions activeMissions={activeMissions} completedMissions={completedMissions} />
                <CustomerFeedback customerFeedback={customerFeedback} />
                <CustomerTypes customerTypes={customerTypes} />
            </div>
        </Layout>
    );
}
