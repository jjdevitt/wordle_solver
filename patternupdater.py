
def updateArrsWithGuesses(patternArr, yellowsArr): 
    guess = list(str(input("Enter guess:")))
    highlight = list(str(input("Enter highlights:")))
    i=0

    while i<5:
        if(highlight[i] == 'b'):
            for j, pattern in enumerate(patternArr):
                patternArr[j] = pattern.replace(guess[i], '')
        elif(highlight[i] == 'y'):
            patternArr[i] = patternArr[i].replace(guess[i], '')
            yellowsArr.append(guess[i])
        elif(highlight[i] == 'g'):
            patternArr[i] = guess[i]
        i+=1