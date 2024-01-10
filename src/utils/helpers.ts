const generateProjectKey = (projectName: string) => {
  // Generate a project key from the project name

  // Remove all spaces and lowercase the project name
  let projectKey = projectName.replace(/\s/g, "").toLowerCase();

  // Add 8 random characters to the end of the project key
  projectKey += "-";
  const randomChars = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 8; i++) {
    projectKey += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  return projectKey;
};