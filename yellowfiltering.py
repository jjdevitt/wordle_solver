

def doFilter(yellowsArr, results):
    resultSet = set([])
    for result in results:
        for yellow in yellowsArr:
            if yellow in result:
                resultSet.add(result)
    return resultSet