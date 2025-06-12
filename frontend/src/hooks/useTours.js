// Example useTours.js
import { useEffect, useState } from "react";
import axios from "axios";

export function useTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => setTours(res.data))
      .catch((err) => {
        console.error("Error fetching tours:", err); // This will show in your console
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { tours, loading, error };
}