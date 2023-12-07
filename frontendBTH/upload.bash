#!/usr/bin/env bash
 
# Upload
#rsync -avz -e "ssh" --exclude-from 'exclude-list.txt' dist/my-app/ root@104.248.170.86://var/www/me-api2.ysojs.se/html/
ng build

rsync -avz -e "ssh" --exclude-from 'exclude-list.txt' dist/myApp/ root@104.248.170.86://var/www/jsframeworks.ysojs.se/html/

echo 'uploaded'