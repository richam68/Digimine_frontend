#!/bin/bash
appName=crm-ui
port=3000
echo "Starting $appName"
pid=$(ps aux | grep 'npm' | grep -v grep | awk '{print $2}')
if [ -z "$pid" ]; then
  echo "Started $appName at $port"
  (cd ../minemagma_ui && nohup npm start </dev/null > crm.log 2> crmerror.log &)
else
  echo "$appName already running at $port port. Execute stop.sh to stop app at pid $pid and then rerun startup.sh"
fi
echo "Done"
