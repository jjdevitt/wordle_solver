import wordsorter
import random

recommendationCount = 10

def make(results):
    uniquenessRecommendations = wordsorter.sortByUniqueness(results)[:recommendationCount]
    print(f'Recommendations (uniqueness): {uniquenessRecommendations}')
    letterWeightRecommendations = wordsorter.sortByLetterScore(results)[:recommendationCount]
    print(f'Recommendations (letter weight): {letterWeightRecommendations}')
    dynamicWeightRecommendations = wordsorter.sortByLetterScoresDynamic(results)[:recommendationCount]
    print(f'Recommendations (letter weight - dynamic): {dynamicWeightRecommendations}')

def makeInitial(results): 
    random.shuffle(results)
    uniqueRecommendations = wordsorter.sortByUniqueness(results)[:300]
    weightRecommendations = wordsorter.sortByLetterScoresDynamic(uniqueRecommendations)[:100]
    print(f'Suggested starting word: {random.choices(weightRecommendations, k=10)}')
