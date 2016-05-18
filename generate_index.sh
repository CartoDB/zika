#!/bin/bash

HTTP="/"
OUTPUT="index.html"

i=0
echo "<UL>" > $OUTPUT
for filepath in `find "." -name "*.html" -maxdepth 1| sort`; do
  path=`basename "$filepath"`
  echo "  <a href="$path">$path</a><br>" >> $OUTPUT

done
echo "</UL>" >> $OUTPUT
