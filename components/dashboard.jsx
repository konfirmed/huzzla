import { useState } from "react"

export default function Dashboard() {
  const [clicks, setClicks] = useState(0)
  const [money, setMoney] = useState(0)
  const [business, setBusiness] = useState("streetVendor")
  const [inventory, setInventory] = useState([
    { name: "Groundnuts", price: 20, quantity: 0 },
    { name: "Plantain Chips", price: 50, quantity: 0 },
    { name: "Suya Sticks", price: 100, quantity: 0 },
  ])
  const handleClick = () => {
    setClicks(clicks + 1)
    setMoney(money + inventory[0].price)
    setInventory((prevInventory) => [
      ...prevInventory.slice(0, 1),
      { ...prevInventory[0], quantity: prevInventory[0].quantity + 1 },
      ...prevInventory.slice(1),
    ])
  }
  const buyUpgrade = (upgrade) => {
    const cost = upgrade.cost
    if (money >= cost) {
      setMoney(money - cost)
      setBusiness(upgrade.name)
      setInventory(upgrade.inventory)
    } else {
      alert("You dont have enough money for this upgrade!")
    }
  }
  const upgrades = [
    {
      name: "Buka",
      cost: 1000,
      inventory: [
        { name: "Jollof Rice", price: 300, quantity: 0 },
        { name: "Fried Plantain", price: 150, quantity: 0 },
        { name: "Moin", price: 100, quantity: 0 },
      ],
    },
    {
      name: "Electronics Shop",
      cost: 5000,
      inventory: [
        { name: "Smartphone", price: 50000, quantity: 0 },
        { name: "Laptop", price: 100000, quantity: 0 },
        { name: "TV", price: 80000, quantity: 0 },
      ],
    },
  ]
  return (
    (<div className="flex flex-col items-center gap-8 p-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Lagos Hustle</h1>
        <p className="text-gray-500">
          {business === "streetVendor"
            ? "You are a street vendor in Lagos, Nigeria."
            : `You own a ${business} in Lagos, Nigeria.`}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Inventory</h2>
          <ul className="space-y-2">
            {inventory.map((item) => (
              <li key={item.name} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span>
                  {item.quantity} (₦{item.price} each)
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">
            {business === "streetVendor" ? "Sell Groundnuts" : `Sell ${inventory[0].name}`}
          </h2>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center">
              <button
                onClick={handleClick}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold">
                Click to Sell
              </button>
            </div>
            <p className="text-center mt-2">
              You have made {clicks} sale{clicks !== 1 ? "s" : ""}
            </p>
          </div>
          <p className="text-gray-500">Money: ₦{money}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 w-full">
        <h2 className="text-lg font-semibold mb-4">Upgrade Business</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upgrades.map((upgrade) => (
            <div
              key={upgrade.name}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer"
              onClick={() => buyUpgrade(upgrade)}>
              <h3 className="text-lg font-semibold mb-2">{upgrade.name}</h3>
              <p className="text-gray-500 mb-2">Cost: ₦{upgrade.cost}</p>
              <ul className="space-y-2">
                {upgrade.inventory.map((item) => (
                  <li key={item.name} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>₦{item.price} each</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 w-full">
        <h2 className="text-lg font-semibold mb-4">Challenges</h2>
        <p className="text-gray-500">Watch out for traffic jams and power outages that can slow down your business!</p>
      </div>
    </div>)
  );
}
