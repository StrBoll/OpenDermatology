#include "input.h"
#include "db.h"

using namespace cv;
using namespace std;
using namespace pqxx;
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



bool processImage(Mat& img) {

    if (img.empty()) {
        cerr << "Image is empty" << endl;
        return false;
    }

    
    Mat resized_image;

    try {
        resized_image = resizeWithPadding(img, 224);
        normalizeImage(resized_image);
        Mat grayscale;
        cvtColor(resized_image, grayscale, COLOR_BGR2GRAY);
        sendToDatabase(grayscale);
    } 
    catch (const exception &e) {
        cerr << "error during processing" << endl;
        cerr << e.what() << endl;
        return false;
    }

    return true;
}

bool sendToDatabase(Mat& img){
    
    int size = img.total() * img.elemSize();
    const uchar* data = img.data; // values are only positive

    // Some trial and error, found that its better to init as unsigned char* and then cast 
    // it to const char* since with OpenCV they only use positive values and I guess it saves space on the stack

    try {
        insertImageDB(reinterpret_cast<const char*>(data), size, "Test_image");
    } catch (const exception & e){
        cerr << e.what() << endl;
        return false;
        
    }

    return true;
    

}


