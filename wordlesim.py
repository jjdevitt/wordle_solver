import wordledictonary
import recommendations
import patternupdater
import wordsearch
import wordfiltering

def generateHighlights(guess,word):
    highlights = ''
    for i, l in enumerate(guess):
        if l in word:
            if l==list(word)[i]:
                highlights+='g'
            else:
                highlights+='y'
        else:
            highlights+='b'
    return highlights


print(f'highlights {highlights}')

sum = 0
total = 0
misses = 0

for word in wordledictonary.get():
    words = wordledictonary.get()
    patterns = ['[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]']

    yellows = set([])   
    i=1
    guess = ''
    found = False
    while i<=6:
        i+=1
        guess = recommendations.makeOne(words)
        highlights = generateHighlights(guess,word)
        if highlights=='ggggg':
            found = True
            break
        patternupdater.updateArrsWithGuesses(patterns,yellows,guess,highlights)
        words = wordsearch.search(''.join(map(str, patterns)), words)
        words = wordfiltering.yellows(yellows, words)
        #print(f'  Round {i} guess {guess} highlights {highlights} words left {len(words)}')

    if not found:
        misses+=1
    else:
        sum+=i
        total+=1
    
    #print(f'Finished with {i} guesses... solution is {guess}')
print(f'Found {total} words with avg {sum/total} guesses and {misses} misses')