#this script is used to run the frontend on startup on an OrangePi Zero 2 using the debian image

#INSTRUCTIONS
#the project should be cloned in the /home/orangepi/ directory
#then, goto settings > settings manager > session and startup > application autostart
#add command "sh /home/orangepi/frith-printqueue-frontend/startup.sh"

#configure xfce desktop environment to prevent sleeping
xset s off
xset -dpms s off
xset dpms 0 0 0

#build the distributable (only needed once)
# cd /home/orangepi/frith-printqueue-frontend
# npm i
# npm run build

#host index.html
cd /home/orangepi/frith-printqueue-frontend/dist
xfce4-terminal -e "python3 -m http.server 8000"

#open in chromium
xfce4-terminal -e "chromium --kiosk http://localhost:8000"