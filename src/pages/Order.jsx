import { CheckCircle, Clock, Truck, PackageCheck } from "lucide-react";
import { useState } from "react";

const steps = [
  { label: "Pending", icon: Clock },
  { label: "Processing", icon: PackageCheck },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: CheckCircle },
];

const Order = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Dummy Product Info
  const product = {
    title: "Wireless Noise-Cancelling Headphones",
    price: "$129.99",
    image: "https://via.placeholder.com/120", // Replace with real image
    address: "123 Main St, Springfield, IL 62704",
    orderId: "ORD#7864",
    date: "April 10, 2025",
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg text-white">
      {/* Product Info Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-28 h-28 object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="text-green-400 font-medium">{product.price}</p>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Shipping to:</span> {product.address}
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-semibold">Order ID:</span> {product.orderId}
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-semibold">Ordered on:</span> {product.date}
          </p>
        </div>
      </div>

      {/* Tracking Progress */}
      <div className="flex items-center justify-between relative mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="flex flex-col items-center w-full relative z-10">
              <div
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2
                  ${isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
                  ${isActive ? "bg-blue-600 border-blue-600 text-white animate-pulse" : ""}
                  ${!isCompleted && !isActive ? "bg-gray-700 border-gray-600 text-gray-400" : ""}
                  transition duration-300
                `}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm mt-2 text-center">{step.label}</span>
            </div>
          );
        })}

        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-1 bg-gray-700 z-0">
          <div
            className="h-1 bg-green-500 transition-all duration-500"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleNextStep}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default Order;
