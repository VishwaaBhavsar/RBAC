import { useCallback, useEffect, useState } from 'react';

import { getApiErrorMessage } from '../api/axios.js';

export default function usePolicies(fetcher) {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPolicies = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetcher();
      setPolicies(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to load policies'));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    loadPolicies();
  }, [loadPolicies]);

  return {
    policies,
    setPolicies,
    loading,
    error,
    reload: loadPolicies,
  };
}
