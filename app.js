// app.js 
// Main app entry point

import readline from 'readline';
import FteenCleaner from './cleaner.js';
import InputHandler from './InputHandler.js';
import OutputHandler from './OutputHandler.js';

class Application{
    constructor() {
        this.read = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.inputLines = [];
        this.inputData = {}; 
    }

    async getInput(){
        for (let i = 0; i < 3; i++) {
            const line = await this.promptLine(`Line ${i + 1}: `);
            this.inputLines.push(line);
        }
    }

    // asks user for console input and return input as promise - can use await 
    promptLine(query) {
        return new Promise((resolve) => {
            this.read.question(query, (line) => {
                resolve(line);
            });
        });
    }

    parseInput() {
        const allErrors = [];
        
       // check grid first (if this fails, position validation is affected)
        try {
            this.inputData.grid = InputHandler.parseGridSize(this.inputLines[0]);
        } catch (error) {
            allErrors.push(error.message);
        }
        
        // try position parsing (depends on grid)
        try {
            this.inputData.position = InputHandler.parsePosition(this.inputLines[1], this.inputData.grid);
        } catch (error) {
            allErrors.push(...error.message.split('\n'));
        }
        
        // parse commands
        try {
            this.inputData.commands = InputHandler.parseCommands(this.inputLines[2]);
        } catch (error) {
            allErrors.push(error.message);
        }
        
        // throw collected errors if any 
        if (allErrors.length > 0) {
            throw new Error(allErrors.join('\n'));
        }
    }


    // run the application
    async run() {
        console.log(OutputHandler.header());
        console.log();  
        try {
            await this.getInput();
            this.parseInput();
            
            const cleaner = new FteenCleaner(this.inputData.grid.width, this.inputData.grid.length);
            cleaner.setInitialPosition(this.inputData.position.direction, this.inputData.position.x, this.inputData.position.y); 
            cleaner.executeCommands(this.inputData.commands);
            const status = cleaner.getStatus();
            
            console.log(OutputHandler.results(status));
            
        } catch (error) {
            console.log(OutputHandler.error(error.message));
            process.exit(1);
        } finally {
            this.read.close();
        }
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const app = new Application();
    app.run();
}
export default {FteenCleaner, InputHandler, OutputHandler, Application};