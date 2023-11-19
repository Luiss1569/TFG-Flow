interface ActivityPerStatus {
  count: number;
  status: string;
}

interface ActivitiesReport {
  totalActivities: number;
  activitiesLast7Days: {
    date: string;
    count: number;
  }[];
  activitiesPerStatus: ActivityPerStatus[];
  mostActiveForm: string;
  totalActivitiesLast24Hours: number;
}

export default ActivitiesReport;
