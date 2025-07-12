// this was a wonderful oppurtunity tru for learning js, big thanks to pianoman and other helpers. I owe this to you thanks!
// can't guarantee it to be top notch but it'll be fun!
let value = 0;        // memory cell
let output = "";      // stores output
let heroes = {};      // var
let functions = {};   // functions
let callStack = [];   // track func

function runPercyLang() {
    const code = document.getElementById('codeInput').value;
    const outputElement = document.getElementById('output');
    
    // reset everything for a fresh run
    value = 0;
    output = "";
    heroes = {};
    functions = {};
    callStack = [];
    
    try {
        interpretPercyLang(code);
        outputElement.textContent = output || "Quest completed successfully! The gods are pleased.";
    } catch (error) {
        let errorMessage = "⚠️ Divine Error: " + error.message;
        
        if (callStack.length > 0) {
            errorMessage += `\nIn quest: ${callStack[callStack.length - 1]}`;
        }
        
        errorMessage += "\n\nCheck your Trident syntax and try again, brave hero.";
        outputElement.textContent = errorMessage;
    }
}

// takes the user's code and runs it line by line
function interpretPercyLang(code) {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let i = 0;
    
    while (i < lines.length) {
        const line = lines[i];
        i = executeCommand(line, lines, i);
    }
}

// executes individual commands
function executeCommand(command, allLines, currentIndex) {
    const cmd = command.toLowerCase().trim();
    
    // basic program control
    if (cmd === "summon poseidon") {
        value = 0;
        return currentIndex + 1;
    }
    
    if (cmd === "offer drachma") {
        return allLines.length; 
    }
    
    // basic arithmetic operations
    if (cmd === "call athena") {
        value++;
        return currentIndex + 1;
    }
    
    if (cmd === "curse hades") {
        value--;
        return currentIndex + 1;
    }
    
    if (cmd === "summon minotaur") {
        value *= 2;
        return currentIndex + 1;
    }
    
    if (cmd === "split hydra") {
        if (value === 0) {
            throw new Error("Cannot divide by zero! The Hydra cannot be split into nothing.");
        }
        value = Math.floor(value / 2);
        return currentIndex + 1;
    }
    
    // advanced mathumat
    if (cmd.startsWith("divide by ")) {
        const divisor = parseInt(cmd.substring(10).trim());
        if (isNaN(divisor)) {
            throw new Error("Invalid divisor in divide command: " + command);
        }
        if (divisor === 0) {
            throw new Error("Cannot divide by zero! The gods forbid such madness.");
        }
        value = Math.floor(value / divisor);
        return currentIndex + 1;
    }
    
    if (cmd.startsWith("multiply by ")) {
        const multiplier = parseInt(cmd.substring(12).trim());
        if (isNaN(multiplier)) {
            throw new Error("Invalid multiplier in multiply command: " + command);
        }
        value *= multiplier;
        return currentIndex + 1;
    }
    
    if (cmd.startsWith("add ")) {
        const addend = parseInt(cmd.substring(4).trim());
        if (isNaN(addend)) {
            throw new Error("Invalid number in add command: " + command);
        }
        value += addend;
        return currentIndex + 1;
    }
    
    if (cmd.startsWith("subtract ")) {
        const subtrahend = parseInt(cmd.substring(9).trim());
        if (isNaN(subtrahend)) {
            throw new Error("Invalid number in subtract command: " + command);
        }
        value -= subtrahend;
        return currentIndex + 1;
    }
    
    // output command
    if (cmd === "print prophecy") {
        output += value + "\n";
        return currentIndex + 1;
    }
    
    // variable system
    if (cmd.startsWith("create hero ")) {
        const heroName = cmd.substring(12).trim();
        if (!heroName) {
            throw new Error("Hero name cannot be empty! Every hero needs a name.");
        }
        if (heroes.hasOwnProperty(heroName)) {
            throw new Error(`Hero '${heroName}' already exists! Choose a different name.`);
        }
        heroes[heroName] = 0;
        return currentIndex + 1;
    }
    
    if (cmd.startsWith("give hero ")) {
        const parts = cmd.substring(10).trim().split(" ");
        if (parts.length < 2) {
            throw new Error("Give hero command requires both hero name and value!");
        }
        const heroName = parts[0];
        const heroValue = parseInt(parts[1]);
        if (isNaN(heroValue)) {
            throw new Error(`Invalid value '${parts[1]}' for hero ${heroName}. Must be a number.`);
        }
        if (!heroes.hasOwnProperty(heroName)) {
            throw new Error(`Hero '${heroName}' does not exist! Create the hero first.`);
        }
        heroes[heroName] = heroValue;
        return currentIndex + 1;
    }
    
    if (cmd.startsWith("save hero ")) {
        const heroName = cmd.substring(10).trim();
        if (!heroName) {
            throw new Error("Hero name cannot be empty!");
        }
        if (!heroes.hasOwnProperty(heroName)) {
            throw new Error(`Hero '${heroName}' does not exist! Create the hero first.`);
        }
        heroes[heroName] = value;
        return currentIndex + 1;
    }
    
    if (cmd.startsWith("use hero ")) {
        const heroName = cmd.substring(9).trim();
        if (!heroes.hasOwnProperty(heroName)) {
            throw new Error(`Hero '${heroName}' does not exist! Create the hero first.`);
        }
        value = heroes[heroName];
        return currentIndex + 1;
    }
    
    // function system (quests)
    if (cmd.startsWith("teach quest ")) {
        const questName = cmd.substring(12).trim();
        if (!questName) {
            throw new Error("Quest name cannot be empty!");
        }
        
        const functionEnd = findLoopEnd(allLines, currentIndex);
        const functionBody = allLines.slice(currentIndex + 1, functionEnd);
        
        if (functionBody.length === 0) {
            throw new Error(`Quest '${questName}' has no body! Add indented commands.`);
        }
        
        functions[questName] = functionBody;
        return functionEnd;
    }
    
    if (cmd.startsWith("embark on ")) {
        const questName = cmd.substring(10).trim();
        if (!functions.hasOwnProperty(questName)) {
            throw new Error(`Quest '${questName}' is unknown! Teach the quest first.`);
        }
        
        callStack.push(questName);
        
        if (callStack.length > 100) {
            throw new Error("Maximum quest depth reached! Possible infinite recursion detected.");
        }
        
        try {
            executeBlock(functions[questName]);
        } finally {
            callStack.pop();
        }
        
        return currentIndex + 1;
    }
    
    // loops
    if (cmd.startsWith("strike ") && cmd.endsWith(" times")) {
        const parts = cmd.split(" ");
        const times = parseInt(parts[1]);
        
        if (isNaN(times)) {
            throw new Error("Invalid number in strike command: " + command);
        }
        
        const loopEnd = findLoopEnd(allLines, currentIndex);
        const loopBody = allLines.slice(currentIndex + 1, loopEnd);
        
        for (let i = 0; i < times; i++) {
            executeBlock(loopBody);
        }
        
        return loopEnd;
    }
    
    // conditionals
    if (cmd.startsWith("if value equals ")) {
        const compareValue = parseInt(cmd.substring(16).trim());
        if (isNaN(compareValue)) {
            throw new Error("Invalid comparison value: " + command);
        }
        
        if (value === compareValue) {
            const blockEnd = findLoopEnd(allLines, currentIndex);
            const blockBody = allLines.slice(currentIndex + 1, blockEnd);
            executeBlock(blockBody);
            return blockEnd;
        } else {
            return findLoopEnd(allLines, currentIndex);
        }
    }
    
    if (cmd.startsWith("if value greater than ")) {
        const compareValue = parseInt(cmd.substring(22).trim());
        if (isNaN(compareValue)) {
            throw new Error("Invalid comparison value: " + command);
        }
        
        if (value > compareValue) {
            const blockEnd = findLoopEnd(allLines, currentIndex);
            const blockBody = allLines.slice(currentIndex + 1, blockEnd);
            executeBlock(blockBody);
            return blockEnd;
        } else {
            return findLoopEnd(allLines, currentIndex);
        }
    }
    
    // ignore unknown commands
    return currentIndex + 1;
}

