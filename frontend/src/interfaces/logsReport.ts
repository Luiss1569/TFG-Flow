export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LogReport {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  function: string;
}

interface LogsData {
  totalLogs: number;
  logsReports: LogReport[];
  usersMap: Record<string, User>;
}

export default LogsData;