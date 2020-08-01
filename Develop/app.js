const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const employeeArray = [];

const questions = [
    {
        type: "list",
        message: "What type of employee is being added?",
        name: "employee",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    },
    {
        type: "input",
        message: "What is the Employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the Employee's id number?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the Employee's email address?",
        name: "email"
    }
]

function anotherEmp(){
    inquierer.prompt({
        type: "confirm",
        message: "Add another employee?",
        name: "another"
    }).then((response) => {
        if(response === "y"){
            employeeType()
        }
    })
}


function employeeType() {
    inquirer.prompt(questions)
    .then((answers) => {
        if(answers.employee === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your Office Number?",
                    name: "number"
                }
            ])
            .then(data => {
                var managerNumber = data.number;
                console.log(managerNumber);
                employeeArray.push(new Manager(answers.name, answers.id, answers.email, managerNumber))
                console.log(employeeArray)
            })
        }
        else if(answers.employee === "Engineer"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "github"
                }
            ])
            .then(data => {
                var engGithub = data.github;
                console.log(engGithub);
                employeeArray.push(new Engineer(answers.name, answers.id, answers.email, engGithub))
                console.log(employeeArray)
            })
        }
        else if(answers.employee === "Intern"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "What School did/do you attend?",
                    name: "school"
                }
            ])
            .then(data => {
                var internSchool = data.school;
                console.log(internSchool);
                employeeArray.push(new Intern(answers.name, answers.id, answers.email, internSchool))
                console.log(employeeArray)
            })
        };
    }
)}

employeeType()


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
