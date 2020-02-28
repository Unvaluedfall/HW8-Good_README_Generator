const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");

const fsWriteFile = util.promisify(fs.writeFile)







function userPrompt(){
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
   console.log(user.data)

   const {login, avatar_url, email} = user.data
   console.log(login + "\n" + avatar_url + "\n" + email)
})

}

function asdas(){

}


async function init(){
    try{

    const prompt = await userPrompt()

    const profile = await getProfile(prompt)

    // const readMe = await userReadMe()

    } catch(error){
        console.log(error);
    }
    
    
}
init()