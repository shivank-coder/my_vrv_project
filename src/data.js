export const users = [
    { id: 1, name: "Shivank", role: "Admin", status: "Active" },
    { id: 2, name: "Akash", role: "Editor", status: "Inactive" },
    { id: 3, name: "Anshul", role: "Viewer", status: "Active" },
  ];
  
  export const roles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
  ];
  