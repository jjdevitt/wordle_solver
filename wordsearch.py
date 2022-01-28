import re

def search(pattern, words):
    p = re.compile(pattern)
    return list(filter(p.match, words))