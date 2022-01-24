import wordsorter

recommendationCount = 10

def make(results):
    uniquenessRecommendations = wordsorter.sortByUniqueness(results)[:recommendationCount]
    print(f'Recommendations (uniqueness): {uniquenessRecommendations}')
    letterWeightRecommendations = wordsorter.sortByLetterScore(results)[:recommendationCount]
    print(f'Recommendations (letter weight): {letterWeightRecommendations}')