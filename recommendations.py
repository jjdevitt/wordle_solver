import wordsorter
import wordfiltering
import random

recommendationCount = 10

def make(results):

    letterScoreWords = wordsorter.sortByLetterScore(results)[:3*recommendationCount]
    elimCountWords = wordsorter.sortByEliminationCount(results)[:3*recommendationCount]

    recommendations = []
    count=0
    for word in letterScoreWords:
        if word in elimCountWords:
            recommendations.append(word)
            count+=1
            if(count>=recommendationCount):
                break

    return recommendations