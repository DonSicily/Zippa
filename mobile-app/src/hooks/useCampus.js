import { useState, useEffect } from 'react';
import { api } from '../services/api';

// Hook to fetch available campuses and their pickup points
export const useCampuses = () => {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        // Assuming we add a public route for campuses in the backend
        const response = await api.get('/campuses'); 
        setCampuses(response.data.data || response.data);
      } catch (err) {
        setError(err.message);
        // Fallback mock data if API isn't ready yet
        setCampuses([
          { _id: '1', name: 'University of Lagos (UNILAG)', location: { city: 'Lagos', state: 'Lagos' } },
          { _id: '2', name: 'Obafemi Awolowo University (OAU)', location: { city: 'Ile-Ife', state: 'Osun' } },
          { _id: '3', name: 'Yaba College of Technology', location: { city: 'Lagos', state: 'Lagos' } },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  return { campuses, loading, error };
};

// Hook to get a specific campus by ID (useful for checkout)
export const useCampusById = (campusId) => {
  const [campus, setCampus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!campusId) return;
    
    const fetchCampus = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/campuses/${campusId}`);
        setCampus(response.data.data || response.data);
      } catch (err) {
        console.error('Failed to fetch campus:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampus();
  }, [campusId]);

  return { campus, loading };
};
