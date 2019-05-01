const antlr4 = require('antlr4/index');
const ECMAScriptLexer = require('./lib/ECMAScriptLexer.js');
const ECMAScriptParser = require('./lib/ECMAScriptParser.js');
// const ECMAScriptListener = require('./lib/ECMAScriptListener.js');
// const ECMAScriptVisitor = require('./lib/ECMAScriptVisitor.js');
// const PythonGenerator = require('./codegeneration/PythonGenerator.js');
// const ErrorListener = require('./codegeneration/ErrorListener.js');

const input = '{x: new Number(100)}';//input

const chars = new antlr4.InputStream(input);
const lexer = new ECMAScriptLexer.ECMAScriptLexer(chars);

lexer.strictMode = false; 

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ECMAScriptParser.ECMAScriptParser(tokens);
// const listener = new ErrorListener();
// const visitor = new ECMAScriptVisitor.ECMAScriptVisitor();
// const plistener = new ECMAScriptListener.ECMAScriptListener();


// parser.removeErrorListeners(); // Remove default ConsoleErrorListener
// parser.addErrorListener(listener); // Add custom error listener

console.log('JavaScript input:');
console.log(input);
console.log('output:');

try {
  tree = parser.program();
  
  console.log(tree.toStringTree(this,parser));
  

} catch (error) {
  console.log(error);
}
