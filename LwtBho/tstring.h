#ifndef tstring_INCLUDED
#define tstring_INCLUDED

#include <tchar.h>
#include <string>
#include <fstream>
#include <sstream>

namespace std
{
    typedef basic_string<TCHAR>         tstring;

    typedef basic_ostream<TCHAR>        tostream;
    typedef basic_istream<TCHAR>        tistream;
    typedef basic_iostream<TCHAR>       tiostream;

    typedef basic_ifstream<TCHAR>       tifstream;
    typedef basic_ofstream<TCHAR>       tofstream;
    typedef basic_fstream<TCHAR>        tfstream;

    typedef basic_stringstream<TCHAR>   tstringstream;
}

#endif