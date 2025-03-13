//Here we will define all the types we will use in the project
// types/Modal.ts
export interface Users {
  id: number;
  created_at: string;
  username: string;
  email: string;
  role_id: string;
  preferences: object | null;
  is_active: boolean;
  address: object | null;
  Role: Role;
}

export interface Role {
  id: string;
  role_name: string;
}

// Province dictric ward
export interface Ward {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
  wards: Ward[];
}

export interface Province {
  code: number;
  name: string;
  districts: District[];
}

  