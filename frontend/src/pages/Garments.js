import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import api from '../utils/axios';

const Garments = () => {
  const [garments, setGarments] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchGarments = async () => {
      try {
        const res = await api.get('/garments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGarments(res.data.data);
      } catch (error) {
        console.error('Error fetching garments:', error);
      }
    };

    fetchGarments();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Available Garments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {garments.map(garment => (
          <div
            key={garment._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold">{garment.name}</h3>
            <p className="text-gray-700">Type: {garment.category}</p>
            <p className="text-gray-600 text-sm mt-1">Material: {garment.material || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Garments;
