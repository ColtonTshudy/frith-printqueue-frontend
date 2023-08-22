#configure xfce desktop environment to prevent sleeping
xset s off
xset -dpms s off
xset dpms 0 0 0

#open in chromium
xfce4-terminal -e "chromium --kiosk http://localhost:8000"