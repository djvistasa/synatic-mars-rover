# Rover project

To start project run the following:

`yarn && yarn start`

To change commands, edit the src/inputs/index.txt file, all while ensuring the structure stays the same

## Assumptions

- Format of txt file will never change
- Format of data in txt file will never change

## Approach

Took a functional approach with the idea that each function should be as clear and dry as possible. Also decided to add an error state which tells mission control when the rover is out of bounds.
