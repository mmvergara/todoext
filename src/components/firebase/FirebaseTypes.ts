export type Project = {
  id: string;
  title: string;
  sections: Section[];
  ownerID: string;
  collaborators: string[];
};

export type ProjectField = {
  title: string;
  sections: SectionField[];
  ownerID: string;
  collaborators: string[];
};

export type Section = {
  id: string;
  title: string;
  tasks: Task[];
};

export type SectionField = {
  title: string;
  tasks: TaskField[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
};

export type TaskField = {
  title: string;
  description: string;
  dueDate: string;
};
