const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3500";

async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let headers: HeadersInit = { ...options.headers };
  if (!(options.body instanceof FormData)) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: headers,
  });
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {}
    throw new Error(
      errorData?.message ||
        response.statusText ||
        `HTTP error! status: ${response.status}`
    );
  }
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export default apiClient;
