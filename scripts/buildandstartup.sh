#!/bin/bash
sh stop.sh
sleep 0.1
(cd ../minemagma_ui && echo "Pulling latest code" && git reset --hard && git pull && sleep 0.3 && echo "Installing packages" && npm install --force)
sleep 0.3
sh startup.sh
