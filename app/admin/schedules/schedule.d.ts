export type Schedule = {
  id: number;
  customerId: number;
  userId: number;
  eventId: number;
  locationId: number;
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
  };
  services: {
    id: number;
    description: string;
    price: number;
    userId: number;
    total_time: string;
  }[];
};
