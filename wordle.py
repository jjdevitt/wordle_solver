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
wordsearch.search(''.join(map(str, patterns)), words)
recommendations.makeInitial(words)

while (True): 
    patternupdater.updateArrsWithGuesses(patterns,yellows)

    print(f'Patterns:{patterns} Yellows:{yellows}')

    # Search based on user inputs
    words = wordsearch.search(''.join(map(str, patterns)), words)

    # Filter out words that don't contain yellows
    filteredResults = wordfiltering.yellowFilter(yellows, words)

    print(f"Possible Matches: {filteredResults} Total: {len(filteredResults)}")

    recommendations.make(filteredResults)
    
    if(len(filteredResults)<=1):
        exit()
