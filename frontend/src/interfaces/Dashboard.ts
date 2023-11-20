interface Status {
  name: string;
}

export interface Activity {
  id: string;
  name: string;
  matriculation: number;
  status: Status;
  created_at: string;
  masterminds?: {
    teacher: {
      user: {
        name: string;
      };
    };
  }[];
}

export interface Form {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: {
    name: string | null;
  } | null;
  formOpenPeriod?: {
    start_date: string;
    end_date: string;
  }[];
}

interface RequestAnswer {
  request_answer_id: string;
  activity: Pick<Activity, 'id' | 'name' | 'matriculation' | 'status'>;
  form: Pick<Form, 'id' | 'slug' | 'name' | 'description'| 'formOpenPeriod'>;
}

export interface RequestForm {
  request_answer_id: string;
  request_answer: RequestAnswer;
}

export interface Dashboard {
  public: Form[];
  request: RequestForm[];
  activities: Activity[];
  teacher_activities: Activity[] | null;
}