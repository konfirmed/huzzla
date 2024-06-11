import { useState, useEffect } from 'react';

export const useGameLogic = () => {
    const [clicks, setClicks] = useState(0);
    const [money, setMoney] = useState(0);
    const [businessStage, setBusinessStage] = useState(0);
    const [event, setEvent] = useState(null);
    const [completedMissions, setCompletedMissions] = useState([]);
    const [activeMissions, setActiveMissions] = useState([]);
    const [loans, setLoans] = useState([]);
    const [storeUpgrades, setStoreUpgrades] = useState([]);
    const [customerRating, setCustomerRating] = useState(3.0);
    const [customerFlow, setCustomerFlow] = useState(1);
    const [baseCustomerFlow, setBaseCustomerFlow] = useState(1);
    const [achievements, setAchievements] = useState([]);
    const [customerFeedback, setCustomerFeedback] = useState([]);
    const [outOfStockWarning, setOutOfStockWarning] = useState('');

    const dailyExpenses = 100;

    const businessStages = [
        {
            name: "Street Vendor",
            inventory: [
                { name: "Groundnuts", price: 20, quantity: 10, restockCost: 10 },
                { name: "Plantain Chips", price: 50, quantity: 5, restockCost: 25 },
                { name: "Suya Sticks", price: 100, quantity: 2, restockCost: 50 },
                { name: "Fried Yam", price: 30, quantity: 7, restockCost: 15 },
            ],
            upgradeCost: 1000,
            storeUpgrades: [],
        },
        {
            name: "Buka",
            inventory: [
                { name: "Jollof Rice", price: 300, quantity: 10, restockCost: 100 },
                { name: "Fried Plantain", price: 150, quantity: 10, restockCost: 50 },
                { name: "Moin Moin", price: 100, quantity: 10, restockCost: 30 },
                { name: "Pepper Soup", price: 200, quantity: 8, restockCost: 70 },
            ],
            upgradeCost: 5000,
            storeUpgrades: [
                { name: "Better Seating", cost: 2000, effect: "increaseCustomerFlow", value: 10 },
                { name: "Decor", cost: 1000, effect: "increaseCustomerSatisfaction", value: 5 },
            ],
        },
        {
            name: "Electronics Shop",
            inventory: [
                { name: "Smartphone", price: 50000, quantity: 5, restockCost: 25000 },
                { name: "Laptop", price: 100000, quantity: 3, restockCost: 50000 },
                { name: "TV", price: 80000, quantity: 4, restockCost: 40000 },
                { name: "Headphones", price: 10000, quantity: 10, restockCost: 5000 },
            ],
            upgradeCost: 100000,
            storeUpgrades: [
                { name: "Advanced Security", cost: 5000, effect: "increaseCustomerSatisfaction", value: 10 },
                { name: "Premium Display", cost: 7000, effect: "increaseCustomerFlow", value: 15 },
            ],
        },
        {
            name: "Real Estate",
            inventory: [
                { name: "Small Apartment", price: 500000, quantity: 5, restockCost: 250000 },
                { name: "Office Space", price: 1000000, quantity: 3, restockCost: 500000 },
                { name: "Shopping Complex", price: 2000000, quantity: 2, restockCost: 1000000 },
                { name: "Warehouse", price: 1500000, quantity: 3, restockCost: 750000 },
            ],
            upgradeCost: 10000000,
            storeUpgrades: [
                { name: "Luxury Amenities", cost: 20000, effect: "increaseCustomerSatisfaction", value: 20 },
                { name: "Corporate Marketing", cost: 30000, effect: "increaseCustomerFlow", value: 25 },
            ],
        }
    ];

    const missions = [
        { id: 1, description: "Sell 100 Groundnuts", goal: 100, type: "sell", item: "Groundnuts", reward: 500 },
        { id: 2, description: "Earn ₦10,000", goal: 10000, type: "earn", reward: 1000 },
        { id: 3, description: "Upgrade to Buka", goal: 1, type: "upgrade", reward: 2000 },
        { id: 4, description: "Hire 2 Employees", goal: 2, type: "hire", reward: 1500 },
    ];

    const storyline = [
        { id: 1, message: "Welcome to Lagos! Start your journey as a street vendor.", trigger: "start" },
        { id: 2, message: "Congratulations! You've upgraded to a Buka.", trigger: "upgrade", stage: "Buka" },
    ];

    const customerTypes = [
        { type: "Regular", preference: "any", satisfactionImpact: 0.1 },
        { type: "Tech-Savvy", preference: "Electronics", satisfactionImpact: 0.2 },
        { type: "Foodie", preference: "Buka", satisfactionImpact: 0.3 },
    ];

    const currentBusiness = businessStages[businessStage];
    const [inventory, setInventory] = useState(currentBusiness.inventory);

    useEffect(() => {
        setInventory(currentBusiness.inventory);
        setStoreUpgrades(currentBusiness.storeUpgrades);
        setBaseCustomerFlow(1); // Reset base customer flow to 1 on stage change
    }, [businessStage]);

    useEffect(() => {
        const interval = setInterval(() => {
            const eventChance = Math.random();
            if (eventChance < 0.1) {
                const events = [
                    {
                        type: "marketTrend",
                        message: "Holiday season! Sales are booming!",
                        effect: "increaseSales",
                        value: 20,
                        duration: 10000,
                    },
                    {
                        type: "marketTrend",
                        message: "Inflation is rising, prices are going up!",
                        effect: "increaseCosts",
                        value: 10,
                        duration: 10000,
                    },
                ];
                const randomEvent = events[Math.floor(Math.random() * events.length)];
                setEvent(randomEvent);
                setTimeout(() => setEvent(null), randomEvent.duration);
            }
        }, 10000); // Reduced frequency to avoid frequent updates

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (businessStage === 0) {
            setEvent({ message: "Welcome to Lagos! Start your journey as a street vendor.", duration: 5000 });
        } else if (businessStage === 1 && currentBusiness.name === "Buka") {
            setEvent({ message: "Congratulations! You've upgraded to a Buka.", duration: 5000 });
        }
    }, [businessStage]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMoney(prevMoney => prevMoney - dailyExpenses);
        }, 86400000); // Deduct expenses every 24 hours

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(handleCustomerFeedback, 5000); // Check for feedback every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const handleCustomerFeedback = () => {
        const feedbackChance = Math.random();
        if (feedbackChance < 0.1) {
            const customer = customerTypes[Math.floor(Math.random() * customerTypes.length)];
            const positiveFeedback = Math.random() < 0.5;
            const feedbackMessage = positiveFeedback
                ? `${customer.type} customers love your service! Rating increased.`
                : `${customer.type} customers are not happy! Rating decreased.`;
            const ratingChange = positiveFeedback ? customer.satisfactionImpact : -customer.satisfactionImpact;

            setCustomerRating(prevRating => Math.max(0, Math.min(5, prevRating + ratingChange)));

            setCustomerFeedback(prevFeedback => [
                ...prevFeedback, 
                { message: feedbackMessage, timestamp: Date.now() }
            ]);

            setEvent({
                type: "customerFeedback",
                message: feedbackMessage,
                effect: "changeRating",
                value: ratingChange,
                duration: 5000,
            });
            setTimeout(() => setEvent(null), 5000);
        }
    };

    const handleClick = (itemIndex) => {
        setInventory(prevInventory => {
            const item = prevInventory[itemIndex];
            if (item.quantity > 0) {
                setMoney(prevMoney => prevMoney + item.price * customerFlow);
                setClicks(prevClicks => prevClicks + 1);
                updateMissions("sell", item.name, 1);
                return [
                    ...prevInventory.slice(0, itemIndex),
                    { ...item, quantity: item.quantity - 1 },
                    ...prevInventory.slice(itemIndex + 1),
                ];
            } else {
                setOutOfStockWarning(`You are out of stock for ${item.name}!`);
                setTimeout(() => setOutOfStockWarning(''), 3000); // Clear warning after 3 seconds
                return prevInventory;
            }
        });
    };

    const restockItem = (itemIndex) => {
        setInventory(prevInventory => {
            const item = prevInventory[itemIndex];
            if (money >= item.restockCost) {
                setMoney(prevMoney => prevMoney - item.restockCost);
                return [
                    ...prevInventory.slice(0, itemIndex),
                    { ...item, quantity: item.quantity + 10 }, // Restock 10 units
                    ...prevInventory.slice(itemIndex + 1),
                ];
            } else {
                alert("Not enough money to restock!");
                return prevInventory;
            }
        });
    };

    const upgradeBusiness = () => {
        const cost = currentBusiness.upgradeCost;
        if (money >= cost) {
            setMoney(prevMoney => prevMoney - cost);
            setBusinessStage(prevStage => Math.min(prevStage + 1, businessStages.length - 1));
        } else {
            alert("You don't have enough money for this upgrade!");
        }
    };

    const buyStoreUpgrade = (upgrade) => {
        if (money >= upgrade.cost) {
            setMoney(prevMoney => prevMoney - upgrade.cost);
            setStoreUpgrades(prevUpgrades => [...prevUpgrades, upgrade]);

            // Apply upgrade effect immediately
            switch (upgrade.effect) {
                case "increaseCustomerFlow":
                    setCustomerFlow(prevFlow => prevFlow + upgrade.value);
                    break;
                case "increaseCustomerSatisfaction":
                    setCustomerRating(prevRating => Math.min(5, prevRating + upgrade.value / 10));
                    break;
                default:
                    break;
            }
        } else {
            alert("Not enough money for this upgrade!");
        }
    };

    const updateCustomerFlowAndRating = () => {
        let newFlow = baseCustomerFlow;
        let newRating = 3.0;
        storeUpgrades.forEach(upgrade => {
            if (upgrade.effect === "increaseCustomerFlow") {
                newFlow += upgrade.value;
            } else if (upgrade.effect === "increaseCustomerSatisfaction") {
                newRating = Math.min(5, newRating + upgrade.value / 10);
            }
        });
        setCustomerFlow(newFlow);
        setCustomerRating(newRating);
    };

    const updateMissions = (type, item, value) => {
        setActiveMissions(prevMissions =>
            prevMissions.map(mission => {
                if (mission.type === type && (!item || mission.item === item)) {
                    mission.progress = (mission.progress || 0) + value;
                    if (mission.progress >= mission.goal) {
                        setCompletedMissions(prevCompleted => [...prevCompleted, mission]);
                        setMoney(prevMoney => prevMoney + mission.reward);
                        return null;
                    }
                }
                return mission;
            }).filter(Boolean)
        );
    };

    const takeLoan = (amount, interestRate) => {
        const loan = { amount, interestRate, id: Date.now() };
        setLoans(prevLoans => [...prevLoans, loan]);
        setMoney(prevMoney => prevMoney + amount);
    };

    const repayLoan = (loanId) => {
        setLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
        setMoney(prevMoney => prevMoney - loans.find(loan => loan.id === loanId).amount);
    };

    const checkAchievements = () => {
        const newAchievements = [];

        if (money >= 50000 && !achievements.includes("Wealthy")) {
            newAchievements.push("Wealthy");
        }

        if (businessStage >= 2 && !achievements.includes("Business Mogul")) {
            newAchievements.push("Business Mogul");
        }

        if (newAchievements.length > 0) {
            setAchievements(prevAchievements => [...prevAchievements, ...newAchievements]);
            setEvent({ message: `Achievements unlocked: ${newAchievements.join(", ")}`, duration: 5000 });
        }
    };

    useEffect(() => {
        checkAchievements();
    }, [money, businessStage]);

    return {
        inventory,
        money,
        clicks,
        business: currentBusiness.name,
        handleClick,
        restockItem,
        upgradeBusiness,
        upgradeCost: currentBusiness.upgradeCost,
        event,
        completedMissions,
        activeMissions,
        takeLoan,
        repayLoan,
        loans,
        storeUpgrades,
        buyStoreUpgrade,
        customerRating,
        customerFlow,
        dailyExpenses,
        customerTypes,
        customerFeedback,
        outOfStockWarning,
    };
};
