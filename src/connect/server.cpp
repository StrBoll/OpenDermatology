#include <drogon/drogon.h>
#include <pqxx/pqxx>

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


   app().registerHandler("/uploadImage", [](const HttpRequest &request, function<void(const HttpResponse&)> &&callback){


    auto images = request->getFiles();
    if (images.empty()){
        auto resp = HttpResponse::newHttpResponse();
        resp->setBody("No image found");
        callback(resp);
        return ;
    }

    else {

        for (auto iter = images.begin(); iter != images.end(); ++iter){
            
            

            
        }
    }


   });


}
