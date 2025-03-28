const getApiBaseUrl = (): string => {
    if (typeof window !== 'undefined') {
      return process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8010';
    }
    return 'http://localhost:8010';
  };
  
  export default getApiBaseUrl;
  