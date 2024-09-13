#include <opencv2/opencv.hpp>
#include <opencv2/objdetect.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <iostream>
#include <sys/stat.h>  // For creating the directory
#include <sstream>     // For generating filenames with a counter

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

int main() {
    string path = "../images/the.jpg";
    Mat img1 = imread(path);
    
    if (img1.empty()) {
        cout << "Image not read properly" << endl;
        return -1;
    }

    Mat resized_image = resizeWithPadding(img1, 224);
    
    if (resized_image.empty()) {
        cout << "Error: Unable to load image!" << endl;
        return -1;
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

    imshow("manual grayscale", gray);

    // Create the 'processed' folder if it doesn't exist
    struct stat info;
    if (stat("../processed", &info) != 0) {
        mkdir("../processed", 0777);  // Creates folder with read/write/execute permissions
    }

    // Add a counter for the filenames
    static int counter = 1;

    // Generate a unique filename
    std::ostringstream filename;
    filename << "../processed/output_" << counter << ".jpg";

    // Save the processed image with the unique filename
    imwrite(filename.str(), gray);
    cout << "Image saved as " << filename.str() << endl;

    counter++;  // Increment the counter for the next run

    waitKey(0);

    return 0;
}
