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

export const addInventory = (inventory) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new Inventory Item."
        );
      }
    });
  });
};

export const editInventory = (inventory) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${inventory.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory),
    });
  });
};

export const deleteInventory = (id) => {
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
