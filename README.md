# Zeotap-Rule Engine with AST


1) create_rule(rule_string):
Payload:
{
    "rule": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience >5)"
}
response:
{
    "type": "operator",
    "value": "AND",
    "left": {
        "type": "operator",
        "value": "OR",
        "left": {
            "type": "operator",
            "value": "AND",
            "left": {
                "type": "operand",
                "value": "age > 30",
                "left": null,
                "right": null
            },
            "right": {
                "type": "operand",
                "value": "department = 'Sales'",
                "left": null,
                "right": null
            }
        },
        "right": {
            "type": "operator",
            "value": "AND",
            "left": {
                "type": "operand",
                "value": "age < 25",
                "left": null,
                "right": null
            },
            "right": {
                "type": "operand",
                "value": "department = 'Marketing'",
                "left": null,
                "right": null
            }
        }
    },
    "right": {
        "type": "operator",
        "value": "OR",
        "left": {
            "type": "operand",
            "value": "salary > 50000",
            "left": null,
            "right": null
        },
        "right": {
            "type": "operand",
            "value": "experience >5",
            "left": null,
            "right": null
        }
    }
}


2)combine_rules(rules):
Payload: {
    "rules": [
        "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience >  5)",
        "((age > 30 AND department = 'Marketing')) AND (salary >20000 OR experience > 5)"
    ]
}

Response:
{
    "type": "operator",
    "value": "AND",
    "left": {
        "type": "operator",
        "value": "AND",
        "left": {
            "type": "operator",
            "value": "OR",
            "left": {
                "type": "operator",
                "value": "AND",
                "left": {
                    "type": "operand",
                    "value": "age > 30",
                    "left": null,
                    "right": null
                },
                "right": {
                    "type": "operand",
                    "value": "department = 'Sales'",
                    "left": null,
                    "right": null
                }
            },
            "right": {
                "type": "operator",
                "value": "AND",
                "left": {
                    "type": "operand",
                    "value": "age < 25",
                    "left": null,
                    "right": null
                },
                "right": {
                    "type": "operand",
                    "value": "department = 'Marketing'",
                    "left": null,
                    "right": null
                }
            }
        },
        "right": {
            "type": "operator",
            "value": "OR",
            "left": {
                "type": "operand",
                "value": "salary > 50000",
                "left": null,
                "right": null
            },
            "right": {
                "type": "operand",
                "value": "experience >  5",
                "left": null,
                "right": null
            }
        }
    },
    "right": {
        "type": "operator",
        "value": "AND",
        "left": {
            "type": "operator",
            "value": "AND",
            "left": {
                "type": "operand",
                "value": "age > 30",
                "left": null,
                "right": null
            },
            "right": {
                "type": "operand",
                "value": "department = 'Marketing'",
                "left": null,
                "right": null
            }
        },
        "right": {
            "type": "operator",
            "value": "OR",
            "left": {
                "type": "operand",
                "value": "salary >20000",
                "left": null,
                "right": null
            },
            "right": {
                "type": "operand",
                "value": "experience > 5",
                "left": null,
                "right": null
            }
        }
    }
}

3)evaluate_rule:

Payload: {
    "rule": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience >5)",
    "data" : {"age": 35,"department": "Sales", "salary": 60000, "experience": 3}
}
Response :
{
    "success": true,
    "result": true
}
