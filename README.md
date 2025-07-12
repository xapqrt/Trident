Trident — A Programming Language for Demigods (Apparently)
This is Trident. It’s a small esolang (esoteric programming language) where all the commands are based on Greek mythology. Think of it like brainf*ck, but if the gods were watching.

Everything runs on a single number — like one piece of memory you just keep changing using mythological commands. That’s it. No real reason this exists, I just thought it would be funny.

What You Can Do
Here’s what each command does:


summon Poseidon        # start the program, sets value to 0
call Athena            # +1
curse Hades            # -1
summon Minotaur        # ×2
split hydra            # ÷2
add N                  # add N
subtract N             # subtract N
multiply by N          # multiply by N
divide by N            # divide by N
create hero NAME       # create a variable with value 0
give hero NAME N       # set variable to N
save hero NAME         # store current value in variable
use hero NAME          # set current value to variable's value
teach quest NAME       # define a function
embark on NAME         # call a function
if value equals N      # if current value == N
if value greater than N# if current value > N
strike N times         # loop N times (next indented block)
print prophecy         # print current value
offer drachma          # end program
A Few Examples
Basic Counting
How to Use This Thing
Open index.html

Type your Trident code in the textarea

Click “Run Code”

Output appears below

There’s also a small command reference on the page. It’s basic but works.

Stuff Under the Hood
JavaScript (plain JS, no frameworks)

One memory cell (integer)

Simple line-by-line parser

Indentation is used for loops and conditionals

Handles errors without crashing the page

Mobile-friendly

All in one HTML file

Why It Exists
Honestly? Just for fun. It’s not super practical, but it’s a decent way to think about variables, functions, loops, and conditionals in a different way.

Feel free to fork, change, or meme it.

If the code crashes: probably your fault.
If it works: pretend you’re a genius.
Either way, thanks for checking it out.