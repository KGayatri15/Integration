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
var invoiceJSON = {
    'content':{
        'name':'div',
    'invoice':{
        'name':'div',
        'class':'invoice',
    'header':{
        'name':'header',
        'h1':{
            'name':'h1',
            'textContent':'Invoice'
        },
        'address':{
            'name':'address',
            'contenteditable':'',
            'Name':{
                'name':'p',
                'textContent':'Geeta Baweja'
            }, 
            'Place':{
                'name':'p',
                'innerHTML':'Connaught Place, Delhi<br> India',
            },
            'pincode':{
                'name':'p',
                'textContent':'110001'
            },
        },
    },
    'article':{
        'name':'article',
            'h1':{
             'name':'h1',
             'textContent':'Recipient',
            },
            'address':{
            'name':'address',
            'contenteditable':'',
                'p':{
                    'name':'p',
                    'innerHTML':'Flat,House No.,Building,Company<br>Colony,Street,Sector<br>Town/City, State<br>Pincode',
                }
            },
            'meta':{
                'name':'table',
                'class':'meta',
                'tr1':{
                    'name':'tr',
                    'th':{
                        'name':'th',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'Due Date'
                        }
                    },
                    'td':{
                        'name':'td',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'9th April 2021'
                        }
                    }
                },
                'tr3':{
                    'name':'tr',
                    'th':{
                        'name':'th',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'Doc Number'
                        }
                    },
                    'td':{
                        'name':'td',
                        'span':{
                            'name':'span',
                            'id':'DocNumber',
                            'contenteditable':'',
                            'textContent':''
                        }
                    }
                },
                'tr4':{
                    'name':'tr',
                    'th':{
                        'name':'th',
                        'span':{
                            'name':'span',
                            'textContent':'Status'
                        }
                    },
                    'td':{
                        'name':'td',
                        'span':{
                            'name':'span',
                            'textContent':'Payable'
                        }
                    }
                },
            },
            'inventory':{
                'name':'table',
                'class':'inventory',
                'thead':{
                    'name':'thead',
                    'tr':{
                        'name':'tr',
                        'th1':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Description',
                            } 
                        },
                        'th2':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Amount',
                            } 
                        },
                        'th3':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Detail Type',
                            } 
                        },
                        'th4':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Ref',
                            } 
                        },
                        'th5':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Account',
                            } 
                        },
                        'th6':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Line Status',
                            } 
                        },
                    }
                },
                'tbody':{
                    'name':'tbody',
                    'id':'tbody',
                    'trCustom':{
                        'name':'tr',
                        'id':'trCustom',
                        'td1':{
                            'name':'td',
                            'a':{
                                'name':'a',
                                'id':'Custom',
                                'class':'cut',
                                'textContent':'-',
                                'data-command': `[{"command":"RemoveItem"}]`,
                            },
                            'span':{
                                'name':'span',
                                'class':'Description',
                                'contenteditable':'',
                                'textContent':'Sample Expense'
                            }
                        },
                        'td2':{
                            'name':'td',
                            'span1':{
                                'name':'span',
                                'data-prefix':'',
                                'textContent':'Rs. '
                            },
                            'span2':{
                                'name':'span',
                                'class':'Amount',
                                'contenteditable':'',
                                'textContent':'600.00'
                            }
                        },
                        'td3':{
                            'name':'td',
                            'span2':{
                                'name':'span',
                                'class':'DetailType',
                                'contenteditable':'',
                                'textContent':'Expense Detail'
                            }
                        },
                        'td4':{
                            'name':'td',
                            'span2':{
                                'name':'span',
                                'class':'Ref',
                                'contenteditable':'',
                                'textContent':'DEF234'
                            }
                        },
                        'td5':{
                            'name':'td',
                            'span':{
                                'name':'span',
                                'class':'Account',
                                'contenteditable':'',
                                'textContent':'EFG345'
                            }
                        },
                        'td6':{
                            'name':'td',
                            'span2':{
                                'name':'span',
                                'class':'LineStatus',
                                'contenteditable':'',
                                'textContent':'Billable'
                            }
                        }
                    }
                }
            },
            'add':{
                'name':'a',
                'class':'add',
                'textContent':'+',
                'data-command': `[{"command":"NewItem"}]`,
            },
        },
        'submit':{
            'name':'button',
            'full-width':'',
            'textContent':"Submit Invoice",
            'data-command': `[{"command":"SubmitInvoice"}]`,
        }
    }
    }
}