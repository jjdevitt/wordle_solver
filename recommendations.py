import wordsorter
import random

recommendationCount = 10

def makeMultiple(words):
    print(f'Letter Score Suggestions: {wordsorter.sortByLetterScore(words)[:recommendationCount]}')
    print(f'Positon Weight Suggestions: {wordsorter.sortByPositionWeight(words)[:recommendationCount]}')

    
def makeInitial(words):
    letterScoreWords = wordsorter.sortByLetterScore(words)[:200]
    positionWeight = wordsorter.sortByPositionWeight(letterScoreWords)[:50]
    random.shuffle(positionWeight)
    print(f'Initial Suggestions: {positionWeight[:recommendationCount]}')
    
def makeOne(words):
    return wordsorter.sortByPositionWeight(words)[0]