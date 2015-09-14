#!/usr/bin/env bash

# because jshint and BDD syntax don't play along nice
jshint src/
jshint test/ | grep -v -E "Expected an assignment|Expected an identifier"
