export function isLoggedIn() {
    return !!localStorage.getItem("user_id");
  }
  
  export function logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
  }
  