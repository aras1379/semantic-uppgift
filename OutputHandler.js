// OutputHandler.js
// Handles all output formatting and display 

import Config from './config.js';

class OutputHandler{
    static header(){
        const info = Config.appInfo;
        return [
            `Programmer: ${info.programmer}`,
            `Program: ${info.programName}`,
            ...info.description,
            ...info.usage
        ].join('\n');
    }

    static results(status){
        return `Result: ${status}`;
    }

    static error(message) {
        if (message.includes('\n')) {
            return message.split('\n').map(msg => `Error: ${msg}`).join('\n');
        }
        return `Error: ${message}`;
    }
}

export default OutputHandler;