interface AnswerFile {
  url: string;
  name: string;
  mimeType: string;
  type: string;
}

interface AnsweredField {
  id: string;
  label: string;
  value: string | AnswerFile;
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
  matriculation: string;
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
      data: string | { [key: string]: string };
      requestAnswers: RequestAnswer[];
      step: {
        id: string;
        name: string;
        type: string;
      };
    }[];
  }[];
}

interface User {
  id: string;
  name: string;
  cpf: string;
  matriculation: string;
}

interface Mastermind {
  activity_id: string;
  teacher_id: string;
  assigned_at: string;
  created_at: string;
  updated_at: string;
}

interface ActivityWorkflow {
  id: string;
  activity_id: string;
  workflow_id: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  name: string;
  matriculation: number;
  users: User;
  masterminds: Mastermind[];
  activityWorkflow: ActivityWorkflow[];
  status: {
    id: string;
    name: string;
  };
}

interface ActivityResponse {
  activities: Activity[];
  total: number;
  nextPage: number | null;
  page: number;
}

export default ActivityResponse;
