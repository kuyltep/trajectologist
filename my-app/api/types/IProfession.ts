import { ICompetency } from "./ICompetency";

export interface IProfession {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  salary: number;
}

export interface IProfessionAllInfo extends IProfession {
  competencies: ICompetency[];
}
