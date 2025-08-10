import { useState } from "react";

export const useFetch = <T>(fetchFunction: () => Promise<T>, autofetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);


  try {
  } catch (error) {}
};
