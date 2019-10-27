import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export default function useQueryParams(values = {}) {
  let location = useLocation();
  let history = useHistory();
  const params = new URLSearchParams(location.search);
  const [queryParams, setQueryParams] = useState(values);

  const handleQueryParamsChange = values => {
    for (const key in values) {
      if (values[key] !== '' && values[key] !== undefined) {
        if (params.has(key)) {
          params.set(key, values[key]);
        } else {
          params.append(key, values[key]);
        }
      }
    }
    setQueryParams(params);
    history.push(location.pathname + '?' + params.toString());
  };

  const clearAll = () => {
    history.push(location.pathname);
  };

  return [queryParams, handleQueryParamsChange, clearAll];
}
