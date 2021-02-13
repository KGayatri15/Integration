var states = {
    "0.":"start",
    "shunya":"wait"
}
var actionflowSample = {
        actionSteps:[
            {
            actionStepIndex:15,
            method:checkUserExists,
            state:states["shunya"],
            },
            {
            actionStepIndex:16,
            method:alertAboutSignUp,
            state:states["0."],
            condition:{
                completedActionSteps:[1],
            },
            fromPrevious:{
                exist:1
            }
             }
        ]
}
function checkUserExists(){}
function alertAboutSignUp(){}
var sample = {
    "quiz": {
        "sport": {
            "q1": {
                "question": "Which one is correct team name in NBA?",
                "options": [
                    "New York Bulls",
                    "Los Angeles Kings",
                    "Golden State Warriros",
                    "Huston Rocket"
                ],
                "answer": "Huston Rocket"
            }
        },
        "maths": {
            "q1": {
                "question": "5 + 7 = ?",
                "options": [
                    "10",
                    "11",
                    "12",
                    "13"
                ],
                "answer": "12"
            },
            "q2": {
                "question": "12 - 8 = ?",
                "options": [ "1", "2", "3", "4"],
                "answer": "4"
            }
        }
    }
}
var schema1 = {
    definitions: {
        hobby: {
            type: "object",
            properties: {
                name: { type: "string" },
                durationInMonth: { type: "integer" },
            }
        }
    },
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName" ],
    properties: {
        firstName: {
            type: "string",
            title: "First name"
        },
        lastName: {
            type: "string",
            title: "Last name"
        },
        age: {
            type: "integer",
            title: "Age",
        },
        bio: {
            type: "string",
            title: "Bio",
        },
        country: {
            type: "string",
            title: "Country"
        },
        state: {
            type: "string",
            title: "State"
        },
        zip: {
            type: "string",
            title: "ZIP"
        },
        password: {
            type: "string",
            title: "Password",
            minLength: 3
        },
        telephone: {
            type: "string",
            title: "Telephone",
            minLength: 10
        },
        work: { "$ref": "#/definitions/hobby" },
        hobbies: {
            type: "array",
            items: { "$ref": "#/definitions/hobby" }
        }
    }

}

var schema2 = {
    "schema": {
        "message": {
            "input": "string",
            "label": "Message"
        },
        "author": {
            "type": "object",
            "label": "Author",
            "properties": {
                "name": {
                    "input": "string",
                    "label": "Name"
                },
                "gender": {
                    "label": "Gender",
                    "select": "string",
                    "option": [
                        "male",
                        "female",
                        "alien"
                    ],
                    "span": "Your gender"
                },
                "magic": {
                    "input": "integer",
                    "label": "Magic number",
                    "default": 42
                }
            }
        }
    }
}