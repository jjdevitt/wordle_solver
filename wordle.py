import wordsearch
import patternupdater
import wordfiltering
import recommendations

patterns = ['[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]']

yellows = []

while (True): 
    patternupdater.updateArrsWithGuesses(patterns,yellows)

    print(f'Patterns:{patterns} Yellows:{yellows}')

    # Search based on user inputs
    results = wordsearch.search(''.join(map(str, patterns)))

    # Filter out words that don't contain yellows
    filteredResults = wordfiltering.yellowFilter(yellows, results)

    print(f"Possible Matches: {filteredResults} Total: {len(filteredResults)}")

    recommendations.make(filteredResults)
    
    if(len(filteredResults)<=1):
        exit()
