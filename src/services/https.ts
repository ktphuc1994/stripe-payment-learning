const https = (uri: string, init?: RequestInit) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(baseUrl);
  return fetch(baseUrl + uri, init);
};

export default https;
