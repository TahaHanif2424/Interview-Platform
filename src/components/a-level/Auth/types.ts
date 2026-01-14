export type Signup = {
  email: string;
  password: string;
  name: string;
  type: 'COMPANY' | 'USER';
};

export type Login = {
  email: string;
  password: string;
};
