#!/usr/bin/env
# -*- coding:utf-8 -*-

from __future__ import division
import json
import math
from json import encoder
encoder.FLOAT_REPR = lambda o: format(o, '.2f')

class base_station(object):
    def __init__(self, lat, lon, dist):
        self.lat = lat
        self.lon = lon
        self.dist = dist

# class point(object):
#     def __init__(self, x, y):
#         self.x = x
#         self.y = y

class circle(object):
    def __init__(self, point, radius):
        self.center = point
        self.radius = radius

class json_data(object):
    def __init__(self, circles, inner_points, center):
        self.circles = circles
        self.inner_points = inner_points
        self.center = center
    
def serialize_instance(obj):
    d = {}
    d.update(vars(obj))
    return d

def get_two_points_distance(p1, p2):
    return math.sqrt(pow((p1[0] - p2[0]), 2) + pow((p1[1] - p2[1]), 2))

def get_two_circles_intersecting_points(c1, c2):
    p1 = c1.center 
    p2 = c2.center
    r1 = c1.radius
    r2 = c2.radius

    d = get_two_points_distance(p1, p2)
    # if to far away, or self contained - can't be done
    if d >= (r1 + r2) or d <= math.fabs(r1 -r2):
        return None

    a = (pow(r1, 2) - pow(r2, 2) + pow(d, 2)) / (2*d)
    h  = math.sqrt(pow(r1, 2) - pow(a, 2))
    x0 = p1[0] + a*(p2[0] - p1[0])/d 
    y0 = p1[1] + a*(p2[1] - p1[1])/d
    rx = -(p2[1] - p1[1]) * (h/d)
    ry = -(p2[0] - p1[0]) * (h / d)
    return [(x0+rx, y0-ry), (x0-rx, y0+ry)]

# def get_all_intersecting_points(circles):
#     points = []
#     num = len(circles)
#     for i in range(num):
#         j = i + 1
#         for k in range(j, num):
#             res = get_two_circles_intersecting_points(circles[i], circles[k])
#             if res:
#                 points.extend(res)
#     return points

def get_all_intersecting_points(beacons, distances):
    points = []
#     num = len(distances)
#     for i in range(num):
#         j = i + 1
#         for k in range(j, num):
#             res = get_two_circles_intersecting_points(circles[i], circles[k])
#             if res:
#                 points.extend(res)
    for i in distances:
        for j in distances:
            if (i!=j):
                c1=circle(beacons[i], distances[i])
                c2=circle(beacons[j], distances[j])
                res = get_two_circles_intersecting_points(c1,c2) 
                if res:
                    points.extend(res)
    return points

def is_contained_in_circles(point, circles):
    print point.x, point.y
    for i in range(len(circles)):
        if (get_two_points_distance(point, circles[i].center) > (circles[i].radius)):
            return False
    return True

def get_polygon_center(points):
    center = point(0, 0)
    num = len(points)
    for i in range(num):
        center.x += points[i].x
        center.y += points[i].y
    center.x /= num
    center.y /= num
    return center

def compareDistances(d1, d2):
    error = 0
    for i in d1:
        error += abs(d1[i] - d2[i])
    return error

def compute_pos(b1, b2, b3):
    beacons = dict() # beacons, address=>position
    beacons[10] = (4.0, 0.0)
    beacons[11] = (0.0, 4.0)
    beacons[13] = (0.0, 0.0)
#    beacons[12] = (5.0, 10)
    
#     c1 = circle(p1, 1.11)
#     c2 = circle(p2, 2.45)
#     c3 = circle(p3, 1.14)

    distances = dict()
    distances[10] = b1
    distances[11] = b2
    distances[13] = b3

    intersectingPoints = get_all_intersecting_points(beacons, distances)
    print len(intersectingPoints)
    
    minError = 65535
    closestPoint = None
    
    for i in intersectingPoints:
        calculated = dict()
        for j in beacons:
            if distances.get(j):
#                 print i, j
                calculated[j] = get_two_points_distance(beacons[j], i)
        print calculated
        error = compareDistances(distances, calculated)
        if (error<minError):
            minError = error
            closestPoint = i
        
    return closestPoint
#     print intersectingPoints
#     
#     inner_points = []
#     for p in intersectingPoints:
#         if is_contained_in_circles(p, circle_list):
#             inner_points.append(p) 
#     
#     center = get_polygon_center(inner_points)
#     in_json = json_data([c1, c2, c3], [p1, p2, p3], center)
# 
#     out_json = json.dumps(in_json, sort_keys=True,
#                      indent=4, default=serialize_instance)
#     
#     print out_json
#     with open("data.json", 'w') as fw:
#         fw.write(out_json)