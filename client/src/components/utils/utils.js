async function request(url = "", method = "GET") {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

let currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export { request, currency };
