from functools import cmp_to_key
import calcweightutil
import operator

def sortByLetterScore(words):
    wordScoreTuples = list([])
    letterScores = calcweightutil.letterCount(words)
    for word in words:
        wordLetterScore = 0
        for letter in set(list(word)):
            wordLetterScore+=letterScores[letter]
        wordScoreTuples.append((word,wordLetterScore))
    return list(map(operator.itemgetter(0), sorted(wordScoreTuples, key=lambda wst:wst[1], reverse=True)))

def sortByEliminationCount(words):
    elimScoreDict = dict.fromkeys(words,0)
    
    for word1 in words:
        for word2 in words:
            if len(set(word1).intersection(set(word2))) >0:
                elimScoreDict[word1]+=1
    return list(map(operator.itemgetter(0), sorted(elimScoreDict.items(), key =lambda es:(es[1], es[0]), reverse=True)))


def sortByPositionWeight(words):
    posWeights = calcweightutil.positionCount(words)
    posScoreTuples = list([])
    for word in words:
        posWeight = 0
        for i, letter in enumerate(word):
            posWeight+=posWeights[i][letter]
        posScoreTuples.append((word,posWeight))
    return list(map(operator.itemgetter(0), sorted(posScoreTuples, key=lambda wst:wst[1], reverse=True)))