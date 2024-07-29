import { useState } from "react";

function useAsync(asyncFunction) {
  // pending: 대기, error: 오류 (오류 처리는 중요함)
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = () => {
    try {
      setError(null);
      setPending(true);
    } catch (error) {}
  };
}
