#include <drogon/drogon.h>
#include <pqxx/pqxx>
#include "include/input.h"

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


    app().registerHandler("/uploadImage", [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {


    auto images = request->getFiles();
    if (images.empty()){
        auto response = HttpResponse::newHttpResponse();
        response->setBody("No image found");
        callback(response);
        return ;
    }

    for (const auto& file : images){
        string filePath = file.getFileName();

        if (processImage(filePath) == true){
            cout << "Successfully processed " << filePath << endl;

        } else {
            auto response = HttpResponse::newHttpResponse();
            response->setStatusCode(k500InternalServerError);
            response->setBody("Image unable to be processed");
            callback(response);
            return;
        }


        
    }

    auto response = HttpResponse::newHttpResponse();
    response->setStatusCode(k200OK);
    response->setBody("Images processed successfully");
    callback(response);
    


   });

   app().addListener("0.0.0.0", 18080).run();


}
