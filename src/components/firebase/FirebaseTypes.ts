import type { Timestamp } from "firebase/firestore";

export type Project = {
  projectId: string;
  projectName: string;
  ownerId: string;
  collaborators: string[];
  sections: Section[];
  createdAt: Timestamp;
};

export type ProjectField = {
  projectName: string;
  ownerId: string;
  collaborators: string[];
  sections: Section[];
  createdAt: Timestamp;
};

export type Section = {
  sectionId: string;
  sectionName: string;
  tasks: Task[];
};

export type Task = {
  taskId: string;
  taskName: string;
  description: string;
  dueDate: string;
  createdAt: Timestamp;
};
