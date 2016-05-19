#!/bin/bash


OUTPUT="index.html"
echo '' > $OUTPUT

for filepath in `find "." -name "*.html" -maxdepth 1| sort`; do
  path=`basename "$filepath"`
  echo "  <a href="$path">$path</a><br>" >> $OUTPUT
done
