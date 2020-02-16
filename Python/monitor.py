import serial
from time import sleep
import sys


COM = 'COM7'# /dev/ttyACM0 (Linux)
BAUD = 115200

ser = serial.Serial(COM, BAUD)

s = ser.read(1)

print(s)