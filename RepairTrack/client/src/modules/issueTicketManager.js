import { getToken } from "./authManager";

const apiUrl = "/api/IssueTicket";

export const getIssueTicketsByInventoryId = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetByInventoryId/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Issue Tickets."
        );
      }
    });
  });
};

export const getIssueandInventoryByIssueTicketId = (id) => {
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
          "An unknown error occurred while trying to get Issue Ticket."
        );
      }
    });
  });
};
