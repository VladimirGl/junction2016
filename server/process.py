#!/usr/bin/env python
# -*- coding: utf-8 -*- 

from collections import Counter
import json
import random

from trilateration import *

user_pinned = [0] * 10
user_positions = [[] * 100]
user_beacon_positions = dict()
user_id = 1
pos_new = (0.0, 0.0)
pos_old = (0.0, 0.0)
n_users = 3
users = [0] * 100
users[0] = 1
users[1] = 1
users[2] = 1

users_positions = [{"id":i, "x":random.randint(100, 600), "y":random.randint(200, 500)} for i in range(10)]
users_positions[0]["x"] = random.randint(100, 600)
users_positions[0]["y"] = random.randint(200, 500)
users_positions[1]["x"] = random.randint(100, 600)
users_positions[1]["y"] = random.randint(200, 500)
users_positions[2]["x"] = random.randint(100, 600)
users_positions[2]["y"] = random.randint(200, 500)

hsize = 25
heatmap = [0] * hsize * hsize


def get_users(mstr):
    return users

def add_user(mstr):
    try:
        new_id = int(mstr)
        if users[new_id] == 1:
            return {"error":"user_exist"}
        else:
            users[new_id] = 1
            return {"n_users":str(sum(users))}
    except:
        return {"error":"not a number"}

def rem_user(mstr):
    try:
        rem_id = int(mstr)
        if users[rem_id] == 0:
            return {"error":"user_not_exist"}
        else:
            users[rem_id] = 0
            return {"n_users":str(sum(users))}
    except:
        return {"error":"not a number"}

def get_active_tickets(mstr):
    return user_pinned

def pin_user(mstr):
    try:
        uid = int(mstr)
        if users[uid]:
            if user_pinned[uid] == 0:
                user_pinned[uid] = 1
                return compute_positions2()[uid]
            else:
                return {"error":"user pinned"}
        else:
            return {"error":"not a user"}
    except:
        return {"error":"something goes wrong"}

def unpin_user(mstr):
    try:
        uid = int(mstr)
        if users[uid]:
            if user_pinned[uid] == 1:
                user_pinned[uid] = 0
                return {"status":"unpinned"}
            else:
                return {"error":"user not pinned"}
        else:
            return {"error":"not a user"}
    except:
        return {"error":"something goes wrong"}


def compute_positions():
    result = []
    for i in range(len(users)):
        if users[i]:
            pos = [{"id":i, "x":random.randint(100, 600), "y":random.randint(200, 500)}]
            for j in range(10):
                new_x = pos[j]["x"] + random.randint(0, 41) - 20
                new_y = pos[j]["y"] + random.randint(0, 41) - 20
                if new_x > 600:
                    new_x = 600
                if new_x < 100:
                    new_x = 100
                if new_y > 500:
                    new_y = 500
                if new_y < 200:
                    new_y = 200
                pos += [{"id":i, "x":new_x, "y":new_y}]
            result += (pos)
    return result

def compute_positions2():
    result = []
    for i in range(10):
        if users[i]:
            pos = users_positions[i]
            pos["x"] += random.randint(0, 51) - 25
            pos["y"] += random.randint(0, 51) - 25

            if pos["x"] > 600:
                pos["x"] = 600
            if pos["x"] < 100:
                pos["x"] = 100
            if pos["y"] > 500:
                pos["y"] = 500
            if pos["y"] < 200:
                pos["y"] = 200

            result += [pos]
    return result

def compute_positions3():
    x, y = pos_new

    if x > 4:
        x = 4
    if x < 0:
        x = 0
    if y > 4:
        y = 4
    if y < 0:
        y = 0

    x *= 150
    y *= 125

    return {"id":user_id, "x":x, "y":y}

def get_positions(mstr):
    return compute_positions3()

def get_beacon_values(mstr):
    return user_beacon_positions

def add_positions(mstr):
    global pos_new
    global pos_old

    try:
        bcns10 = 0
        bcns11 = 0
        bcns13 = 0
        for strs in mstr.split(":"):
            uid, bid, val = strs.split()
            uid = int(uid)
            val = float(val)

            bid = int(bid)

            if bid == 10:
                bcns10 = val
            if bid == 11:
                bcns11 = val
            if bid == 13:
                bcns13 = val

 #           if bid != 10 or bid != 11 or bid != 13:
 #               continue

 #           user_beacon_positions[uid] = [[bid, val]]
            try:
                user_beacon_positions[uid].append([bid, val])
            except:
                user_beacon_positions[uid] = [[bid, val]]
        
        pos_old = compute_pos(bcns10, bcns11, bcns13)
        if pos_old:
            xo, yo = pos_old
            xo=xo*0.3+pos_new[0]*0.7
            yo=yo*0.3+pos_new[1]*0.7
            pos_new = (xo,yo)

 #       update_position()
        return {"status":"added"}
    except:
        return {"status":"error"}




def get_goods(mstr):
    return {"error":"get goods not_implemented"}

def get_heatmap(mstr):
    result = [{"x":0, "y":0, "value":random.randint(0, 100)}]
    for i in range(hsize):
        for j in range(hsize):
            if i == 0 and j == 0:
                continue
            heatmap[i * hsize + j] = random.randint(0, 100)
            result += [{"x":i * 28, "y":j * 20, "value":heatmap[i * hsize + j]}]

    return result


