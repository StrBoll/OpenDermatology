#include <drogon/drogon.h>
#include <drogon/HttpAppFramework.h>
#include <drogon/MultiPart.h>
#include <drogon/HttpRequest.h>

#include <pqxx/pqxx>
#include "input.h"

using namespace drogon;
using namespace std;
using namespace pqxx;


int main () {
    // how to create functions for http requests: 

    /*app().registerHandler("/NameofFunction", [](const HttpRequest &request, function<void(const HttpResponse &)> &&callback){

        in here you would write your code for what it does etc..

        you can even implement pqxx to connect to the database in these http request called functions


    });
    */



   app().registerHandler("/healthCheck", [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {
        auto resp = HttpResponse::newHttpResponse();
        resp->setBody("Server is running");
        callback(resp);
    });


    app().registerHandler("/uploadImage", [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {
    
    // NEED TO REDO THIS PART WHEN WE GET THE FRONTEND TO SUCCESSFULLY TALK TO THE BACKEND 

    
    auto resp = HttpResponse::newHttpResponse();
    resp->setBody("File upload successful");
    callback(resp);

   });
   
    app().setLogLevel(trantor::Logger::kTrace);  
    LOG_INFO << "TRYING TO START!!!";
   app().addListener("0.0.0.0", 8080).run();
    LOG_INFO << "Starting server on port 8080";

}
