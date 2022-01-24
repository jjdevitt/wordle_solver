from functools import cmp_to_key

def compareUniqueness(a, b):
    setA = (set(list(a)))
    setB = (set(list(b)))
    #print(f'Compaing {setA} to {setB}')
    return  len(setB)-len(setA) 

def sortByUniqueness(results):
    return sorted(results, key=cmp_to_key(compareUniqueness))
