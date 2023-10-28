interface RequestAnswer {
  activity: {
    id: string;
    matriculation: number;
    name: string;
  };
}

export interface Form {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: {
    name: string | null;
  } | null;
  requestAnswers?: RequestAnswer[];
  formOpenPeriod: {
    start_date: string;
    end_date: string;
  }[];
}

export interface Dashboard {
  public: Form[];
  request: Form[];
}