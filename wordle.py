import wordsearch
import patternupdater
import wordfiltering
import wordsorter

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

    # Sorting...
    sortedResults = wordsorter.sortByLetterScore(filteredResults)

    print(f"Possible Matches: {sortedResults} Total: {len(sortedResults)}")
    
    if(len(sortedResults)<=1):
        exit()
