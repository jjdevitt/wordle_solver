from calcweightutil import positionCount
import wordsorter
import random

recommendationCount = 10

def makeMultiple(words):
    print(f'Letter Score Suggestions: {wordsorter.sortByLetterScore(words)[:recommendationCount]}')
    print(f'Elimination count Suggestions: {wordsorter.sortByEliminationCount(words)[:recommendationCount]}')
    print(f'Positon Weight Suggestions: {wordsorter.sortByPositionWeight(words)[:recommendationCount]}')

    
def makeInitial(words):
    letterScoreWords = wordsorter.sortByLetterScore(words)[:200]
    positionWeight = wordsorter.sortByPositionWeight(letterScoreWords)[:50]
    elimCountWords = wordsorter.sortByEliminationCount(positionWeight)[:recommendationCount]
    random.shuffle(elimCountWords)
    print(f'Initial Suggestions: {elimCountWords}')
    
def makeOne(words):
    return random.choice(list(words))
    #return wordsorter.sortByLetterScore(words)[0]