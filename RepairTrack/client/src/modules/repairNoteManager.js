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
