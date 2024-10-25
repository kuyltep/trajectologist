import { ICompetency } from "./ICompetency";
import { IProfessionAllInfo } from "./IProfession";

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

export interface IGetUserData extends IGetRegisterUser {
  profession_id: string;
  profession: IProfessionAllInfo;
  user_competencies: IUserCompetency[];
}

export interface IUserCompetency {
  id: string;
  competency: ICompetency;
  competency_id: string;
  is_completed: string;
}
