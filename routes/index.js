var express = require('express');
const Error = require('../model/Error');
const { createRule, combineRules, evaluateRule } = require('../controller/aspController');
var router = express.Router();

router.post('/ast/createRule',function(req,res,next){
  try{
    let ruleString = req.body.rule
    if (!ruleString) {
      return res.status(400).json({ error: 'ruleString is required' });
  }
    let result = createRule(ruleString)
    res.status(200).send(result)
  }catch(e){
    let output = new Error(
        "500","INTERNAL SERVER ERROR", "Error "
    )
    res.status(500).json(output)
  }
})
router.post('/ast/combineRules',function(req,res,next){
  try{
    let rules = req.body.rules
    if (!rules) {
      return res.status(400).json({ error: 'ruleString is required' });
  }
    let result = combineRules(rules)
    res.status(200).send(result)
  }catch(e){
    let output = new Error(
        "500","INTERNAL SERVER ERROR", "Error "
    )
    res.status(500).json(output)
  }
})
router.post('/ast/evaluateRule', (req, res) => {
  const { rule, data } = req.body;

  try {
      // Create the AST from the rule string
      const ruleAST = createRule(rule);
      
      // Evaluate the rule against the data
      const result = evaluateRule(ruleAST, data);
      
      res.json({ success: true, result });
  } catch (error) {
      res.status(400).json({ success: false, error: error.message });
  }
});
module.exports=router