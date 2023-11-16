export type Priority = 'auto' | 'high' | 'medium' | 'low';
export type Progress = 'notStarted' | 'inProgress' | 'done';

export interface Todo {
  id: string;
  displayOrder: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  priority: Priority;
  progress: Progress;
  deadline: string;
  notificationSettings: {
    date: string;
    location: string;
  };
}
