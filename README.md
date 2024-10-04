
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

Other Libraries you must install:
--------------------------------------
pqxx

postgresql version 16 


Working with PSQL 
--------------------------------------

Note: You must change the username and password in db.cpp for each of the connections to your own user and password for postgresql
Note: You must create a database in your psql account, then copy and paste each of the tables from src/submissions.sql into your terminal to create those tables 

Note: You will get an error saying UFID(0) is not inside the user_submitted table, this is intentional. Essentially, we only allow images to be associated with a user submitted image, i.e. no one can inject images in without User Authorization and a valid UFID. 





Example Workflow when first compiling project:
-------------------------------------------

cd build
cmake ..
make
./build/OpenDerm  # Or the name you set for your executable (You can find the name for the executable in the CMakeLists.txt file)



Example Workflow when updating executable and Recompiling:
-----------------------------------------------------------

cd /Users/phillipboll3/Desktop/openderm/src/build
make clean   # only run this when you make huge changes to multiple source files and want to completely recompile from scratch
make 
./OpenDerm


