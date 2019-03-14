import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.ParseTree;

import java.io.IOException;

public class AntlrParser {
    public static void main (String[] args) throws IOException {
        CharStream charStream = CharStreams.fromFileName("example.py");
        Python3Lexer python3Lexer = new Python3Lexer((charStream));
        CommonTokenStream commonTokenStream  = new CommonTokenStream(python3Lexer);
        Python3Parser python3Parser = new Python3Parser(commonTokenStream);

        ParseTree parseTree = python3Parser.file_input();

        System.out.println("done");
    }
}


