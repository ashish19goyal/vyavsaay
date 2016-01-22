#!/bin/bash
for fl in *.php; do
mv $fl $fl.old
sed "s/class='function_detail'/class='tab-pane'/g" $fl.old > $fl
rm -f $fl.old
done
