import blescan
import sys
import bluetooth._bluetooth as bluez
from threading import Thread
import math
import json
from uuid import getnode as get_mac

class BeaconManager (Thread):
    def __init__ (self, recieveCallback=None):
        self.dev_id = 0
        self.recieveCallback = recieveCallback
        self.lastMsg = None
        self.myId = get_mac()
        Thread.__init__(self)

    def rssiToDistance(self, calibratedPower, rssi):
        ratio_dB = -53 - rssi
        print rssi
        return math.pow(10, ratio_dB / 20.0)
    
    def getJsonDistMsg(self):
        return json.dumps([self.lastMsg[0], self.lastMsg[1], self.lastMsg[2], self.myId, self.rssiToDistance(self.lastMsg[3], self.lastMsg[4])])
    
    def run(self):
        print "my id:", self.myId
        try:
            sock = bluez.hci_open_dev(self.dev_id)
            print "ble thread started at dev_id", self.dev_id
        except:
            print "error accessing bluetooth device..."
            sys.exit(1)
        blescan.hci_le_set_scan_parameters(sock)
        blescan.hci_enable_le_scan(sock)
        while True:
            returnedList = blescan.parse_events(sock, 1)
            if (len(returnedList)!=0):
                self.lastMsg = returnedList[0]
                if (self.recieveCallback is not None):
#                     print self.getJsonDistMsg()
                    self.recieveCallback()
