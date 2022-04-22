/*
    This file can either be a class or a list of functions.
    It is in charge of communicating with the API through AJAX requests.
    Components that require the API will import this file.
    This file will implement methods such as sendPost.
 */

import ApiUrl from "../ApiUrl";
import apiUrl from "../ApiUrl";

export {listPosts, sendPost, getPost, listTrends, toggleLike};


/*
    Retrieve all post publicated after timestamp.
    - ts: Timestamp in seconds from which to get posts

    API Endpoint : /list
    Method : GET
    Response format : JSON
    Parameters :
        - ts [Number] : Optional. Timestamp in seconds from which to get posts. Default : 0.

    Response (success) : Object :
        - ts [Number] : Current server timestamp.
        - messages [Array] : Array of retrieved posts. Each element is an object :
            - id [String] : Unique post identifier.
            - name [String] : Name of author.
            - message [String] : Post content.
            - ts [Number] : Post creation timestamp.
            - likes [Number] : Number of likes.
            - comments_count [Number] : Number of comments.
            - is_user_authenticated [Boolean] : True if the post's author was authenticated.
    Response (error) : Object :
        - error [string] : Error message.
 */
function listPosts(ts, onSuccess, onError) {
    let timeStamp;
    if (ts === undefined)
    {
        timeStamp = 0;
    }
    else
    {
        timeStamp = Number(ts);
        if (timeStamp < 0 || !Number.isInteger(timeStamp))
        {
            onError("Provided timestamp needs to be a positive integer.")
            return false;
        }
    }

    // Fetch resource
    apiGET("/list", {"ts": timeStamp}, onSuccess, onError);
}

/*
    Send a post

    API Endpoint : /send
    Method : POST
    Response format : JSON
    Parameters :
        - name [string] : Name of author. 3-16 characters.
        - message [string] : Post content. 3-256 characters.

    Response (success) : Object :
        - success [Boolean] : Always true on success.
    Response (error) : Object :
        - error [string] : Error message.
 */
function sendPost(name, message, onSuccess, onError) {
    const author = name.trim();
    const post = message.trim();

    if (author.length >= 3 && author.length <= 16 && post.length >= 3 && post.length <= 256)
    {
        apiREQUEST("POST", "/send", {"name": author, "message": post}, onSuccess, onError)
    }
}

/*
    Retrieve a single post from its id
    - id : id of the post to retrieve
    - onSuccess : Function to be provided with response
    - onError : Function to be provided with error message

    API Endpoint : /get
    Method : GET
    Response format : JSON
    Parameters :
        - id [Number] : id of requested post.

    Response (success) : Object :
        - success [Boolean] : Always true on success.
        - data [Object] : Details of retrieved post :
            - id [String] : Unique post identifier.
            - name [String] : Name of author.
            - message [String] : Post content.
            - ts [Number] : Post creation timestamp.
            - likes [Number] : Number of likes.
            - comments_count [Number] : Number of comments.
            - ip [string] : Public IP of post author.

    Response (error) : Object :
        - error [string] : Error message.
 */
function getPost(id, onSuccess, onError) {

    const postId = Number(id);
    if (postId < 0 || !Number.isInteger(postId))
    {
        onError("Provided id needs to be an positive integer.")
        return false;
    }

    apiGET("/get", {"id": postId}, onSuccess, onError);
}

/*
    Retrieve trending words

    API Endpoint : /trending
    Method : GET
    Response format : JSON

    Response (success) : Object :
    For each term, contains :
    - [Object] :
        - XXX [Number] : Number of occurences for word "XXX"
 */
function listTrends(onSuccess, onError) {
    apiGET("/trending", {}, onSuccess, onError);
}

/*
    Retrieve a list of most active users

    API Endpoint : /influencers
    Method : GET
    Response format : JSON
    Parameters :
        - count [Number] : Optional. Number of authors to retrieve. Defaults to 1.

    Response (success) : Object :
        - user_count [Number] : Total number of post authors.
        - influencers [Object] : List of most active authors. Each key is the name of an author which associated value is an object :
            - messages [Number] : Number of messages posted by this author.
            - comments [Number] : Number of comments posted by this author

    Response (error) : Object :
        - error [string] : Error message.
 */
function listInfluencers(count, onSuccess, onError) {

}

// Adds or removes a Like to specified post
function toggleLike(id, isLiked, onSuccess, onError) {
    const postId = Number(id);
    if (postId < 0 || !Number.isInteger(postId))
    {
        onError("Provided id needs to be an positive integer.")
        return false;
    }

    console.log("Toggling like. Current state : " + isLiked);

    if (isLiked)
    {
        removeLike(postId, onSuccess, onError);
    }
    else
    {
        addLike(postId, onSuccess, onError);
    }
}

/*
    Add a like to a post

    API Endpoint : /likes/send
    Method : PUT
    Response format : JSON
    Parameters :
        - message_id [Number] : id of post to like.

    Response (success) : Object :
        - success [Boolean] : Always true on success.
        - id [String] : id of liked post.

    Response (error) : Object :
        - error [string] : Error message.
 */
function addLike(id, onSuccess, onError) {
    apiREQUEST("PUT", "/likes/send", {"message_id": id}, onSuccess, onError);
}


