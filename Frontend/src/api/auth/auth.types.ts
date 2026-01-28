export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  status: string;
  data: {
    user: {
      id: string;
      token: string;
      name: string;
      email: string;
    };
  };
};

export type LoginResponse = {
  status: string;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type ResetPasswordResponse = {
  message: string;
};
