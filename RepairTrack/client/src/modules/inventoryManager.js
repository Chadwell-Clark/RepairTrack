import { getToken } from "./authManager";

const apiUrl = "/api/Inventory";

export const getAllInventory = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Inventory."
        );
      }
    });
  });
};

export const getInventoryById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetById/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Inventory Item."
        );
      }
    });
  });
};
