// configuration variables and constants 

const Config = {
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
            'This program simulates the movement of an electric pool cleaner with a grid based console interface based on user-input commands.',
            
        ],
        usage: [
            'Usage: Line 1: Grid size (Lx Ly) - width and length in meters - 2 numbers seeparated by space.',
        ]
    }
}

export default Config;