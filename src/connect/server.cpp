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


    // for handling uploading an image to the frontend

    // should send the image for processing through /cpp/input.cpp


    // afterwards, should connect to images database and store the image binary data there 

    
   });


}
