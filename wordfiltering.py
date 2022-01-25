
# needed for 
def yellowFilter(yellows, results):
    resultSet = set([])
    for result in results:
        resultContainsAllYellows = True
        for yellow in yellows:
            if yellow not in result:
                resultContainsAllYellows=False
                break
        if(resultContainsAllYellows and len(result)==5):
            resultSet.add(result)

    return resultSet