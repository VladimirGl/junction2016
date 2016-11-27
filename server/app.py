#!/usr/bin/env python
# -*- coding: utf-8 -*- 

from flask import Flask, url_for, jsonify
from flask import request
from flask import make_response, current_app
from functools import update_wrapper

from process import *

app = Flask(__name__)


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

@app.errorhandler(404)
def page_not_found(e):
    return 'Not a page.'

@app.route('/cashmesh')
def api_ebutler():
    response = 0
    if 'get_users' in request.args:
        response = jsonify(get_users(request.args['get_users']))
    elif 'add_user' in request.args:
        response = jsonify(add_user(request.args['add_user']))
    elif 'rem_user' in request.args:
        response = jsonify(rem_user(request.args['rem_user']))
    elif 'get_positions' in request.args:
        response = jsonify(get_positions(request.args['get_positions']))
    elif 'add_beacon_values' in request.args:
        response = jsonify(add_positions(request.args['add_beacon_values']))
    elif 'get_goods' in request.args:
        response = jsonify(get_goods(request.args['get_goods']))
    elif 'get_heatmap' in request.args:
        response = jsonify(get_heatmap(request.args['get_heatmap']))
    elif 'get_beacon_values' in request.args:
        response = jsonify(get_beacon_values(request.args['get_beacon_values']))
    elif 'get_active_tickets' in request.args:
        response = jsonify(get_active_tickets(request.args['get_active_tickets']))
    elif 'pin_user' in request.args:
        response = jsonify(pin_user(request.args['pin_user']))
    elif 'unpin_user' in request.args:
        response = jsonify(unpin_user(request.args['unpin_user']))
    else:
        response = jsonify(json.dumps(request.args))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
