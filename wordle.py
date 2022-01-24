from operator import contains
import wordsearch
import patternupdater



def filt(word, yellowsArr):
    for yellow in yellowsArr:
        if yellow in word:
            return True
    return False

patternArr = ['[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]'
                , '[abcdefghijklmnopqrstuvwxyz]']

yellowsArr = ['a']

while (True): 
    patternupdater.updateArrsWithGuesses(patternArr,yellowsArr)

    print(f'Patterns:{patternArr}, Current Yellows:{yellowsArr}')

    # initial search
    results = wordsearch.search(''.join(map(str, patternArr)))

    #yellow filtering
    filteredResults = list(filter(lambda x: (filt(x, yellowsArr)), results))

    print(f"Possible Matches: {filteredResults} total: {len(filteredResults)}")
