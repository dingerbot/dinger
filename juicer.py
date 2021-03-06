from Queue import Queue

theFile = open('./georgedingconvo.txt')
# replace this file with your own blacklist file
bList = open('./blacklist.txt')

hongQueries = Queue()
georgeQueries = []
blackQueries = []

for line in bList:
	blackQueries.append(line[:-1])

print '%r' % blackQueries

# for i in theFile.length 
endoffile = False
line = theFile.readline()
result = {}
while line:
	if line[:9] == 'Hong Jeon':
		if georgeQueries:
			for hong in list(hongQueries.queue):
				hong = hong[:-1]
				if hong in result:
					result[hong].append(list(georgeQueries))
				else:
					result[hong] = []
					result[hong].append(list(georgeQueries))
			hongQueries.queue.clear()
			del georgeQueries[:]
		currentLine = theFile.readline()
		if len(currentLine) < 50:
			# don't include lines that have the words in the blacklist
			blist = False
			for black in blackQueries:
				if black.lower() in currentLine.lower():
					blist = True
			if not blist:
				hongQueries.put(currentLine)

		theFile.readline()
	elif line[:11] == 'George Ding':
		# check here if the line exact matches the blacklist
		gdingyolo = theFile.readline()[:-1]

		# don't include lines that have the words in the blacklist
		blist = False
		for black in blackQueries:
			if black.lower() in gdingyolo.lower():
				blist = True

		if not blist:
			georgeQueries.append(gdingyolo)

		theFile.readline()
	line = theFile.readline()

print '%r' % result

output = open('./juiced.js', 'w')
output.write('var juiced = ')
output.write(str(result))
output.write(';')