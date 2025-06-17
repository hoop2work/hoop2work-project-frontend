const API_BASE_URL = "http://localhost:4000";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Fetching failed");
  }
  return response.json();
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getUserData() {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function getAllPredefinedMeetingRooms() {
  const response = await fetch(`${API_BASE_URL}/api/predefined-meetingrooms`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function getPredefinedMeetingRoomById(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/predefined-meetingrooms/${id}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function getAllPredefinedTrips() {
  const response = await fetch(`${API_BASE_URL}/api/predefined-trips`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function getPredefinedTripById(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/predefined-trips/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
