# Online Calculator
A JavaScript (+CSS +HTML) calculator app.

## Specification
- should be able to: add, subtract, multiply and divide
- avoid using eval() as per MDN recommendation
- should have buttons for all digits
- should have a display which will be populated depending on user input
- evaluate each pair of numbers at a time, 12 + 7 - 5 * 3 = should yield 42
- round answers with long decimals
- consider problems that can arise if user presses = before entering all operands
- display an error message if user divides by zero
- potentially add a floating point number input

## Project Plan
- [ ] figure out the layout with figma + find a decent color palette
- [ ] create small prototypes for your ideas:
    - a function that takes user string and puts out a modified string (several 0000 get ignored, multiple dots in one number get ignored)
    - parse a string as though it's a stack with pop and push methods
    - find a way to deal with very long numbers
- [ ] structure the HTML
- [ ] mobile first CSS
- [ ] connect the JS logic to the visuals

