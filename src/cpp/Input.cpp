#include <opencv2/opencv.hpp>
#include <opencv2/objdetect.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <iostream>
#include <sys/stat.h>  
#include <sstream>     
#include "db.h"

using namespace cv;
using namespace std;

/*
 Section 1: Reading Images
*/

Mat resizeWithPadding(Mat& image, int sizeWanted) {
    int oldHeight = image.rows;
    int oldWidth = image.cols;
    
    float aspectRatio = (float)sizeWanted / max(oldWidth, oldHeight);
    
    int newWidth = (int)(oldWidth * aspectRatio);
    int newHeight = (int)(oldHeight * aspectRatio);
    
    Mat resizedImage;
    resize(image, resizedImage, Size(newWidth, newHeight));
    
    Mat output = Mat::zeros(Size(sizeWanted, sizeWanted), CV_8UC3);
    
    int xPad = (sizeWanted - newWidth) / 2;
    int yPad = (sizeWanted - newHeight) / 2;
    
    resizedImage.copyTo(output(Rect(xPad, yPad, newWidth, newHeight)));
    
    return output;
}

void normalizeImage(Mat& image) {
    Scalar mean = Scalar(0.485, 0.456, 0.406);
    Scalar stddeviation = Scalar(0.229, 0.224, 0.225);
    
    image.convertTo(image, CV_32F, 1.0 / 255.0);
    
    subtract(image, mean, image);
    divide(image, stddeviation, image);
}


bool processImage(string& imagePath){
    string path = imagePath;
    Mat img1 = imread(path);
    
    if (img1.empty()) {
        cout << "Image not read properly" << endl;
        return false;
    }

    Mat resized_image = resizeWithPadding(img1, 224);
    
    if (resized_image.empty()) {
        cout << "Error: Unable to load image!" << endl;
        return false;
    }

    vector<Mat> bgr_channels;
    split(resized_image, bgr_channels);
    
    Mat B = bgr_channels[0];
    Mat G = bgr_channels[1];
    Mat R = bgr_channels[2];
    
    Mat gray = Mat::zeros(resized_image.rows, resized_image.cols, CV_8UC1);
    
    for (unsigned int i = 0; i < resized_image.rows; i++) {
        for (unsigned int j = 0; j < resized_image.cols; j++) {
            gray.at<uchar>(i, j) = static_cast<uchar>(
                0.2989 * R.at<uchar>(i, j) +
                0.5870 * G.at<uchar>(i, j) +
                0.1140 * B.at<uchar>(i, j));
        }
    }
    
    normalizeImage(gray);

    // imshow("manual grayscale", gray); // uncomment for showing image after grayscaling it


    // Add a counter for the filenames to store to database
    static int counter = 1;

    // basically lets us make a plethora of images numbered with simple titles 
    std::ostringstream filename;
    filename << "processed/output_" << counter << ".jpg";

    // Save the processed image with the unique filename
    imwrite(filename.str(), gray);


    // ----------------------------------------------------------------------------------------

        // Need to get UFID, but this is just for proof of concept:

        vector<uchar> buffer;
        imencode(".jpg", gray, buffer); 
        const char* image_binary = reinterpret_cast<const char*>(buffer.data());
        size_t image_size = buffer.size();


        insertImageDB(image_binary, image_size, filename.str());
    



    // ----------------------------------------------------------------------------------------


    cout << "Image saved as " << filename.str() << endl;

    counter++;  

    waitKey(0);

    
}
