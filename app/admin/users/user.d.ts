export type UserT = {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  start_time: string;
  end_time: string;
  events: {
    id: number;
    title: string;
    description: string | null;
    start_time: string;
    end_time: string;
    userId: number;
    customerId: number;
    serviceId: number;
    scheduleId: number;
  }[];
  services: {
    id: number;
    description: string;
    price: number;
    userId: number;
    total_time: string;
  }[];
  locations: {
    id: number;
    description: string;
  }[];
};
