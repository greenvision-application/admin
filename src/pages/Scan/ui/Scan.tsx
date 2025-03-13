// // import React from 'react';

// // const Scan = () => {
// //   return <div>Scan</div>;
// // };

// // export default Scan;

// import { useEffect, useState } from "react";
// import { getUsers } from "../../../servives/userService";
// import { Users } from "../../../types/Model";


// const UserList = () => {
//   const [users, setUsers] = useState<Users[]>([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const data = await getUsers();
//         setUsers(data);
//       } catch (error) {
//         console.error("Lỗi khi lấy danh sách users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (users.length === 0) {
//     return <div>Loading...</div>;
//   }
//   if (users.length > 0) {
//     console.log("users", users[0].username);
//   }

//   return (
//     <div>
//       <h2>Danh sách người dùng</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.username} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

import { useEffect, useState } from "react";
import { getRoles } from "../../../services/roleService";
import { Role } from "../../../types/Model";

const RoleList = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách roles:", error);
      }
    };

    fetchRoles();
  }, []);

  if (roles.length === 0) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <h2>Danh sách vai trò</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>{role.role_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;