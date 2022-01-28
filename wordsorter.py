from functools import cmp_to_key
import calcweightutil

def compareUniqueness(a, b):
    setA = (set(list(a)))
    setB = (set(list(b)))
    #print(f'Compaing {setA} to {setB}')
    return  len(setB)-len(setA) 

def sortByUniqueness(results):
    return sorted(results, key=cmp_to_key(compareUniqueness))

weightedLettersGlobal = []
  
def compareWeightDynamic(a ,b):
    scoreA = 0
    for la in set(list(a)):
        scoreA+=weightedLettersGlobal[la]
    scoreB = 0
    for lb in set(list(b)):
        scoreB+=weightedLettersGlobal[lb]
    return scoreB-scoreA   

def sortByLetterScoresDynamic(results):
    global weightedLettersGlobal
    weightedLettersGlobal = calcweightutil.calculate(results)
    return sorted(results, key=cmp_to_key(compareWeightDynamic))