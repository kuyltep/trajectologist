export interface ICompetency {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
}

export interface ICompetencyAll extends ICompetency {
  steps: IStep[];
}

export interface IStep {
  id: string;
  is_completed: boolean;
  name: string;
  description: string;
  step_id: string;
  user_competency_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserStep {
  id: string;
  created_at: Date;
  updated_at: Date;
  is_completed: boolean;
  step_id: string;
  user_competency_id: string;
}

export interface IUserStepAll extends IUserStep {
  step: IStep;
}

export interface IUpdateUserStep {
  id: string;
  is_completed: boolean;
}

export interface IUpdateUserCompetency {
  is_completed: boolean;
  id: string;
}
