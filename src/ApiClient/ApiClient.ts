const API_BASE_URL = "http://localhost:4000";

function toSqlDateTime(date: Date | string): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  const pad = (n: number, width = 2) => n.toString().padStart(width, "0");

  const year = d.getUTCFullYear();
  const month = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  const hours = pad(d.getUTCHours());
  const minutes = pad(d.getUTCMinutes());
  const seconds = pad(d.getUTCSeconds());
  const milliseconds = pad(d.getUTCMilliseconds(), 3);
  const microseconds = `${milliseconds}000`;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}`;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let errorMessage = "Etwas ist schiefgelaufen";

    if (contentType && contentType.includes("application/json")) {
      const json = await response.json();
      errorMessage = json.message || errorMessage;
    } else {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }

    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return null;
};

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export { toSqlDateTime };

export async function getUserData() {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// =================== Trips ===================

export async function getAllPredefinedTrips() {
  const response = await fetch(`${API_BASE_URL}/api/trips/predefined`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function getPredefinedTripById(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/trips/predefined/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function createTripInstance(data: {
  predefinedTripId: number;
  teamId: number;
  startDate: string;
  endDate: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/trips/instances`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function getTripInstancesByTeam(teamId: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/trips/instances/team/${teamId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function getTripInstancesByUser(userId: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/trips/instances/user/${userId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function getTripInstanceById(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/trips/instances/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function updateTripDates(
  id: number,
  data: {
    startDate: string;
    endDate: string;
  }
) {
  const response = await fetch(`${API_BASE_URL}/api/trips/instances/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function addUserToTrip(tripId: number, userId: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/trips/instances/${tripId}/users/${userId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function removeUserFromTrip(tripId: number, userId: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/trips/instances/${tripId}/users/${userId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function getUsersForTrip(tripId: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/trips/instances/${tripId}/users`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

// =================== Teams ===================

export async function getAllTeams() {
  const response = await fetch(`${API_BASE_URL}/api/teams`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function getTeamById(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/teams/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function getTeamsByUserId(userId: number) {
  const response = await fetch(`${API_BASE_URL}/api/teams/user/${userId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function getUsersByTeamId(teamId: number) {
  const response = await fetch(`${API_BASE_URL}/api/teams/${teamId}/users`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function addUserToTeam(teamId: number, userId: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/teams/${teamId}/users/${userId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function removeUserFromTeam(teamId: number, userId: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/teams/${teamId}/users/${userId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

// =================== Meeting Room Instances ===================

export async function getAllPredefinedMeetingRooms() {
  const response = await fetch(
    `${API_BASE_URL}/api/meeting-room-instances/predefined`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function createMeetingRoomInstance(data: object) {
  const response = await fetch(`${API_BASE_URL}/api/meeting-room-instances`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateMeetingRoomBookingTimes(
  id: number,
  data: {
    bookingStart: string;
    bookingEnd: string;
  }
) {
  const response = await fetch(
    `${API_BASE_URL}/api/meeting-room-instances/${id}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return handleResponse(response);
}

export async function getMeetingRoomInstanceById(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/meeting-room-instances/${id}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function getMeetingRoomInstancesByTrip(tripId: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/meeting-room-instances/by-trip/${tripId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(response);
}

export async function deleteMeetingRoomInstance(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/api/meeting-room-instances/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok && response.status !== 204) {
    throw new Error("Failed to delete meeting room instance");
  }
  return;
}
