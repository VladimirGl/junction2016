import RPi.GPIO as GPIO
import time
import threading

class Button(threading.Thread):
	def __init__(self, pin, c1, callbackReleased):
		threading.Thread.__init__(self)
		self.name = "buzzModule"
		self.pin = pin
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(self.pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
		self.state = GPIO.input(self.pin)
		self.c1 = c1
		self.callbackReleased = callbackReleased
	
	def run(self):
		while True:
			input_state = GPIO.input(self.pin)
			if input_state != self.state:
					if input_state == True:
						self.c1()
						self.state = True
					else:
						self.callbackReleased()
						self.state = False
				#self.state = input_state
				#print('Button Pressed')
				#time.sleep(0.1)
			time.sleep(0.1)

#def callback():
#	print ("test")

#button = Button(22, callback, callback);
#button.start()

#while True:
#	if GPIO.input(22):
 #	   print ("test1")
#	time.sleep(1)
#	print ("timer")
