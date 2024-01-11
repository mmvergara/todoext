import type { Timestamp } from "firebase/firestore";

export type Project = {
  projectId: string;
  projectName: string;
  projectKey: string;
  ownerId: string;
  collaborators: { [key: string]: string };
  createdAt: Timestamp;
  sections: {
    [key: string]: Section;
  };
};

export type ProjectField = {
  projectName: string;
  projectKey: string;
  ownerId: string;
  collaborators: { [key: string]: string };
  sections: {
    [key: string]: Section;
  };
  createdAt: Timestamp;
};

export type Section = {
  sectionName: string;
  tasks: {
    [key: string]: Task;
  };
  createdAt: Timestamp;
};

export type Task = {
  taskName: string;
  createdAt: Timestamp;
};
