const https = (uri: string, init?: RequestInit) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(baseUrl + uri, init);
};

export default https;
