import wordledictonary
import random

def generateHighlights(guess,word):
    highlights = ''
    for i, l in enumerate(guess):
        if l in word:
            if l==list(word)[i]:
                highlights+='g'
            else:
                highlights+='y'
        else:
            highlights+='b'
    return highlights

words = wordledictonary.get()
wordleWord = random.choice(words)
i=1
while i<=6:
    guess = input(f'Guess ({i} of 6): ')
    if guess in words:
        i+=1
        highlights = generateHighlights(guess,wordleWord)
        print(f'    Highlights: {highlights}')
        if highlights == 'ggggg':
            print('You win!')
            exit()
    else:
        print(f'     {guess} not in word list')

print(f'Word was: {wordleWord}')