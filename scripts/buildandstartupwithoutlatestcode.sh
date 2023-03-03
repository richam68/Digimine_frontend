#!/bin/bash
sh stop.sh
sleep 0.1
(cd ../minemagma_ui && echo "Installing packages" && npm install)
sleep 0.3
sh startup.sh
