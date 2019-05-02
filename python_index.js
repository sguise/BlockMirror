window.antlr4 = require('./lib/antlr4/index');
window.Python3Lexer = require('./lib/Python/Python3Lexer.js');
window.Python3Parser = require('./lib/Python/Python3Parser.js');
// const ECMAScriptListener = require('./lib/ECMAScriptListener.js');
// const ECMAScriptVisitor = require('./lib/ECMAScriptVisitor.js');
// const PythonGenerator = require('./codegeneration/PythonGenerator.js');
// const ErrorListener = require('./codegeneration/ErrorListener.js');

const input = 'for x in y:\n  if z:\n    a = 2+"Hello"';//input

const chars = new window.antlr4.InputStream(input);
const lexer = new window.Python3Lexer.Python3Lexer(chars);

lexer.strictMode = false; 

const tokens = new window.antlr4.CommonTokenStream(lexer);
const parser = new window.Python3Parser.Python3Parser(tokens);
// const listener = new ErrorListener();
// const visitor = new ECMAScriptVisitor.ECMAScriptVisitor();
// const plistener = new ECMAScriptListener.ECMAScriptListener();


// parser.removeErrorListeners(); // Remove default ConsoleErrorListener
// parser.addErrorListener(listener); // Add custom error listener

console.log('Python input:');
console.log(input);
console.log('output:');

try {
  tree = parser.file_input();
  
  console.log(tree.toStringTree(this,parser));
  

} catch (error) {
  console.log(error);
}
