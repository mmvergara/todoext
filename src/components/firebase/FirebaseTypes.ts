export type Project = {
  id: string;
  projectName: string;
  ownerID: string;
};

export type ProjectField = {
  projectName: string;
  ownerID: string;
};

export type Section = {
  id: string;
  sectionName: string;
  tasks: Task[];
};

export type SectionField = {
  sectionName: string;
  tasks: TaskField[];
};

export type Task = {
  id: string;
  taskName: string;
  description: string;
  dueDate: string;
};

export type TaskField = {
  taskName: string;
  description: string;
  dueDate: string;
};
