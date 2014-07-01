Dinger
======
Have you ever wanted to chat with a robot George? <br>
No? Well now you can! <br> 
Start your chat at http://hongjeon.com/dinger/index.html
 
## What is Dinger?
Dinger is a robot designed to immitate the colorful vocabulary and speech patterns of George Ding. Dinger interprets your message by scaling through an archive of 30,000 Facebook messages and using a blaze algorithm to calculate the best matching query based on a score system (explained later). Dinger will then match the user's query with what I have said to George previously, and it will respond with the most relevant sequence of messages with which he replied. <br>

NOTICE: The data set is only from Sept - Feb. George has not learned the word "geed" yet.

##How does it match words?
**Level 1:** the most basic of all string matching. Dinger tries an exact match. This will most likely fail.  <br>
**Level 2:** string matching based on a score system. The input that passes a threshhold percentage match to one of the keys is determined to be a 'match'. First, it separates the user input and a possible key by each word, and a percent match for each of those words is determined. All words are given a base score of 1. For each word in the user input sentence, the score for the word is multiplied by its match percentage and then all the scores are summed for the sentence. If the sentence begins with a question word (how, why, when, ..), which we deem as more important for determining sentence subject, then a special weight multiplied by its match percentage is added to the sentence score. Also, if it is a question sentence, the middle and the end word is also checked for matching using special threshholds, and an additional score multiplied by its percentage is added to the sentence. We use the top 3 scoring sentences that are within a score of 2 from the maximum scoring sentence. To spice things up, we use a weighted/biased randomizer to pick from the top scoring sentences for the resulting response.<br>
**Level 3:** it reads your mind. <br><br>To see the calculations in action and the conversation it's trying to match, open up the developer console (`command + option + j` in Chrome)

##What are these files?
###juicer.py
It looks at every single line in a file that contains the messages in Facebook's archive format, parses the necessary information, and creates `juiced.js`, a giant javascript object that contains what I have said to him previously as key and what he responded with as the value. If he responded multiple times, all of the answers are stored in an array. Since some messages were meant to be private, `juicer.py` uses a filter `blacklist.txt` to exclude lines that contains the words in the blacklist. 

###main.js
Contains the AngularJS controller 'dingerController' that houses the main algorithm and functions to manipulate the DOM. 

###loaded.js (not yet implemented)
Used to load special key value pairs for custom answers to certain queries. It can be used to plant easter eggs for fun.
 
