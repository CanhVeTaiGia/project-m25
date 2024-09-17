import React from "react";

const Dashboard = () => {
  return (
    <div className="w-[100%] h-[100vh] bg-[#f5f5f5] p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="mt-2 text-4xl font-bold">1,200</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">New Orders</h2>
          <p className="mt-2 text-4xl font-bold">150</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="mt-2 text-4xl font-bold">$25,000</p>
        </div>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <ul className="mt-4 space-y-2">
          <li>User A registered an account</li>
          <li>Order #1234 was placed</li>
          <li>User B updated their profile</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
