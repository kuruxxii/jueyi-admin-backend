export type Topic =
  | "个人成长"
  | "商业财经"
  | "科技前沿"
  | "人文社科"
  | "职场专题"
  | "校园学习专题";

export type Article = {
  slug: string;
  title: string;
  coverUrl: string;
  introduction: string;
  author: string;
  read: number;
  topic: Topic;
  origin: string;
  content: string;
};

export type Admin = {
  username: string;
  password: string;
};

export type User = {
  email: string;
  number: string;
  subscription: {
    isActive: boolean;
    startDate: Date;
    endDate: Date;
  };
};
