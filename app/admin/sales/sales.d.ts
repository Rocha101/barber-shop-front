export interface CustomerInfo {
  id: number;
  name: string;
  phone: string;
  document: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  phone: string | null;
  start_time: string;
  end_time: string;
}

export interface Order {
  id: number;
  customerInfoId: number;
  userId: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  buyerInfos: CustomerInfo[];
  products: any[];
  user: User;
}
