import { getToken } from "./authManager";

const apiUrl = "/api/userProfile";

export const getAllUsers = () => {
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
        throw new Error("An unknown error occurred while trying to get Users.");
      }
    });
  });
};

export const getUserById = (id) => {
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
          "An unknown error occurred while trying to get User Profile."
        );
      }
    });
  });
};

export const getCurrentUserType = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetCurrentUserType`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get User Type."
        );
      }
    });
  });
};

export const deactivateUser = (user) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/DeactivateUser/${user.id}`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // .then((resp) => {
    //   if (resp.ok) {
    //     return resp.json();
    //   } else {
    //     throw new Error(
    //       "An unknown error occurred while trying to get User Type."
    //     );
    //   }
    // });
  });
};

export const getDeactivatedUsers = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/Deactivated`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Deactivated Users."
        );
      }
    });
  });
};
