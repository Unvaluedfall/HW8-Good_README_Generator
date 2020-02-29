const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");

const fsWriteFile = util.promisify(fs.writeFile)





function ProfilePrompt(){
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your github username?"
          }
    ])  
}

function userReadMe(){
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Title of your Readme!"
          },
        {
            type: "input",
            name: "description",
            message: "Description Of your Readme!"
          },
        {
            type: "input",
            name: "tableOfContents",
            message: "Whats the Table of Contents"
          },
        {
            type: "input",
            name: "installation",
            message: "Installation"
          },
        {
            type: "input",
            name: "usage",
            message: "Usage"
          },
        {
            type: "input",
            name: "license",
            message: "license",
          },
        {
            type: "input",
            name: "contributing",
            message: "Contribution"
          },
        {
            type: "input",
            name: "tests",
            message: "tests"
          },
        {
            type: "input",
            name: "questions",
            message: "questions"
          }
    ])  
}

function getProfile(answer){
   return axios.get(`https://api.github.com/users/${answer.name}`).then(function(user){
  //  console.log(user.data)

   const {login, avatar_url} = user.data
  //  console.log(login + "\n" + avatar_url)
  return login,avatar_url
  })
}

function getRepos(answer){
  return axios.get(`https://api.github.com/users/${answer.name}/repos`).then(function(user){
    user.data.forEach(repo => {
    
      const {} = repo
      console.log(repo)
    
    });
  })
}

function writeTXT(repo, readme, profile){
  console.log(repo)
  console.log(profile)
  console.log(readme)
  return ` 

    Title
    ${repo.data.title}
    
    
    Description
    Table of Contents
    Installation
    Usage
    License
    Contributing
    Tests
    Questions


    Profile
    ${profile.avatar_url}${profile.login}
  `
  
}

// function writeTxtFile(content){
//   return fsWriteFile("")
// }


async function init(){
    try{

    const promptProfile = await new ProfilePrompt()

    const readmePrompt = await userReadMe()

    const profileGet = await getProfile(promptProfile)
    
    const repoGet = await getRepos(promptProfile)
    
    
    
    const writeTxt = await writeTXT(repoGet, readmePrompt, profileGet)

      const txtFs = await WriteTxtFile(writeTxt)

    } catch(error){
        console.log(error);
    }
    
    
}
init()