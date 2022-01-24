from functools import cmp_to_key
import calcweightutil

def compareUniqueness(a, b):
    setA = (set(list(a)))
    setB = (set(list(b)))
    #print(f'Compaing {setA} to {setB}')
    return  len(setB)-len(setA) 

def sortByUniqueness(results):
    return sorted(results, key=cmp_to_key(compareUniqueness))

def compareWeight(a ,b):
    weightedLetters = {'a': 4467, 'b': 1162, 'c': 1546, 'd': 1399, 'e': 4255, 'f': 661, 'g': 1102, 'h': 1323, 'i': 2581, 'j': 163, 'k': 882, 'l': 2368, 'm': 1301, 'n': 2214, 'o': 2801, 'p': 1293, 'q': 84, 'r': 3043, 's': 2383, 't': 2381, 'u': 1881, 'v': 466, 'w': 685, 'x': 189, 'y': 1605, 'z': 250}
    scoreA = 0
    for la in set(list(a)):
        scoreA+=weightedLetters[la]
    scoreB = 0
    for lb in set(list(b)):
        scoreB+=weightedLetters[lb]
    return scoreB-scoreA

def sortByLetterScore(results):
    return sorted(results, key=cmp_to_key(compareWeight))

weightedLettersGlobal = {'a': 4467, 'b': 1162, 'c': 1546, 'd': 1399, 'e': 4255, 'f': 661, 'g': 1102, 'h': 1323, 'i': 2581, 'j': 163, 'k': 882, 'l': 2368, 'm': 1301, 'n': 2214, 'o': 2801, 'p': 1293, 'q': 84, 'r': 3043, 's': 2383, 't': 2381, 'u': 1881, 'v': 466, 'w': 685, 'x': 189, 'y': 1605, 'z': 250}
  
def compareWeightDynamic(a ,b):
    scoreA = 0
    for la in set(list(a)):
        scoreA+=weightedLettersGlobal[la]
    scoreB = 0
    for lb in set(list(b)):
        scoreB+=weightedLettersGlobal[lb]
    return scoreB-scoreA   

def sortByLetterScoresDynamic(results):
    weightedLettersGlobal = calcweightutil.calculate(results)
    #print(f'dyamic score calculation -> {weightedLettersGlobal}')
    return sorted(results, key=cmp_to_key(compareWeightDynamic))