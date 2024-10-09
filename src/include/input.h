#ifndef input_h
#define input_h
#include <string> 

using namespace std;

Mat resizeWithPadding(Mat& image, int sizeWanted);
void normalizeImage(Mat& image);
bool processImage(string& imagePath);




#endif