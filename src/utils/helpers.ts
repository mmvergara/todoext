const generateProjectKey = (projectName: string) => {
  // Generate a project key from the project name

  // Remove all spaces and lowercase the project name
  let projectKey = projectName.replace(/\s/g, "").toLowerCase();

  const randomChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  
  
  // Add 16 random characters to the end of the project key
  projectKey += "-";
  for (let i = 0; i < 8; i++) {
    projectKey += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }  
  
  projectKey += "-";
  for (let i = 0; i < 8; i++) {
    projectKey += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  return projectKey;
};