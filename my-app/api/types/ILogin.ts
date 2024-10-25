export interface ILogin {
  login: string;
  password: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}

export interface IGetRegisterUser {
  id: string;
  firstName: string;
  lastName: string;
  login: string;
}
