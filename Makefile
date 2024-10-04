# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++17 -Wall `pkg-config --cflags opencv4 libpqxx`
LDFLAGS = `pkg-config --libs opencv4 libpqxx`

# Directories
SRCDIR = src
INCDIR = include
BUILDDIR = build
TARGET = OpenDerm

# Source files
SRCFILES = $(wildcard $(SRCDIR)/*.cpp)
OBJFILES = $(patsubst $(SRCDIR)/%.cpp, $(BUILDDIR)/%.o, $(SRCFILES))

# Default target to build the project
all: $(TARGET)

# Rule to build the target executable
$(TARGET): $(OBJFILES)
	$(CXX) -o $(BUILDDIR)/$(TARGET) $(OBJFILES) $(LDFLAGS)

# Rule to compile .cpp files to .o object files
$(BUILDDIR)/%.o: $(SRCDIR)/%.cpp | $(BUILDDIR)
	$(CXX) $(CXXFLAGS) -I$(INCDIR) -c $< -o $@

# Create the build directory if it doesn't exist
$(BUILDDIR):
	mkdir -p $(BUILDDIR)

# Clean build files
clean:
	rm -rf $(BUILDDIR)/*.o $(BUILDDIR)/$(TARGET)

