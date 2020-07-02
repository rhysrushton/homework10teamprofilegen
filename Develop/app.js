const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//This is an ampty array. 
//The instances of the employees we are adding will be pushed here. 
//This array will then be used in the render function. 
employees = []; 

//All of the below are the inquirer questions that will be 
//referenced in the different functions. 

//This is an a 'confirm' type inquirer question. 
//This will give a Y/N option which will be useful to 
//choose when we want to stop/continue adding team memebers. 
const addTeam = [
    {
        type: "confirm", 
        name: "addMember", 
        message: "Would you like to add a team member?"
    }
]

//These are the choices given when the user is adding team members. 
const choices = [
    {
        type: "list",
        name: "choice",
        message: "Which employee type do you wish to add? Or are you finished?",
        choices: [
            "Engineer",
            "Intern",  
        ]
    }
]

//Inquirer for Intern 
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the intern's id?"
    },

    {
        type: "input",
        name: "school",
        message: "What is the intern's school?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
    },
]

//Inquirer for engineer
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the engineer's id?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the engineer's email?"
    },

    {
        type: "input",
        name: "github",
        message: "What is the engineer's github?"
    },
]

//Enquirer for Manager 
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the manager's id?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
    },

    {
        type: "input",
        name: "officeNumber",
        message: "What is the phone manager's number?"
    },
]

//function for intern
//uses the employee class and extends it
function newIntern(intern){
    const { name, id, school, email } = intern;
    const currentIntern = new Intern(name, id, school, email); 
    //console.log("Intern =", intern)
    employees.push(currentIntern);
    create(); 
}

//function for engineer
//uses the employee class and extends it
function newEngineer(engineer){
        const {name, id, email, github} = engineer; 
        const currentEngineer = new Engineer(name, id, email, github);
        //console.log("Engineer =", engineer)
        employees.push(currentEngineer);
        create()
    }

//function for manager. Then calls the async choice function.
//uses the employee class and extends it
    inquirer.prompt(managerQuestions).then((manager)=>{
        const {name, id, email, officeNumber} = manager; 
        const currentManager = new Manager (name, id, email, officeNumber)
       // console.log("Manager =", manager)
        employees.push(currentManager);
        create();   
    })

//This function first gets the inquirer function that 
//ask if we want to add a team member. 
//If yes then it will then call the one that gives us 
//the choice of engineer or intern. 
//If no it will call the render html function. 
async function create() {
    const confirm = await inquirer.prompt(addTeam);
    if (confirm.addMember){
        console.log("yes")
        const employeeChosen = await inquirer.prompt(choices);
        switch(employeeChosen.choice){
            case "Engineer":
            const engineer = await inquirer.prompt(engineerQuestions);
            newEngineer(engineer); 
            console.log("E")
            break; 
            case "Intern":
                const intern = await inquirer.prompt(internQuestions);
                newIntern(intern); 
            console.log("I")
            break; 
        }
    } else {
       const htmlRender = render(employees)
       makePage(htmlRender); 
       console.log(employees);
    } 
}

//This creates the html page
function makePage(htmlRender){
    fs.writeFile(outputPath, htmlRender, (err) => {
        if (err) throw err; 
        console.log("File done")
    })
}



