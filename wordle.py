import wordsearch
import patternupdater
import wordfiltering
import recommendations
import wordledictonary

patterns = ['[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]']

yellows = set([])

words = wordledictonary.get()

recommendations.makeInitial(words)

while (True): 


    guess = list(str(input("Enter guess:")))
    highlight = list(str(input("Enter highlights:")))
    patternupdater.updateArrsWithGuesses(patterns,yellows, guess, highlight)

    print(f'Patterns:{patterns} Yellows:{yellows}')

    # Search based on user inputs
    words = wordsearch.search(''.join(map(str, patterns)), words)

    # Filter out words that don't contain yellows
    filteredResults = wordfiltering.yellows(yellows, words)

    print(f"Possible Matches: {filteredResults} Total: {len(filteredResults)}")

    recommendations.makeMultiple(filteredResults)
    
    if(len(filteredResults)<=1):
        exit()
