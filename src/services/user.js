import request from 'utils/request1';
import {config} from 'utils';
import querystring from 'querystring';
const { api } = config
const { users } = api

function get(url, params) {
    const str = params ? querystring.encode(params) : "";
    var url = str ? "http://172.12.1.206:9090/"+url + "?" + str : "http://172.12.1.206:9090/"+url;
    var reqHeaders = new Headers();
    reqHeaders.set("Content-Type", "application/x-www-form-urlencoded");
    var req =  new Request(url, {
        method: 'get',
        headers: reqHeaders,
    });
    return request(req);
}

function post(url, params) {
    const str = querystring.encode(params);
    var reqHeaders = new Headers();
    reqHeaders.set("Content-Type", "application/x-www-form-urlencoded");
    var req = new Request("http://172.12.1.206:9090/"+ url, {
        method: 'post',
        headers: reqHeaders,
        body: str
    });
    return request(req);
    
}

export async function query (params) {
  return post('v1/users/problem/findProblemAndAnswerLike', params);
}

export async function create (params) {
  return post('v1/users/problem/addProblem', params);
}

export async function remove (params) {
  return post('v1/users/problem/deleteProblem', params);
}

export async function update (params) {
  return post('v1/users/problem/updateProblem', params);
}
