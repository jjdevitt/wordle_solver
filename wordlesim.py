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

def wordleRound(wordleWord, verbose):
    words = wordledictonary.get()
    patterns = ['[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]']

    yellows = set([])   
    i=0
    found = False
    while i<6:
        i+=1
        guess = recommendations.makeOne(words)
        highlights = generateHighlights(guess,wordleWord)
        patternupdater.updateArrsWithGuesses(patterns,yellows,guess,highlights)
        words = wordsearch.search(''.join(map(str, patterns)), words)
        words = wordfiltering.yellows(yellows, words)
        if verbose: print(f'  {i}) guess \'{guess}\' highlights \'{highlights}\'  {len(words)} words remaining...')
        if guess==wordleWord:
            found = True
            break
    return (i, found)

def runMultiple():
    print('\n  Running full simulation against all words in dictionary...')
    sum = 0
    total = 0
    misses = 0
    misswords = []

    for word in wordledictonary.get():
        result = wordleRound(word, False)
        if result[1]:  #found
            sum+=result[0]
            total+=1
        else:
            misses+=1
            misswords.append(word)
        
    print('\n############## RESULTS ##############\n')
    print(f'Found {total}/{len(wordledictonary.get())} words with avg {sum/total} guesses and {misses} misses -> {misswords}')
    print('\n############## RESULTS ##############\n')

def runSingle(wordleWord):
    print('\n')
    result = wordleRound(wordleWord,True)
    print('\n############## RESULTS ##############\n')
    print(f'Found word {result[1]} with {result[0]} guesses\n')
    print('\n############## RESULTS ##############\n')

### MAIN RUN    
print('\n')
command = input('Run which simulation (all,word):')

if command == 'all':
    runMultiple()
else: 
    runSingle(command)
