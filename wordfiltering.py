
# needed for 
def yellowFilter(yellows, results):
    resultSet = set([])
    for result in results:
        for yellow in yellows:
            if yellow in result:
                resultSet.add(result)
    return resultSet