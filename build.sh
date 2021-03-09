#!/bin/bash

build_no="$1"
build_args="--compress"

if [ -z "$BCR_PASS" ]; then
   echo 'Please set the BCR password in $BCR_PASS'
   exit 1
fi

if [ -z "$build_no" ]; then
   echo "Usage: $0 <build number>"
   exit 1
fi
tag1="registry.library.oregonstate.edu/kiosks_web:osulp-${build_no}"

echo "Building for tag $tag1"
docker build ${build_args} . -t "$tag1"

echo "Logging into BCR as admin"
echo $BCR_PASS | docker login --password-stdin registry.library.oregonstate.edu

echo "pushing: $tag1"
docker push "$tag1"
echo "$build_no" > .version
