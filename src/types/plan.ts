export type Plan = {
  id: string;
  userId: string;
  prompt: string;
  createdAt: Date;
  schedule: {
    day: string;
    subjects: { time: string; subject: string; done?: boolean }[];
  }[];
};
