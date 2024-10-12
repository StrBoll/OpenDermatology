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
   // Health check endpoint
   app().registerHandler("/healthCheck", [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {
        auto resp = HttpResponse::newHttpResponse();
        resp->setBody("Server is running");
        callback(resp);
    });

   // Upload image endpoint
   app().registerHandler("/uploadImage", [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {
        

        auto resp = HttpResponse::newHttpResponse();
        resp->setBody("No file uploaded or wrong request method.");
        callback(resp);
    });

    // Set the server to listen on port 3000
    app().setLogLevel(trantor::Logger::kTrace);  
    LOG_INFO << "Starting server on port 3000";
    app().addListener("0.0.0.0", 3000).run();
}
