#include "input.h"


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


bool processImage(Mat& img){

    if (img.empty()){
        cout << "Image is empty" << endl;
        return false;
    }
    

    Mat resized_image = resizeWithPadding(img, 224);
    
    if (resized_image.empty()) {
        cout << "Error: Unable to load image" << endl;
        return false;
    }

    static int counter = 1;

    Mat grayscale;

    normalizeImage(resized_image);

    cvtColor(resized_image, grayscale, COLOR_BGR2GRAY);

    std::ostringstream filename;
    filename << "processed/output_" << counter << ".jpg";

    // Save the processed image with the unique filename
    imwrite(filename.str(), grayscale);


    // ----------------------------------------------------------------------------------------

        // Need to get UFID, but this is just for proof of concept:

        /*
        vector<uchar> buffer;
        imencode(".jpg", gray, buffer); 
        const char* image_binary = reinterpret_cast<const char*>(buffer.data());
        size_t image_size = buffer.size();


        insertImageDB(image_binary, image_size, filename.str());
    
        */


    // ----------------------------------------------------------------------------------------


    cout << "Image saved as " << filename.str() << endl;

    counter++;  

    waitKey(0);

    
}
