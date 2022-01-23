echo Enter pattern:
read input
echo Possible Matches:


function search () {
 grep -w $1 /usr/share/dict/words
}

search $input 
