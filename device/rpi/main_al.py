from beaconmanager import BeaconManager
import httplib
# import json
import urllib2
from threading import Thread
import time
from button import Button


powers = dict()
calibratedPowers = dict()

bm = BeaconManager()
def recieveCallback():
#     print bm.lastMsg
    if (bm.lastMsg[2]>255):
        return #????
    power = float(bm.lastMsg[4])
    calibratedPowers[bm.lastMsg[2]] = bm.lastMsg[3]
    cur = powers.get(bm.lastMsg[2])
    if (cur):
        cur.append(power)
    else:
        tmp = list()
        tmp.append(power)
        powers[bm.lastMsg[2]] = tmp
        
#     url = "http://40.113.85.15/cashmesh?add_beacon_values="+str(bm.myId)+"+"+str(bm.lastMsg[2])+"+"+str(dist)
#     result = urllib2.urlopen(url).read() if you want to spam, uncomment this
#     print url
bm.recieveCallback = recieveCallback
bm.start()



def sendThreadLoop():
    while (True):
        if (len(powers)!=0):
#             print powers
            url = "http://40.113.85.15/cashmesh?add_beacon_values="
            for i in powers:
                curPowerList = powers[i]
                res = 0
                for j in curPowerList:
                    res+=j
                res/=len(curPowerList)
                print 'id=', i
                dist = bm.rssiToDistance(calibratedPowers[i], res)
                url+=str(bm.myId)+"+"+str(i)+"+"+str(round(dist,3))
                url+=":"
            url=url[:-1]       
            powers.clear()
            calibratedPowers.clear()
            print url
            try:
                result = urllib2.urlopen(url, timeout=3).read() #if you want to spam, uncomment this
                print result
            except:
                print "timeout"
        time.sleep(5)

def dummy():
    return 42

def buttonPressed():
    url = "http://40.113.85.15/cashmesh?pin_user="+str(1)
    try:
        result = urllib2.urlopen(url, timeout=3).read() #if you want to spam, uncomment this
        print result
    except:
        print "timeout"


button = Button (22, buttonPressed, dummy)
button.start()

sendThread = Thread(target=sendThreadLoop)
sendThread.start()
