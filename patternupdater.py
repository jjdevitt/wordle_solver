
from array import array


def updateArrsWithGuesses(patternArr, yellows): 
    guess = list(str(input("Enter guess:")))
    highlight = list(str(input("Enter highlights:")))
    
    i=0
    while i<5:
        #print(f'i={i} hi={highlight[i]} gi={guess[i]} pi={patternArr[i]})')
        if(highlight[i] == 'b'):
            for j, pattern in enumerate(patternArr):
                if(len(patternArr[j])>1):
                    patternArr[j] = pattern.replace(guess[i], '')
                    #print(f' BLACK Removed {guess[i]} result -> {patternArr[j]})')
        elif(highlight[i] == 'y'):
            patternArr[i] = patternArr[i].replace(guess[i], '')
            yellows.add(guess[i])
            #print(f'YELLOW Removed {guess[i]} result -> {patternArr[i]}) and appened to yellow -> {yellowsArr}')
        elif(highlight[i] == 'g'):
            patternArr[i] = guess[i]
            #print(f'GREEN Set pattern to {guess[i]} -> {patternArr[i]})')
            if(guess[i] in yellows and guess.count(guess[i]) == 1):
                yellows.remove(guess[i])

        #print(f'Patterns after update {patternArr}')
        i+=1