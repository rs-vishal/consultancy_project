import React ,{useState,useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios"
const productData = [
  { name: 'Rexnord Cooling Fan', sold: 	180 },
  { name: "Analog 11 Pin Electric Timer", sold: 150 },
  { name: "Exposing Machine", sold: 75 },
  { name: "Mild Steel Back Curved Fan", sold: 200 },
  { name: "Infared Lamp", sold: 130 },
  { name: "Mild Steel Flash Curer Machine", sold: 95 },
  { name: "Mild Steel Solid State Relay", sold: 160},



];

const fetchContactMessages = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/contact");
    return response.data;
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
};

const Dashboard = () => {
  const [contactMessages, setContactMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchContactMessages();
      setContactMessages(data);
    };
    loadMessages();
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Clients Seen</h2>
          <p className="text-3xl font-bold text-blue-600">135</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Items Sold</h2>
          <p className="text-3xl font-bold text-green-600">500</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
          <p className="text-3xl font-bold text-purple-600">20</p>
        </div>
      </div>

      {/* Line Graph */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Products Sold Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sold" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Contact Info Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Messages</h2>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {contactMessages.map((msg) => (
              <tr key={msg._id}>
                <td className="border border-gray-300 px-4 py-2">{msg.name}</td>
                <td className="border border-gray-300 px-4 py-2">{msg.email}</td>
                <td className="border border-gray-300 px-4 py-2">{msg.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
