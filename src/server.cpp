#include <drogon/drogon.h>
#include <drogon/HttpAppFramework.h>
#include <drogon/MultiPart.h>
#include <drogon/HttpRequest.h>
#include <pqxx/pqxx>
#include "input.h"
#include <opencv2/opencv.hpp>

using namespace drogon;
using namespace std;
using namespace pqxx;
using namespace cv;

int main () {
   app().registerHandler("/healthCheck", [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {
        auto resp = HttpResponse::newHttpResponse();
        resp->addHeader("Access-Control-Allow-Origin", "*");  // Allow all origins
        resp->addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp->addHeader("Access-Control-Allow-Headers", "Content-Type");
        resp->setBody("Server is running");
        callback(resp);
    });

   
app().registerHandler("/uploadImage", [](const HttpRequestPtr& req, std::function<void(const HttpResponsePtr &)> &&callback) {
        try {
        MultiPartParser fileUpload;

        if (fileUpload.parse(req) != 0 || fileUpload.getFiles().empty()) {
            throw runtime_error("No files uploaded or parsing failed");
        }
        for (const auto& file : fileUpload.getFiles()) {
            LOG_INFO << "Received file: " << file.getFileName() 
             << " with key: " << file.getItemName();
}
        auto &file = fileUpload.getFiles()[0];
        auto byteStream = file.fileContent();
        vector<uchar> buffer(byteStream.begin(), byteStream.end());
        Mat img = imdecode(buffer, IMREAD_COLOR);
        if (img.empty()){
            throw runtime_error("Image is empty");
        }
        if (processImage(img) == false){
            throw runtime_error("Image went to processing but returned failure");
        }

        auto resp = HttpResponse::newHttpResponse();
        resp->setBody("Image processed !!!!!");
        callback(resp);

        } catch (const exception & e){
            cerr << e.what() << endl;
            auto resp = HttpResponse::newHttpResponse();
            resp->setStatusCode(k500InternalServerError);
            resp->setBody("Try block unable to execute");
            callback(resp);
        }
        });
        
    app().setLogLevel(trantor::Logger::kTrace);  
    LOG_INFO << "Starting server on port 3000";
    app().addListener("0.0.0.0", 3000).run();
}