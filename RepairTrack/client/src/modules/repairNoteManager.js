import { getToken } from "./authManager";

const apiUrl = "/api/RepairNote";

export const getRepairNotesByIssueTicketId = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetByIssueTicketId/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Repair Notes."
        );
      }
    });
  });
};

export const getRepairNoteById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Repair Note."
        );
      }
    });
  });
};

export const getRepairNote = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetRepairNote/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Repair Note."
        );
      }
    });
  });
};

export const addRepairNote = (repairNote) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(repairNote),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new Repair Note."
        );
      }
    });
  });
};

export const editRepairNote = (repairNote) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${repairNote.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(repairNote),
    });
  });
};

export const deleteRepairNote = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  });
};
