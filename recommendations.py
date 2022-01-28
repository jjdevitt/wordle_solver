import wordsorter
import wordfiltering
import random

recommendationCount = 10

def make(results):

    letterScoreWords = wordsorter.sortByLetterScore(results)[:5*recommendationCount]
    elimCountWords = wordsorter.sortByEliminationCount(results)[:5*recommendationCount]

    recommendations = []
    count=0
    for word in letterScoreWords:
        if word in elimCountWords:
            recommendations.append(word)
            count+=1
            if(count>=recommendationCount):
                break

    return recommendations
    
def makeInitial(results):

    letterScoreWords = wordsorter.sortByLetterScore(results)[:10*recommendationCount]
    elimCountWords = wordsorter.sortByEliminationCount(results)[:10*recommendationCount]

    recommendations = []
    count=0
    for word in letterScoreWords:
        if word in elimCountWords:
            recommendations.append(word)
            count+=1
            if(count>=recommendationCount*100):
                break

    random.shuffle(recommendations)
    return recommendations[:recommendationCount]