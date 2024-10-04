#ifndef db_h
#define db_h

#include <pqxx/pqxx>
#include <string> 


bool insertImageDB(const char *image_binary, size_t image_size, std::string file_name, int ufid = 0);

bool insertUserDB(int ufid, std::string first_name, std::string last_name);





#endif