// finds where a code block ends by looking for indented lines
function findLoopEnd(lines, startIndex) {
    let i = startIndex + 1;
    
    while (i < lines.length) {
        const line = lines[i];
        if (line.startsWith("    ") || line.startsWith("\t")) {
            i++;
        } else {
            break;
        }
    }
    
    return i;
}

// executes a block of code (used for loops, functions, conditionals)
function executeBlock(blockLines) {
    let i = 0;
    while (i < blockLines.length) {
        const cleanLine = blockLines[i].replace(/^[\s\t]+/, "");
        i = executeCommand(cleanLine, blockLines, i);
    }
}

// example programs for testing
const examples = {
    counting: `summon Poseidon
call Athena
call Athena
call Athena
print prophecy
offer drachma`,
    
    multiplication: `summon Poseidon
call Athena
call Athena
summon Minotaur
print prophecy
offer drachma`,
    
    loop: `summon Poseidon
call Athena
strike 3 times
    call Athena
    print prophecy
offer drachma`,
    
    heroes: `summon Poseidon
create hero Percy
create hero Annabeth
give hero Percy 10
give hero Annabeth 5
use hero Percy
print prophecy
use hero Annabeth
print prophecy
offer drachma`,
    
    functions: `summon Poseidon
teach quest PowerUp
    call Athena
    call Athena
    summon Minotaur
give hero StartValue 3
use hero StartValue
embark on PowerUp
print prophecy
offer drachma`,
    
    operators: `summon Poseidon
add 10
multiply by 3
subtract 5
divide by 5
print prophecy
offer drachma`,
    
    conditionals: `summon Poseidon
add 15
if value greater than 10
    call Athena
    call Athena
print prophecy
offer drachma`
};

// example
window.onload = function() {
    document.getElementById('codeInput').value = examples.counting;
};

// function to load example code
function loadExample(exampleName) {
    const codeInput = document.getElementById('codeInput');
    if (examples[exampleName]) {
        codeInput.value = examples[exampleName];
        codeInput.focus();
    }
}
