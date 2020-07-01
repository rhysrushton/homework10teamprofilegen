const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//Inquirer Question for Type of EMployee. 

//This is the array that will take the value from the inquirer 
employees = []; 

const addTeam = [
    {
        type: "confirm", 
        name: "addMember", 
        message: "Would you like to add a team member?"
    }
]

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
        message: "What is the name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the id?"
    },

    {
        type: "input",
        name: "school",
        message: "What is the school?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the email?"
    },
]

//Inquirer for engineer
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the id?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the email?"
    },

    {
        type: "input",
        name: "git",
        message: "What is the engineer github?"
    },
]

//Enquirer for Manager 
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the id?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the email?"
    },

    {
        type: "input",
        name: "number",
        message: "What is the phone number?"
    },
]

//function for intern
function newIntern(){
    const { name, id, school, email } = intern;
    console.log("Intern =", intern)
    employees.push(intern);
}

//function for engineer
function newEngineer(){
        const {name, id, email, git} = engineer; 
        console.log("Engineer =", engineer)
        employees.push(engineer);
    }


//function for manager. Then calls the async choice function.
    inquirer.prompt(managerQuestions).then((manager)=>{
        const {name, id, email, number} = manager; 
        console.log("Manager =", manager)
        employees.push(manager);
        create();   
    })


async function create() {
    const confirm = await inquirer.prompt(addTeam);
    if (confirm.addMember){
        console.log("yes")
    } else console.log("no")
 
}



