// configuration variables and constants 

const Config = {
    // If changing / adding commands or direction, update cleaner.js accordingly
    commands:{
        MOVE_FORWARD: 'A',
        TURN_LEFT: 'L',
        TURN_RIGHT: 'R'
    },
    directions:{
        NORTH: 'N',
        EAST: 'E',
        SOUTH: 'S',
        WEST: 'W'
    },
    turns: {
        left: {'N': 'W', 'W': 'S', 'S': 'E', 'E': 'N'},
        right: {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}
    },
    appInfo: {
        programmer: 'Sara Ljung',
        programName: 'Fteen 1000 Pool Cleaner Simulator',
        description: [
            'Description:',
            'This program simulates the movement of an electric pool cleaner with a grid based console interface based on user-input commands.',
            'The cleaner can move forward and turn left or right within the defined grid size.',
            'The program validates the input for grid size, initial position, and command sequence, providing error messages potential issues.'
        ],
        usage: [
            'Usage: Line 1: Grid size (Lx Ly) - width and length in meters - 2 numbers seeparated by space.',
            '       Line 2: Initial position (Direction X Y) - direction (N, E, S, W) and coordinates - 3 values separated by space.',
            '       Line 3: Command sequence - series of commands (A, L, R) without spaces. (A=move forward, L=turn left, R=turn right).',
            'Example input:',
            '5 5',
            'N 1 2',
            'LALALALAA'
        ]
    }
}

export default Config;