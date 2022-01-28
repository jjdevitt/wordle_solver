from functools import cmp_to_key
import calcweightutil
import operator

def sortByLetterScore(words):
    wordScoreTuples = list([])
    letterScores = calcweightutil.calculate(words)
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
    return list(map(operator.itemgetter(0), sorted(elimScoreDict.items(), key =lambda kv:(kv[1], kv[0]), reverse=True)))