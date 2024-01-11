# Todoext (Beta)

Lightweight clone of todoist.com

## Features

- ✅ Super Fast
- ❌ Project/Board Collaboration

## Installation

- clone project
- go to /src/components/firebase/Firebase.ts and add your firebase config
-
-
-
-
-

```
npm install
npm run dev
```

### Data Model

```ts
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
```
