import type { Timestamp } from "firebase/firestore";

export type Project = {
  projectId: string;
  projectName: string;
  projectKey:string;
  ownerId: string;
  collaborators: { [key: string]: string };
  createdAt: Timestamp;
};

export type ProjectField = {
  projectName: string;
  projectKey: string;
  ownerId: string;
  collaborators: { [key: string]: string };
  createdAt: Timestamp;
};

export type Section = {
  sectionId: string;
  sectionName: string;
  tasks: Task[];
  createdAt: Timestamp;
};

export type SectionField = {
  sectionName: string;
  tasks: Task[];
  createdAt: Timestamp;
};

export type Task = {
  taskId: string;
  taskName: string;
  createdAt: Timestamp;
};
