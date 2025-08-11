entities

player
game
session

## Constraints

Global Array - numbers announced with order preserved

Player

1. Slip - 15 random numbers with spacing
2. numbers marked by player
3. numbers not marked by player

User
id uuidv4
email string
password string

Game
id uuid
created_at date with timezone
ended_at date with timezone
size number min 4 max 50

Session
id uuid
numbers-array length 27
game-id uuid() foreign key game table
user-id uuid() foreign key user table
numbers-crossed array min 0 max 90

show-number
id uuid
num number
game-id foreign key game table

claims
id uuid
user-id uuid foreign key user table
show-num-id uuid foreign key show-number table
claim-type - enum [first-line, middle-line, last-line, corners, early-five, house-1, house-2]
verified boolean default false
claim-status boolean default false

client sessions requests flow

- create game
- create user sessions
- after intervals of 10 seconds show-number is called and appended (game id in payload)
- wait for 10 seconds for claims
- send claims
