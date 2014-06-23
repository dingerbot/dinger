from Queue import Queue

theFile = open('./georgedingconvo.txt')

hongQueries = Queue()
georgeQueries = []

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
		hongQueries.put(theFile.readline())
		theFile.readline()
	elif line[:11] == 'George Ding':
		georgeQueries.append(theFile.readline()[:-1])
		theFile.readline()
	line = theFile.readline()

print '%r' % result

output = open('./juiced.js', 'w')
output.write('var juiced = ')
output.write(str(result))
output.write(';')



