export interface UserType {
  id?: number;
  username: string;
  email: string;
  fullname: string;
  status: boolean;
  password: string;
  role: boolean;
  avatar?: string | undefined;
  phone: string;
  carts: [];
  address: string;
}
