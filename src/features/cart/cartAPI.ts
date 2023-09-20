// A mock function to mimic making an async request for data
//TODO: create cart getter from firebase
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
