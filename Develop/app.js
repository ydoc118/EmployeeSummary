const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];

const questions = [
    {
        type: "list",
        message: "What type of employee is being added?",
        name: "employeeType",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    },
    {
        type: "input",
        message: "What is the Employee's name?",
        name: "empName"
    },
    {
        type: "input",
        message: "What is the Employee's id number?",
        name: "empId"
    },
    {
        type: "input",
        message: "What is the Employee's email address?",
        name: "empEmail"
    }
]

function anotherEmp(){
    inquirer.prompt({
        type: "confirm",
        message: "Add another Employee?",
        name: "another"
    }).then((response) => {
        if(response.another === true){
            employeeType()
        }else { 
            console.log(employeeArray)
            const renderedHTML = render(employeeArray);
            fs.writeFile(outputPath, renderedHTML, function(err){
                if(err){
                    return console.log(err)
                }
            })
        }
    })
}


function employeeType() {
    inquirer.prompt(questions)
    .then((answers) => {
        if(answers.employeeType === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the Employee's office number?",
                    name: "officeNumber"
                }
            ])
            .then(data => {
                var managerNumber = data.officeNumber;
                let manager = new Manager(answers.empName, answers.empId, answers.empEmail, managerNumber)
                employeeArray.push(manager)
                anotherEmp();
            })
        }
        else if(answers.employeeType === "Engineer"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the Employee's GitHub username?",
                    name: "github"
                }
            ])
            .then(data => {
                var engGithub = data.github;
                let engineer = new Engineer(answers.empName, answers.empId, answers.empEmail, engGithub)
                employeeArray.push(engineer)
                anotherEmp();
            })
        }
        else if(answers.employeeType === "Intern"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "What School did/does the Employee attend?",
                    name: "school"
                }
            ])
            .then(data => {
                var internSchool = data.school;
                let intern = new Intern(answers.empName, answers.empId, answers.empEmail, internSchool)
                employeeArray.push(intern)
                anotherEmp();
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
