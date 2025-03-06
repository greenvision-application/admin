import { useState } from 'react';
import { Table } from '../../../components';
import type { ActionColumn } from '../../../components';

interface UserTable {
  id: number;
  created_at: string;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  preferences: string;
  is_active: boolean;
  address: string;
  Notification: string;
  role_id: number;
  User_Plant: string;
}

interface UserColumn {
  key: keyof UserTable;
  title: string;
  render?: (user: UserTable) => JSX.Element;
}

const initialUserData: UserTable[] = [
  {
    id: 1,
    created_at: '2024-01-20',
    username: 'user1',
    email: 'user1@example.com',
    phone_number: '0123456789',
    role: 'user',
    preferences: 'default',
    is_active: true,
    address: 'Hà Nội',
    Notification: 'enabled',
    role_id: 1,
    User_Plant: 'Lúa'
  },
  {
    id: 2,
    created_at: '2024-01-21',
    username: 'user2',
    email: 'user2@example.com',
    phone_number: '0987654321',
    role: 'admin',
    preferences: 'custom',
    is_active: true,
    address: 'Hồ Chí Minh',
    Notification: 'disabled',
    role_id: 2,
    User_Plant: 'Ngô'
  }
];

const UserList: React.FC = () => {
  const [userData, setUserData] = useState<UserTable[]>(initialUserData);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    phone_number: '',
    role: '',
    address: ''
  });

  const handleDisable = (id: number) => {
    if (window.confirm('Bạn có chắc muốn vô hiệu hóa tài khoản này không?')) {
      setUserData(prev =>
        prev.map(user =>
          user.id === id ? { ...user, is_active: false } : user
        )
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserData: UserTable = {
      id: userData.length + 1,
      created_at: new Date().toISOString().split('T')[0],
      ...newUser,
      preferences: 'default',
      is_active: true,
      Notification: 'enabled',
      role_id: 1,
      User_Plant: ''
    };
    setUserData(prev => [...prev, newUserData]);
    setShowForm(false);
    setNewUser({
      username: '',
      email: '',
      phone_number: '',
      role: '',
      address: ''
    });
  };

  const userColumns: UserColumn[] = [
    { key: 'username', title: 'Tên người dùng' },
    { key: 'email', title: 'Email' },
    { key: 'phone_number', title: 'Số điện thoại' },
    { key: 'role', title: 'Vai trò' },
    { key: 'address', title: 'Địa chỉ' },
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
      }
    ]
  };

  return (
    <>
      <div className="flex justify-end pt-5 pr-2 pb-0.5">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-900"
        >
          Thêm người dùng{' '}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-lg bg-white p-6 shadow-md"
        >
          <h2 className="mb-4 text-xl font-bold">Thêm người dùng mới</h2>
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
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={newUser.phone_number}
                onChange={e =>
                  setNewUser({ ...newUser, phone_number: e.target.value })
                }
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Vai trò <span className="text-red-500">*</span>
              </label>
              <select
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn vai trò</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newUser.address}
                onChange={e =>
                  setNewUser({ ...newUser, address: e.target.value })
                }
                className="w-full rounded border p-2"
                required
              />
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

      <Table
        data={userData}
        columns={userColumns}
        actionColumn={actionColumn}
      />
    </>
  );
};

export default UserList;
