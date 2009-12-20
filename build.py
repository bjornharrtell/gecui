#!/usr/bin/python

import httplib, urllib, sys, os

sourcecount = 0
mergedsource = []

print 'Merging source files...'

for dirpath, dirnames, filenames in os.walk('.'):
    for filename in filenames:
        if filename.endswith('.js'):
            path = os.path.join(dirpath, filename)
            source = open(path).read()
            mergedsource.append(source)
            sourcecount += 1

mergedsourcestring = ''.join(mergedsource)

print 'Merged ' + str(sourcecount) + ' source files...'

print 'Transmitting to closure compiler...'

params = urllib.urlencode([
    ('js_code', mergedsourcestring),
    ('compilation_level', 'SIMPLE_OPTIMIZATIONS'),
    ('output_format', 'text'),
    ('output_info', 'compiled_code')
  ])

headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = httplib.HTTPConnection('closure-compiler.appspot.com')
conn.request('POST', '/compile', params, headers)
response = conn.getresponse()
data = response.read()
conn.close

print 'Writing to output file...'

open('gecui-all.js', 'w').write(data)

print 'Done!'
