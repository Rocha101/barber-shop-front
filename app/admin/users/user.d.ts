export type UserT = {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  startTime: string;
  endTime: string;
  events: {
    id: number;
    title: string;
    description: string | null;
    startTime: string;
    endTime: string;
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
    totalTime: string;
  }[];
  locations: {
    id: number;
    description: string;
  }[];
};
