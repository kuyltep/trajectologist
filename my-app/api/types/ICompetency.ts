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
  step_id: string;
  user_competency_id: string;
  created_at: Date;
  updated_at: Date;
}
