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

def runMultiple():
    print('\n  Running full simulation against all words in dictionary...')
    sum = 0
    total = 0
    misses = 0
    misswords = []

    for word in wordledictonary.get():
        words = wordledictonary.get()
        patterns = ['[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]']

        yellows = set([])   
        i=0
        guess = ''
        found = False
        while i<6:
            i+=1
            guess = recommendations.makeOne(words)
            highlights = generateHighlights(guess,word)
            if guess==word:
                found = True
                break
            patternupdater.updateArrsWithGuesses(patterns,yellows,guess,highlights)
            words = wordsearch.search(''.join(map(str, patterns)), words)
            words = wordfiltering.yellows(yellows, words)
            #print(f'  Round {i} guess {guess} highlights {highlights} words left {len(words)}')

        if not found:
            misses+=1
            misswords.append(word)
        else:
            sum+=i
            total+=1
        
        #print(f'Finished with {i} guesses... solution is {guess}')
    print('\n############## RESULTS ##############\n')
    print(f'Found {total}/{len(wordledictonary.get())} words with avg {sum/total} guesses and {misses} misses -> {misswords}')
    print('\n############## RESULTS ##############\n')


#main run
print('\n')
command = input('Run which simulation (all,word):')

if command == 'all':
    runMultiple()
else: 

    print('\n')
    word = command
    words = wordledictonary.get()
    patterns = ['[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]'
            , '[abcdefghijklmnopqrstuvwxyz]']

    yellows = set([])   
    i=0
    guess = ''
    found = False
    while i<6:
        i+=1
        guess = recommendations.makeOne(words)
        highlights = generateHighlights(guess,word)
        print(f'  {i}) guess \'{guess}\' highlights \'{highlights}\'  {len(words)} words remaining...')
    
        patternupdater.updateArrsWithGuesses(patterns,yellows,guess,highlights)
        words = wordsearch.search(''.join(map(str, patterns)), words)
        words = wordfiltering.yellows(yellows, words)
        if guess==word:
            found = True
            break
    
    print('\n############## RESULTS ##############\n')
    print(f'Found word {found} with {i} guesses\n')
    print('\n############## RESULTS ##############\n')
