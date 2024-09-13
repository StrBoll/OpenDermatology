
README 
By: Phillip Boll

Installing OpenCV C++ with Homebrew on Mac:
--------------------------------------------
1. Install homebrew (MacOS only) if you don't already have it:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

2. Install OpenCV:
brew install opencv

3. Install cmake:
brew install cmake




Example Workflow when first compiling project:
-------------------------------------------

cd /Users/phillipboll3/Desktop/openderm/src
rm -rf build
mkdir build # Make sure your build file is located in the /src folder 
cd build
cmake ..
make
./OpenDerm  # Or the name you set for your executable (You can find the name for the executable in the CMakeLists.txt file)



Example Workflow when updating executable and Recompiling:
-----------------------------------------------------------

cd /Users/phillipboll3/Desktop/openderm/src/build
make clean   # only run this when you make huge changes to multiple source files and want to completely recompile from scratch
make 
./OpenDerm


