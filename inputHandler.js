
import Config from './config.js';

class InputHandler {
    static parseGridSize(line) {
        const input = line.split(' ');
        if (input.length !== 2) {
            throw new Error(`Invalid grid size format: "${line}". Two numbers separated by a space expected.`);
        }
        const width = parseInt(input[0]);
        const length = parseInt(input[1]);
        if (isNaN(width) || isNaN(length) || width <= 0 || length <= 0) {
            throw new Error(`Invalid grid dimensions: "${line}". Both width and length must be positive numbers.`);
        }
        return {width, length};
    }

    static parsePosition(line, grid) {
        const errors = [];
        const parts = line.trim().split(" ");
        const validDirections = Object.values(Config.directions);
        
        if (parts.length !== 3) {
            throw new Error(`Invalid position format: "${line}". Expected a direction ${validDirections.join(', ')} and two coordinates (X Y).`);
        }

        const direction = parts[0].toUpperCase();
        const x = parseInt(parts[1]);
        const y = parseInt(parts[2]);

        // collect all position-related errors
        if (!validDirections.includes(direction)) {
            errors.push(`Invalid direction: "${parts[0]}" in "${line}". Valid directions are ${validDirections.join(', ')}.`);
        }

        if (isNaN(x) || isNaN(y)) {
            errors.push(`Invalid coordinates in position: "${line}". Coordinates must be numbers.`);
        } else if (grid && (x < 0 || x > grid.width || y < 0 || y > grid.length)) {
            errors.push(`Position out of bounds: (${x}, ${y}). Grid size is (${grid.width}, ${grid.length}).`);
        }
        
        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
        
        return { direction, x, y };
    }

    static parseCommands(line) {
        const commands = line.trim().toUpperCase();
        const validCommands = Object.values(Config.commands);

        if (commands.length === 0) {
            throw new Error('No commands provided');
        }
        
        // collect invalid commands if any
        const invalidCommands = [...new Set([...commands].filter(cmd => !validCommands.includes(cmd)))];
        
        if (invalidCommands.length > 0) {
            throw new Error(`Invalid command(s) found: "${invalidCommands.join(', ')}" in command sequence "${commands}". Valid commands are ${validCommands.join(', ')}. No spaces allowed.`);
        }
        
        return commands;
    }
}

export default InputHandler;