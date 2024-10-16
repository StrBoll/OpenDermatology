#include <drogon/drogon.h>
#include <drogon/HttpAppFramework.h>
#include <drogon/MultiPart.h>
#include <pqxx/pqxx>
#include <opencv2/opencv.hpp>
#include <iostream>
#include "input.h"
#include "db.h"

using namespace drogon;
using namespace std;
using namespace pqxx;
using namespace cv;

void addCorsHeaders(const HttpResponsePtr &response) {
    response->addHeader("Access-Control-Allow-Origin", "*");
    response->addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response->addHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
}

int main() {
    app().registerHandler(
        "/{path}",
        [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {
            if (req->method() == HttpMethod::Options) {
                auto resp = HttpResponse::newHttpResponse();
                addCorsHeaders(resp);
                callback(resp);
                return;
            }
            callback(HttpResponse::newNotFoundResponse());
        },
        {Get, Post, Options} 
        );

    app().registerHandler("/healthCheck", [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {
        auto resp = HttpResponse::newHttpResponse();
        addCorsHeaders(resp);
        resp->setBody("Server is running");
        callback(resp);
    });

    app().registerHandler("/uploadImage", [](const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback) {
        try {
            MultiPartParser fileUpload;
            if (fileUpload.parse(req) != 0 || fileUpload.getFiles().empty()) {
                throw runtime_error("No files uploaded or parsing failed");
            }

            const auto &file = fileUpload.getFiles()[0];
            LOG_INFO << "Received file: " << file.getFileName() << " with key: " << file.getItemName();

            auto byteStream = file.fileContent();
            vector<uchar> buffer(byteStream.begin(), byteStream.end());
            Mat img = imdecode(buffer, IMREAD_COLOR);

            if (!processImage(img)) {
                throw runtime_error("Processing function not working");
            }
            
            // cout << "Error checkpoint for manual executable logs on SSH " << endl; 
            // the above is only necessary if try block is failing in the upload image component on frontend
            // When I checked the logs we were stopping at the part where I called processImage() and thats cause
            // - thats cause it was running an illegal call or something 
            
            auto resp = HttpResponse::newHttpResponse();
            addCorsHeaders(resp);
            resp->setBody("Image processed successfully!");
            callback(resp);
            
        } catch (const exception &e) {
            auto resp = HttpResponse::newHttpResponse();
            resp->setStatusCode(k500InternalServerError);
            addCorsHeaders(resp);
            resp->setBody("Try block in uploadImage server.cpp failed, error was: " );
            callback(resp);
        }
    });

    app().setLogLevel(trantor::Logger::kTrace);
    LOG_INFO << "Starting server on port 3000";
    app().addListener("0.0.0.0", 3000).run();
}
