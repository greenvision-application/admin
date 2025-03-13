import { useState, useEffect } from 'react';
import { Table } from '../../../components';
import type { ActionColumn } from '../../../components';
import provinces from '../../../data/provinces.json';
import { API_URL } from '../../../config';
import {getUsers, updateUser, createUser } from '../../../services/userService';
import {getRoles} from '../../../services/roleService';
import { Role, Users } from '../../../types/Model';

// Định nghĩa interface dựa trên dữ liệu API thực tế
interface UserTable {
  id: string;
  created_at: string;
  username: string | null;
  email: string;
  preferences: string | null;
  is_active: boolean;
  address: {
    ward: string;
    district: string;
    province: string;
  } | null;
  role_id: string;
  Role: {
    id: string;
    role_name: string;
  };
}

interface UserColumn {
  key: keyof UserTable;
  title: string;
  render?: (user: UserTable) => JSX.Element;
}

const UserList: React.FC = () => {
  //update user
  const [editUser, setEditUser] = useState<any>(null);
  //roles
  const [roles, setRoles] = useState<Role[]>([]);
  //tỉnh thành
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [userData, setUserData] = useState<UserTable[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role_id: '',
    role: '',
    ward: '',
    district: '',
    province: ''
  });
  const [loading, setLoading] = useState(true);
    // Lấy danh sách roles từ API
    useEffect(() => {
      const fetchRoles = async () => {
        try {
          const rolesData = await getRoles();
          console.log("api roles",rolesData);
          setRoles(rolesData);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách roles:", error);
        }
      };
  
      fetchRoles();
    }, []);



// lấy danh sách user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();        
        console.log("data user", data);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDisable = (id: string) => {
    if (window.confirm('Bạn có chắc muốn vô hiệu hóa tài khoản này không?')) {
      setUserData(prev =>
        prev.map(user =>
          user.id === id ? { ...user, is_active: false } : user
        )
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProvince = provinces.find(p => p?.code === Number(newUser.province));
    const selectedDistrict = districts.find(d => d?.code === Number(newUser.district));
    const selectedWard = wards.find(w => w?.code === Number(newUser.ward));
  
    const userDataToSend = {
      username: newUser.username,
      email: newUser.email,
      role_id: newUser.role_id,
      address: {
        province: selectedProvince ? selectedProvince.name : "",
        district: selectedDistrict ? selectedDistrict.name : "",
        ward: selectedWard ? selectedWard.name : ""
      },
    };
  
    try {
      if (editUser) {
        // 🔥 Nếu đang chỉnh sửa, gọi API updateUser với userId
        console.log("Cập nhật user:", editUser, userDataToSend);
        const updatedUser = await updateUser(editUser, userDataToSend);
  
        // Cập nhật dữ liệu trong bảng
        setUserData(prev =>
          prev.map(user => (user.id === updatedUser.id ? updatedUser : user))
        );
      } else {
        // 🔥 Nếu đang thêm mới, gọi API createUser
        console.log("Tạo user mới:", userDataToSend);
        const response = await createUser(userDataToSend);
        const createdUser = await response.json();
        setUserData(prev => [...prev, createdUser]);
      }
  
      setShowForm(false);
      setEditUser(null); // Reset editUser sau khi cập nhật
      setNewUser({
        username: "",
        email: "",
        role_id: "",
        ward: "",
        district: "",
        province: "",
      });
    } catch (error) {
      console.error("Lỗi khi lưu user:", error);
    }
  };
  

  const userColumns: UserColumn[] = [
    {
      key: 'username',
      title: 'Tên người dùng',
      render: user => <span>{user.username || 'N/A'}</span>
    },
    { key: 'email', title: 'Email' },
    {
      key: 'address',
      title: 'Địa chỉ',
      render: user => (
        <span>
          {user.address
            ? `${user.address.ward}, ${user.address.district}, ${user.address.province}`
            : 'N/A'}
        </span>
      )
    },
    {
      key: 'Role',
      title: 'Vai trò',
      render: (user) => (
        <span>{user.Role ? user.Role.role_name : "Chưa có vai trò"}</span>
      ),
    },
    {
      key: 'is_active',
      title: 'Trạng thái',
      render: (user: UserTable) => (
        <span
          className={`rounded-full px-3 py-1 text-sm ${
            user.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {user.is_active ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    }
  ];

  const actionColumn: ActionColumn<UserTable> = {
    title: 'Hành động',
    actions: [
      {
        label: 'Vô hiệu hóa tài khoản',
        onClick: user => handleDisable(user.id),
        className: 'bg-red-400 hover:bg-red-800'
      },
      {
        label: 'Chỉnh sửa thông tin',
        onClick: user => handleEditUser(user),
        className: 'bg-red-400 hover:bg-red-800'
      }
    ]
  };

  const handleEditUser = (user: UserTable) => {
    setEditUser(user.id); // 🔥 Lưu userId để biết đang chỉnh sửa
    setShowForm(true); // Hiển thị form
  
    setNewUser({
      username: user.username || "",
      email: user.email || "",
      role_id: user.role_id || "",
      ward: user.address?.ward || "",
      district: user.address?.district || "",
      province: user.address?.province || "",
    });
  };
  
  const handleProvinceChange = (e) => {
    const provinceCode = Number(e.target.value); // Chuyển sang số
    setNewUser({ ...newUser, province: provinceCode, district: '', ward: '' });
  
    const selectedProvince = provinces.find(p => p.code === provinceCode);
    setDistricts(selectedProvince ? selectedProvince.districts : []);
    setWards([]);
  };
  

  const handleDistrictChange = (e) => {
    const districtCode = Number(e.target.value); // Chuyển sang số
    setNewUser({ ...newUser, district: districtCode, ward: '' });
  
    const selectedDistrict = districts.find(d => d.code === districtCode);
    setWards(selectedDistrict ? selectedDistrict.wards : []);
  };

  return (
    <>
      <div className="flex justify-end pt-5 pr-2 pb-0.5">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-900"
        >
          Thêm người dùng
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-lg bg-white p-6 shadow-md"
        >
          <h2 className="mb-4 text-xl font-bold">
            {editUser ? "Cập nhật người dùng" : "Thêm người dùng"}

          </h2>
          <div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Tên người dùng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newUser.username}
                onChange={e =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={e =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <select
                value={newUser.province}
                onChange={handleProvinceChange}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map(province => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Quận/Huyện <span className="text-red-500">*</span>
              </label>
              <select
                value={newUser.district}
                onChange={handleDistrictChange}
                className="w-full rounded border p-2"
                required
                disabled={!newUser.province}
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map(district => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Phường/Xã <span className="text-red-500">*</span>
              </label>
              <select
                value={newUser.ward}
                onChange={e => setNewUser({ ...newUser, ward: e.target.value })}
                className="w-full rounded border p-2"
                required
                disabled={!newUser.district}
              >
                <option value="">Chọn phường/xã</option>
                {wards.map(ward => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown chọn vai trò */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Vai trò <span className="text-red-500">*</span>
              </label>
              <select
                value={newUser.role_id}
                onChange={(e) =>{
                  console.log("Role UUID được chọn:", e.target.value);
                  setNewUser({ ...newUser, role_id: e.target.value })

                }}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn vai trò</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Lưu
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table
          data={userData}
          columns={userColumns}
          actionColumn={actionColumn}
        />
      )}
    </>
  );
};

export default UserList;
