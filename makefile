bundle_ecma:
	browserify ecma_index.js -o build/ecma_bundle.js
bundle_python:
	browserify python_index.js -o build/python_bundle.js
build_python_parser:
	java -jar antlr4.jar -o lib/Python/ -lib grammars/ -Dlanguage=JavaScript grammars/Python3.g4
	sed -i "s/'antlr4\/index'/'..\/..\/lib\/antlr4\/index'/" lib/Python/Python3Parser.js
	sed -i "s/'antlr4\/index'/'..\/..\/lib\/antlr4\/index'/" lib/Python/Python3Parser.js
	#sed -i "s/'./Python3Listener'/'..\/..\/lib\/Python/Python3Listener'/" lib/Python/Python3Parser.js
	sed -i "s/'antlr4\/index'/'..\/..\/lib\/antlr4\/index'/" lib/Python/Python3Lexer.js
	sed -i "s/'antlr4\/Token'/'..\/..\/lib\/antlr4\/Token'/" lib/Python/Python3Lexer.js
	sed -i "s/'antlr4\/index'/'..\/..\/lib\/antlr4\/index'/" lib/Python/Python3Listener.js