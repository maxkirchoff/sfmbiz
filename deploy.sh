#!/bin/bash
printf '\n\n Syncing to S3 from local "public" folder.\n Excluding any dot files or folders.\n\n'
aws s3 sync app/ s3://www.sexfuckmaster.biz --acl public-read --exclude=".*" --delete 
