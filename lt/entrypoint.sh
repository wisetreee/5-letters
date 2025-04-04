#!/bin/sh
lt --port 4173 --subdomain wordlik --local-host frontend &
lt --port 5000 --subdomain wordlik-backend --local-host backend &
wait