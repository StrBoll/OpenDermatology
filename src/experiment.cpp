#include <opencv2/opencv.hpp>
#include <opencv2/objdetect.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <iostream>




using namespace cv;
using namespace std;


/*
 
 Section 1: Reading Images
  
 
 */



Mat resizeWithPadding(Mat& image, int sizeWanted){
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
    // Define mean and std
    Scalar mean = Scalar(0.485, 0.456, 0.406);  // BGR (since OpenCV uses BGR)
    Scalar stddeviation = Scalar(0.229, 0.224, 0.225);
    
    // Convert the image to float32 for normalization
    image.convertTo(image, CV_32F, 1.0 / 255.0);  // Scale to [0, 1]
    
    // Normalize: subtract mean and divide by stddev
    subtract(image, mean, image);    // Mean subtraction
    divide(image, stddeviation, image);    // Std division
    
    
    // This is actually pretty simple, I just searched for the algorithm to normalize images on the internet. It's the same no matter what library you use to pre-process the images.
    
}



int main() {
    
    
    string path = "../images/the.jpg";
    
    // path should be used whenever trying to call upon an image or video from resources folder
    
    // for example:
    
    Mat img1 = imread(path);
    
    if (img1.empty()){
        cout << "Image not read properly" << endl;
        return -1;
    }
    
    
    // Now to read out the properties of the image
    
   /* cout << "Width : " << img1.size().width << endl;
    cout << "Height : " << img1.size().height << endl;
    
    
    // now for the properties of the image RGB
    
    // also known as channels
    
    cout << "Channels AKA RGB : " << img1.channels() << endl;
    */
    
    
    
    
    Mat resized_image;
    
    
    
    
    //resize(img1, resized_image, Size(224, 224));
    
    
    // Issue with this simpler method is that the aspect ratio becomes messed up almost always
    
    
    // The solution is that we should pad with white space, I found an article on the library for OpenCV about doing so
    
    //resizeWithPadding(Mat& image, int sizeWanted){
    
   resized_image = resizeWithPadding(img1, 224);
    
    
    
    
    
    
    // imshow("Regular Image", img1);
    
    //imshow("Resized Image", resized_image);
    
    // now we add a delay which prevents the image from automatically closing until we press the close button
    
    
    
    
    // Now I will attempt to convert to grayscale
    
    if (resized_image.empty()){
        cout << "Error: Unable to load image!" << endl;
        return -1;
    }
    
    // Split into channels of Blue Green and Red
    
    vector<Mat> bgr_channels;
    split(resized_image, bgr_channels);
    
    Mat B = bgr_channels[0];
    Mat G = bgr_channels[1];
    Mat R = bgr_channels[2];
    
    
    // now the blue green and red are split into their own matrices in the vector of matrices called bgr_channels. The vector at element 1 is a matrix of Blue pixel values, the vector at element 2 is a matrix of Green pixel values, and the vector at element 3 is a matrix of Red pixel values
    
    
    // Create an empty matrix which will store our image in grayscale
    
    Mat gray = Mat::zeros(resized_image.rows, resized_image.cols, CV_8UC1);
    
    
    
    
    // Apply the formula for turning RGB to Grayscale with the following:
    
    
    for (unsigned int i = 0; i < resized_image.rows; i++){
        for (unsigned int j = 0; j < resized_image.cols; j++){
            gray.at<uchar>(i,j) = static_cast<uchar>(
            0.2989 * R.at<uchar>(i,j) +
            0.5870 * G.at<uchar>(i,j) +
                                                     0.1140 * B.at<uchar>(i,j));
                                                     
                                                     
        }
    }
    
    
    
    
    // now to normalize the images to the pixel range expected by the CNN, we create a void normalize image function that you can simply pass the intended target as the argument and the rest is taken care of
    
    normalizeImage(gray);
    
    
    
    imshow("manual grayscale", gray);
    
    
    
    
    
    
    
    
    
    
    
    
    waitKey(0);
    
    
    
    
}


