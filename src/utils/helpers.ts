export const generateProjectKey = (projectName: string) => {
  // Generate a project key from the project name

  // Remove all spaces and lowercase the project name
  let projectKey = projectName.replace(/\s/g, "").toLowerCase();

  // Remove all non-alphanumeric characters
  projectKey = projectKey.replace(/[^a-z0-9]/g, "");
  console.log(projectKey);
  const randomChars = "abcdefghijklmnopqrstuvwxyz0123456789";

  // Add 16 random characters to the end of the project key
  for (let i = 0; i < 16; i++) {
    projectKey += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }

  // Add alphanumeric characters based on time
  const date = new Date();
  const time = date.getTime();
  for (let i = 0; i < 4; i++) {
    projectKey += randomChars.charAt(Math.floor((time / Math.pow(36, i)) % 36));
  }

  return projectKey;
};

export const generateSectionId = () => {
  let sectionId = "";
  const randomChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const date = new Date();
  const time = date.getTime();
  for (let i = 0; i < 8; i++) {
    sectionId += randomChars.charAt(Math.floor((time / Math.pow(36, i)) % 36));
  }
  return sectionId;
};

export const generateTaskId = () => {
  return generateSectionId() + new Date().getTime().toString();
};