/*
    Remove a like from a post

    API Endpoint : /likes/remove
    Method : DELETE
    Response format : JSON
    Parameters :
        - message_id [Number] : id of post to unlike.

    Response (success) : Object :
        - success [Boolean] : Always true on success.

    Response (error) : Object :
        - error [string] : Error message.
 */
function removeLike(id, onSuccess, onError) {
    apiREQUEST("DELETE", "/likes/remove", {"message_id": id}, onSuccess, onError);
}

/*
    Retrieve a list of most liked posts

    API Endpoint : /likes/top
    Method : GET
    Response format : JSON
    Parameters :
        - count [Number] : Optional. Amount of posts to retrieve. Defaults to 1.

    Response (success) : Object :
        - top [Array] : Array of post objects :
            - id [String] : Unique post identifier.
            - name [String] : Name of author.
            - message [String] : Post content.
            - ts [Number] : Post creation timestamp.
            - likes [Number] : Number of likes.
            - comments_count [Number] : Number of comments.
            - ip [string] : Public IP of post author.

    Response (error) : Object :
        - error [string] : Error message.
 */
function listTopPosts(count) {

}


/*
    Get the comments on a post

    API Endpoint : /comments/list
    Method : GET
    Response format : JSON
    Parameters :
        - message_id [Number] : Post id.

    Response (success) : Object :
        - comments [Array] : Array of comment objects :
            - name [String] : Name of author.
            - comment [String] : The comment.
            - ts [Number] : Comment creation timestamp.

    Response (error) : Object :
        - error [string] : Error message.
 */
function getPostComments(message_id) {

}

/*
    Send a comment on a post

    API Endpoint : /comments/send
    Method : POST
    Response format : JSON
    Parameters :
        - message_id [Number] : Post id.
        - name [String] : Name of author.
        - comment [String] : The comment to send.

    Response (success) : Object :
       - success [Boolean] : Always true on success.
       - id [Number] : id of post that received a comment.


    Response (error) : Object :
        - error [string] : Error message.
 */
function sendComment(message_id) {

}

/*
    Requests a resource from the specified endPoint as a GET request.
    - endPoint : Resource to fetch from API (for instance : "/list")
    - paramsObj : Object containing parameters for the API (for instance : {"ts:" 0})
    - onSuccess : Called on fetch success. Function is passed the response json.
    - onError. Called on fetch failure. Function is passed error message.
*/
function apiGET(endPoint, paramsObj, onSuccess, onError)
{
    // Request setup
    let paramString = buildRequestString(endPoint, paramsObj, "GET");
    const fetchOptions = {
        "method": "GET",
        "headers": {"Content-Type" : "application/x-www-form-urlencoded"}
    };

    apiFetch(paramString, fetchOptions, onSuccess, onError);
}

/*
    Requests a resource from the specified endPoint as a POST request.
    - endPoint : Resource to fetch from API (for instance : "/list")
    - paramsObj : Object containing parameters for the API (for instance : {"ts:" 0})
    - onSuccess : Called on fetch success. Function is passed the response json.
    - onError. Called on fetch failure. Function is passed error message.
*/
function apiREQUEST(method, endPoint, paramsObj, onSuccess, onError)
{
    // Request setup
    const resourceUrl = ApiUrl + endPoint;
    const paramString = buildRequestString(endPoint, paramsObj, "POST");
    const fetchOptions = {
        "method": method.toUpperCase(),
        "headers": {"Content-Type" : "application/x-www-form-urlencoded"},
        "body": paramString
    };

    apiFetch(resourceUrl, fetchOptions, onSuccess, onError);
}

/*
    Fetches a resource from the API
    - resource : Resource to fetch. Usually API + Endpoint (+ parameters for GET method)
    - Options : Method, headers, and body of the request.
    - onSuccess : Called on fetch success.
    - onError : Called on fetch error.
 */
function apiFetch(resource, options, onSuccess, onError)
{
    console.log("Fetching resource : " + resource);

    // Request execution
    // TODO : Use the error message provided by the API (how ??)

    const fetchResponsePromise = fetch(resource, options);
    fetchResponsePromise
        .then(response => {
            if (response.ok)
            {
                // The promise needs to be passed on to next .then() before we can access the response
                return response.json();
            }
            else
            {
                return Promise.reject(response.statusText);
            }
        })
        .then(response => {
            // SUCCESS CALLBACK
            onSuccess(response)
        })
        .catch(errorMessage => {
            // ERROR CALLBACK
            console.warn("An error occurred while fetching resource : " + errorMessage);
            onError(errorMessage);
        });
}

// Build a properly encoded string from an endpoint and key-value pairs of parameters
function buildRequestString(endPoint, params, method)
{
    // If GET request, start by appending endpoint to apiUrl
    let string = method === "GET" ? apiUrl + endPoint : "";

    // Append parameters if params is of correct format
    if (typeof(params)  === "object" && !Array.isArray(params) && Object.keys(params).length > 0)
    {
        // If GET method, append question mark to indicate start of parameters
        string += method === "GET" ? "?" : "";
        for (const key in params)
        {
            string += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
        }
        // Remove last "&"
        string = string.slice(0, -1);
    }
    return string;
}