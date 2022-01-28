def yellows(yellows, words):
    resultSet = set([])
    for word in words:
        resultContainsAllYellows = True
        for yellow in yellows:
            if yellow not in word:
                resultContainsAllYellows=False
                break
        if(resultContainsAllYellows and len(word)==5):
            resultSet.add(word)

    return resultSet

def uniques(words):
    return list(filter(lambda x: len(x)==len(set(x)), words))
