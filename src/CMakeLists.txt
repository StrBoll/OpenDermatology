cmake_minimum_required(VERSION 3.10)

# Set project name
project(OpenCV_Project)

# Enable C++17 standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Find OpenCV package
find_package(OpenCV REQUIRED)

# Include OpenCV directories
include_directories(${OpenCV_INCLUDE_DIRS})

# Add the executable
add_executable(OpenDerm Input.cpp)

# Link OpenCV libraries
target_link_libraries(OpenDerm ${OpenCV_LIBS})
