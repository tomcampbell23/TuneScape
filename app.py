from __future__ import print_function
from flask import Flask, render_template, jsonify
import os, sys, json

app = Flask(__name__)

@app.route('/')
def list_files():
    directory_path = './static/Music'
    music_list = os.listdir(directory_path)
    count = 0
    file_list = {}
    for dir in music_list:
        file_list[music_list[count]] = os.listdir(directory_path + '/' + str(dir))
        count +=1
    print(file_list, file=sys.stderr)
    return render_template('index.html', files=json.dumps(file_list))

if __name__ == '__main__':
    app.run(debug=True)
