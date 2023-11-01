interface AnsweredField {
  id: string;
  label: string;
  value: string;
}

export interface RequestAnswer {
  id: string;
  userRequestAnswers: {
    answer_id: string;
    user: {
      name: string;
      email: string;
    };
    answered: AnsweredField[];
  }[];
}

export interface ActivityDetails {
  id: string;
  name: string;
  matriculation: number;
  status_id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  answered: AnsweredField[];
  status: {
    id: string;
    name: string;
  };
  users: {
    id: string;
    name: string;
    email: string;
    matriculation: string;
  };
  masterminds: {
    assigned_at: string;
    teacher: {
      id: string;
      university_degree: string;
      user: {
        id: string;
        name: string;
        email: string;
      };
    };
  }[];
  activityWorkflow: {
    id: string;
    workflow: {
      id: string;
      status: {
        name: string;
      };
    };
    activityworkflowSteps: {
      id: string;
      status: string;
      created_at: string;
      requestAnswers: RequestAnswer[];
      step: {
        id: string;
        name: string;
        type: string;
      };
    }[];
  }[];
}
