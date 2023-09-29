#!/bin/bash

#Edit /etc/crontab using sudo and add the following line (replace yourname with your actual username):
#99 15 * * * * sh /home/orangepi/frith-printqueue-frontend/reboot-no-wifi.sh

TMP_FILE=/tmp/inet_up

# Edit this function if you want to do something besides reboot
no_inet_action() {
    shutdown -r +1 'No internet.'
}

if ping -c5 google.com; then
    echo 1 > $TMP_FILE
else
    [[ `cat $TMP_FILE` == 0 ]] && no_inet_action || echo 0 > $TMP_FILE
fi