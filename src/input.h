#ifndef input_h
#define input_h
#include <opencv2/opencv.hpp>
#include <opencv2/objdetect.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <iostream>
#include <sys/stat.h>  
#include <sstream>
#include <string> 
#include <vector>
#include "db.h"

using namespace cv;
using namespace std;

Mat resizeWithPadding(Mat& image, int sizeWanted);
void normalizeImage(Mat& image);
bool processImage(Mat& imagePath);
bool sendToDatabase(Mat& img);
bool sendToFront(vector<unsigned char> image_byte_data);





#endif