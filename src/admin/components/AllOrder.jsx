import React, { useState } from 'react';

const AllOrder = () => {
  // Initial state with some example orders
  const [orders, setOrders] = useState([
    { id: 1, status: 'Pending', customerName: 'John Doe', orderDate: '2024-12-01' },
    { id: 2, status: 'Shipped', customerName: 'Jane Smith', orderDate: '2024-11-30', trackingNumber: 'TRACK12345' },
  ]);

  // Function to update the status of an order
  const updateOrderStatus = (id, status) => {
    setOrders(orders.map((order) => order.id === id ? { ...order, status } : order));
  };

  // Function to handle tracking of the order
  const handleTrackOrder = (trackingNumber) => {
    if (trackingNumber) {
      alert(`Tracking order with number: ${trackingNumber}`);
    } else {
      alert('No tracking number available for this order');
    }
  };

  // Function to delete an order
  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Orders Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Order #{order.id}</h3>
            <p className="text-sm text-gray-600 mb-2"><strong>Customer:</strong> {order.customerName}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Status:</strong> {order.status}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Order Date:</strong> {order.orderDate}</p>
            {order.trackingNumber && (
              <p className="text-sm text-gray-600 mb-4"><strong>Tracking Number:</strong> {order.trackingNumber}</p>
            )}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleTrackOrder(order.trackingNumber)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
              >
                Track Order
              </button>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="border border-gray-300 rounded p-2 text-sm w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrder;
