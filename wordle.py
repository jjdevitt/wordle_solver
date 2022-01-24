from operator import contains
import wordsearch
import patternupdater
import yellowfiltering

patternArr = ['[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]']

yellowsArr = []

while (True): 
    patternupdater.updateArrsWithGuesses(patternArr,yellowsArr)

    print(f'Patterns:{patternArr}, Current Yellows:{yellowsArr}')

    # Search based on user inputs
    results = wordsearch.search(''.join(map(str, patternArr)))

    # Filter out words that don't contain yellows
    filteredResults = yellowfiltering.doFilter(yellowsArr, results)

    print(f"Possible Matches: {filteredResults} total: {len(filteredResults)}")
    
    if(len(filteredResults)<=1):
        exit()
