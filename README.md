# BlockMirror
### Current working version: TestWorkingAntlr.html

#### How to set up the environment:
1. Fork from repository located here (specifically the master branch): https://github.com/sguise/BlockMirror<br>
2. Install NPM (Node Package Manager) if it is not previously installed on your machine<br>
  (The node_modules folder should not be inside the Block Mirror folder)<br>
3. At the same folder level of the repository, run these 2 commands:<br>
  npm install codemirror<br>
  npm install blockly<br>
4. Open TestWorkingAntlr.html in a web browser to view the current version of our project.


#### Inserting the Blockly and CodeMirror workspaces on the webpage:
https://developers.google.com/blockly/guides/configure/web/fixed-size
https://developers.google.com/blockly/guides/configure/web/resizable
The webpage is divided into two <td> table cells under an HTML table, which resizes in real-time when the browser window becomes resized. Blockly scripts, the workspace (where you can drag blocks around), and the toolbox (where you can drag already defined blocks from) are first defined but not displayed. The “onresize” listener function is then defined to calculate the Blockly area. Blockly is then placed over the Blockly area initially defined. This process was then duplicated to inject the CodeMirror editor on the webpage. The code between the two should be next to each other, but with the variable name “edit” in front for the CodeMirror editor. 

An issue with CodeMirror resizing to the dimensions of the browser was solved by setting the height of the .Codemirror CSS to ‘auto’ and the viewpointmargin of the JSON editor var to ‘Infinity’ (refer to lines 25 and 428 of the TestWorkingAntlr.html file respectively).

#### CodeMirror

Currently, auto-complete for Python syntax is enabled; other settings and features such as other languages and tab size can be configured in the JSON editor variable (line 422). It is possible to set up a menu through the HTML to allow users to change settings as they please and expand the usability of the text editor. Documentation of CodeMirror on the home site (https://codemirror.net) contains all necessary information of available settings, features, and what to program to enable them.

Printing Blockly’s Generated code from blocks into the CodeMirror editor
Blockly already has the function Python.workspaceToCode() that returns Python code generated from the blocks in the Blockly workspace.

#### Moving the divider between Blockly and CodeMirror
The divider between the Blockly and Codemirror sides is initially set to lie in the center of the page, but it can be clicked and dragged to any horizontal location for a more user-friendly experience. A flag is set when the mouse is pressed down on the location of the barrier, which is a constant 30px wide, independent of the total window size. Therefore, the flag is set true upon clicking on the Codemirror object within 30px of the current divider location. That flag will be reset to false when the mouse is released. If the mouse is moved while the flag is set to true, the divider is moved according to the current mouse position, such that the mouse lies in the center of the divider while dragging. This is done by changing the dragLoc variable, which ranges from 0 to slightly under 1, and calling both resize functions which incorporate dragLoc. Theoretically, the dragLoc range should go to 1 rather than slightly under, but the range was calibrated slightly by using a trial-and-error approach, since this small deviation (1.5%) is a result of the margins (dragloc is calculated by dividing the current mouse-x position by the window’s inner width). DragLoc is initially set to 1 so that the divider begins in the center, and from there the user can decide where he/she wants the divider to be.

#### XML Toolbox
The Blockly workspace is set up with a large set of blocks, coded with XML.  Using one of the Blockly examples as a reference, the XML toolbox is simply space for the user to put Blockly blocks in. The blocks are sorted by type to allow the user to easily find which block they want or need. 

#### ANTLR

ANTLR is used to generate parse trees of the contents within the CodeMirror text editor (lines 461 - 473). ANTLR will typically require Node to function properly but the implementation in our main HTML file allows ANTLR to generate the parse tree on the client side. The parsed text that is generated is not a typical parse tree for Python; it is ANTLR’s own structure and terminology.



#### Spawning Blocks
https://groups.google.com/forum/#!topic/blockly/zOBnFBul4a4
Blockly has the function <workspace>.newBlock() that allows you to add any block defined in \node_modules\blockly\blocks\ into the workspace. This only adds it the workspace data, so the workspace view still needs to update the SVG to render the newly added block.

Connecting and managing the blocks are separate functions (can be found in Blockly’s documentation). The data of what blocks exist and rendering blocks are separate sides (i.e. model and view). Connecting and rending connected blocks have not yet been implemented.

#### Preventing Feedback Loop

To prevent any changes on one side of BlockMirror triggering the other and causing a feedback loop; a flag (named ‘updating’) is set up to give control on what side can make changes. The flag is initialized to 2 (line 359) since BlockMirror triggers a change when it is initialized when the webpage is first opened; this will then change the flag to 0. When either Blockly or CodeMirror detects a change in their workspace, they will check if the flag is 0. If the flag is 0, they will set it to 1 and then change the other side to match their contents and then set the flag back to 0. There is a possibility for errors as this is a rudimentary and simple system mimicking semaphores and JavaScript is an asynchronous and single-threaded language.

#### Issues encountered:

There were two major issues in the process of developing this project; figuring out how to parse the contents of CodeMirror and create and render blocks. ANTLR typically requires Node to run the parser, so shifting the parser onto a client-side web page created some difficulty, as the goal was to not be reliant on a server that hosted anything for this project. This issue was to use Browserify the ANTLR and we were able to use ANTLR on the client side.

The other issue was learning how to create blocks in blockly through JavaScript. Initially, we had thought that the visual block and the data on the particular block were controlled by the same functions. When we consulted the Google Group for advice, we learned there is a way to “create” a new block without using XML (the one used in BlockPy). This new block was not visually represented, so we had to consult the Google Group again to ask why we could not see it. We then learned that the blocks had to be initialized and rendered with other functions as the visual representation of blocks was not controlled solely by the existence of the block’s data.

A smaller issue was solving the feedback loop that occurred when changing the contents of either workspace happened. Our solution was a rudimentary semaphore system; a single flag that would be checked when either side detected a change in their workspace and would dictate when a side had control over changing contents of the other.

