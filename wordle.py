import os

patternVal = str(input("Enter pattern:"))

print("Possible Matches:")
result = os.system('grep -w {} /usr/share/dict/words'.format(patternVal))