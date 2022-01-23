import wordsearch

patternVal = str(input("Enter pattern:"))
result = wordsearch.search(patternVal)
print(f"Possible Matches: {result}")