import subprocess

def search(pattern):
 result = subprocess.run(['grep', '-w', pattern, '/usr/share/dict/words'], stdout=subprocess.PIPE)
 return result.stdout.decode('utf-8').split('\n')