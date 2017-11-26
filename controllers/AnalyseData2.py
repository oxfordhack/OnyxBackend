import json
import sys
import requests
# import main

sample_data1 = {
            "_id": "5a19900acfbb9200146c31f5",
            "phoneID": "User 1",
            "allocatedmemory": 200,
            "__v": 3,
            "files": [
                {
                    "_id": "5a19ddb3a931761948293d06",
                    "size": 50,
                    "filename": "lollies",
                    "__v": 0
                },
                {
                    "_id": "5a19ddcc0b52a3194c55a12a",
                    "size": 40,
                    "filename": "legend",
                    "__v": 0
                },
                {
                    "_id": "5a19de19fb2572195086128b",
                    "size": 20,
                    "filename": "dancing",
                    "__v": 0
                }
            ]
        }

sample_data2 = {
            "_id": "5a19900acfbb9200146c31f6",
            "phoneID": "User 2",
            "allocatedmemory": 300,
            "__v": 3,
            "files": [
                {
                    "_id": "5a19ddb3a931761948293d06",
                    "size": 150,
                    "filename": "lollies",
                    "__v": 0
                },
                {
                    "_id": "5a19ddcc0b52a3194c55a12a",
                    "size": 40,
                    "filename": "legend",
                    "__v": 0
                },
                {
                    "_id": "5a19de19fb2572195086128b",
                    "size": 10,
                    "filename": "dancing",
                    "__v": 0
                }
            ]
        }

sample_data3 = {
            "_id": "5a19900acfbb9200146c31f7",
            "phoneID": "User 3",
            "allocatedmemory": 700,
            "__v": 3,
            "files": [
                {
                    "_id": "5a19ddb3a931761948293d06",
                    "size": 100,
                    "filename": "lollies",
                    "__v": 0
                },
                {
                    "_id": "5a19ddcc0b52a3194c55a12a",
                    "size": 200,
                    "filename": "legend",
                    "__v": 0
                },
                {
                    "_id": "5a19de19fb2572195086128b",
                    "size": 50,
                    "filename": "dancing",
                    "__v": 0
                }
            ]
        }

json_list = [json.dumps(sample_data1), json.dumps(sample_data2), json.dumps(sample_data3)]

def sendRequest(url, paramas):
    r = requests.post(url, data=paramas)
    print(r)

def query_candidate(candidates_JSON):
    dict = json.loads(candidates_JSON)  # convert json into dictionary
    max = dict["allocatedmemory"]
    used_space = 0
    for i in range(len(dict["files"])):
            used_space += dict["files"][i]["size"]
    empty_space = max - used_space
    return empty_space, used_space

def return_optimal_id(candiates):
    max_available = query_candidate(candiates[0])[0]
    print(max_available)
    ans_dict = {}
    for i in candiates:
            if max_available < query_candidate(i)[0]:
                    max_available = query_candidate(i)[0]
            ans_dict[query_candidate(i)[0]] = json.loads(i)["phoneID"]
    
    print(ans_dict[max_available])
    sys.stdout.flush()
#        sendRequest('localhost:3000/storer/suitablestorerID', ans_dict[max_available])

# print return_optimal_id(json_list)
# print sys.argv[1]
#
if __name__ == '__main__':
        arg = sys.argv[1]
        return_optimal_id(arg)
#        sys.stdout.flush()

