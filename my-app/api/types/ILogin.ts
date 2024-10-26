import { ICompetency, IUserStep } from "./ICompetency";
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
  first_name: string;
  last_name: string;
  login: string;
}

export interface IGetUserData extends IGetRegisterUser {
  profession_id: string;
  profession: IProfessionAllInfo;
  user_competencies: IUserCompetency[];
}

export interface IUserCompetency {
  id: string;
  created_at: Date;
  updated_at: Date;
  competency: ICompetency;
  competency_id: string;
  is_completed: boolean;
}

export interface IUserCompetencyAll extends IUserCompetency {
  steps: IUserStep[];
}
