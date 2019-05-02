window.antlr4 = require('./lib/antlr4/index');
window.ECMAScriptLexer = require('./lib/ECMAScriptLexer.js');
window.ECMAScriptParser = require('./lib/ECMAScriptParser.js');
// const ECMAScriptListener = require('./lib/ECMAScriptListener.js');
// const ECMAScriptVisitor = require('./lib/ECMAScriptVisitor.js');
// const PythonGenerator = require('./codegeneration/PythonGenerator.js');
// const ErrorListener = require('./codegeneration/ErrorListener.js');

const input = '{x: new Number(100)}';//input

const chars = new window.antlr4.InputStream(input);
const lexer = new window.ECMAScriptLexer.ECMAScriptLexer(chars);

lexer.strictMode = false; 

const tokens = new window.antlr4.CommonTokenStream(lexer);
const parser = new window.ECMAScriptParser.ECMAScriptParser(tokens);
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
