async function request(url = "", method = "GET") {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export { request };
