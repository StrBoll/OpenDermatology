#ifndef db_h
#define db_h

#include <pqxx/pqxx>
#include <string> 


bool insertImageDB(const char *image_binary, const char* file_name, );

bool insertUserDB();





#endif