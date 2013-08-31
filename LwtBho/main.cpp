﻿#include "LwtBho.h"
//#include "C:\\Users\\Luis\\Desktop\\charlie\\prog\\utilities\\resedit\\projects\\resource.h"
//#include "assert.h"
//#include "dbdriver.h"
//#include <Windows.h>
//#include "tchar.h"
//#include "stdio.h"
//#include "Ocidl.h"
//#include "exdisp.h"
//#include "exdispid.h"
//#include "shlguid.h"
//#include "mshtml.h"
//#include "comutil.h"
//#include "connection.h"
//#include "query.h"
//#include "result.h"
//#include "manip.h"
//#include <fstream>
//#include <sstream>
//#include <vector>
//#include <map>
//#include <unordered_map>
//#include <unordered_set>
//#include <stack>
//#include <algorithm>
//#include <regex>
//#include <mshtmdid.h>
//#include "comip.h"
//#include "tiodbc.hpp"
//#include "chajUtil.h"
//#include "chajDOM.h"
//using namespace mysqlpp;
//using namespace std;
//using namespace chaj;
//using namespace chaj::DOM;
//using namespace chaj::COM;

#ifndef _DEBUG
	const CLSID BhoCLSID = {0xe72bb92,0x73d4,0x4bef,0xbc,0x8,0xfe,0x3b,0x96,0x85,0x93,0xa3};
	#define BhoCLSIDs  _T("{0E72BB92-73D4-4BEF-BC08-FE3B968593A3}")
	static const GUID CLSID_AddObject = 
	{ 0xe72bb92, 0x73d4, 0x4bef, { 0xbc, 0x8, 0xfe, 0x3b, 0x96, 0x85, 0x93, 0xa3} };
#else
	const CLSID BhoCLSID = {0x2bd807b2,0xb9a5,0x44f3,0x9a,0x32,0x7a,0x59,0xb0,0xdb,0xc8,0x55};
	#define BhoCLSIDs _T("{2BD807B2-B9A5-44F3-9A32-7A59B0DBC855}")
	static const GUID CLSID_AddObject = 
	{ 0x2bd807b2, 0xb9a5, 0x44f3, { 0x9a, 0x32, 0x7a, 0x59, 0xb0, 0xdb, 0xc8, 0x55 } };
#endif

class MyClassFactory : public IClassFactory
{ long ref;
  public:
  // IUnknown... (nb. this class is instantiated statically, which is why Release() doesn't delete it.)
  HRESULT STDMETHODCALLTYPE QueryInterface(REFIID riid, void **ppv) {if (riid==IID_IUnknown || riid==IID_IClassFactory) {*ppv=this; AddRef(); return S_OK;} else return E_NOINTERFACE;}
  ULONG STDMETHODCALLTYPE AddRef() {InterlockedIncrement(&gref); return InterlockedIncrement(&ref);}
  ULONG STDMETHODCALLTYPE Release() {int tmp = InterlockedDecrement(&ref); InterlockedDecrement(&gref); return tmp;}
  // IClassFactory...
  HRESULT STDMETHODCALLTYPE LockServer(BOOL b) {if (b) InterlockedIncrement(&gref); else InterlockedDecrement(&gref); return S_OK;}
	HRESULT STDMETHODCALLTYPE CreateInstance(LPUNKNOWN pUnkOuter, REFIID riid, LPVOID *ppvObj)
	{
		*ppvObj = NULL;
		if (pUnkOuter)
			return CLASS_E_NOAGGREGATION;
		
		LwtBho *bho=new LwtBho();
		bho->AddRef();
		HRESULT hr=bho->QueryInterface(riid, ppvObj);
		bho->Release();
		return hr;
	}
  // MyClassFactory...
  MyClassFactory() : ref(0) {}
};


STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID *ppvOut)
{ static MyClassFactory factory; *ppvOut = NULL;
  if (rclsid==BhoCLSID) {return factory.QueryInterface(riid,ppvOut);}
  else return CLASS_E_CLASSNOTAVAILABLE;
}

STDAPI DllCanUnloadNow(void)
{ return (gref>0)?S_FALSE:S_OK;
}

HRESULT __stdcall DllRegisterServer(void)
{
	HKEY pKey;

	tstring t1 = _T("CLSID\\");
	t1 += BhoCLSIDs;

	tstring t2 = _T("LWT BHO");
#ifdef _DEBUG
	t2 += _T("_d");

	tstring t4 = _T("C:\\Users\\Luis\\Documents\\Visual Studio 2012\\Projects\\dlltest\\Debug\\LwtBho_d.dll");
#else
	tstring t4 = _T("C:\\Users\\Luis\\Documents\\Visual Studio 2012\\Projects\\dlltest\\Release\\LwtBho.dll");
#endif
	tstring t3 = _T("clsid\\");
	t3 += BhoCLSIDs;
	t3 += _T("\\InprocServer32");

	tstring t5 = _T("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Browser Helper Objects\\");
	t5 += BhoCLSIDs;
	
	long l = RegCreateKeyEx(HKEY_CLASSES_ROOT, t1.c_str(), NULL, NULL, REG_OPTION_NON_VOLATILE, KEY_WRITE, NULL, &pKey, NULL);
	if (l != ERROR_SUCCESS)
	{
		TCHAR msg[500];
		FormatMessage(FORMAT_MESSAGE_FROM_SYSTEM, NULL, (DWORD)l, NULL, msg, 499, NULL);
		mb(msg, _T("123Caption"));
	}
	l = RegSetValueEx(pKey, NULL, NULL, REG_SZ, (BYTE*)t2.c_str(), 16);
	if (l != ERROR_SUCCESS)
	{
		TCHAR msg[500];
		FormatMessage(FORMAT_MESSAGE_FROM_SYSTEM, NULL, (DWORD)l, NULL, msg, 499, NULL);
		mb(msg, _T("124Caption"));
	}

    //GetModuleFileName(NULL, (LPWSTR)szBuff, sizeof(szBuff));

	l = RegCreateKeyEx(HKEY_CLASSES_ROOT, t3.c_str(), NULL, NULL, REG_OPTION_NON_VOLATILE, KEY_WRITE, NULL, &pKey, NULL);
	if (l != ERROR_SUCCESS)
	{
		TCHAR msg[500];
		FormatMessage(FORMAT_MESSAGE_FROM_SYSTEM, NULL, (DWORD)l, NULL, msg, 499, NULL);
		MessageBox(NULL, msg, _T("123Caption"), MB_OK);
	}
	l = RegSetValueEx(pKey, NULL, NULL, REG_SZ, (BYTE*)t4.c_str(), 160);
	if (l != ERROR_SUCCESS)
	{
		TCHAR msg[500];
		FormatMessage(FORMAT_MESSAGE_FROM_SYSTEM, NULL, (DWORD)l, NULL, msg, 499, NULL);
		MessageBox(NULL, msg, _T("124Caption"), MB_OK);
	}

	l = RegCreateKeyEx(HKEY_LOCAL_MACHINE, t5.c_str(), NULL, NULL, REG_OPTION_NON_VOLATILE, KEY_WRITE, NULL, &pKey, NULL);
	if (l != ERROR_SUCCESS)
	{
		TCHAR msg[500];
		FormatMessage(FORMAT_MESSAGE_FROM_SYSTEM, NULL, (DWORD)l, NULL, msg, 499, NULL);
		MessageBox(NULL, msg, _T("123Caption"), MB_OK);
	}

    return 1;
}

HRESULT __stdcall DllUnregisterServer()
{
	long l;

	tstring t1 = _T("CLSID\\");
	t1 += BhoCLSIDs;

	tstring t3 = _T("clsid\\");
	t3 += BhoCLSIDs;
	t3 += _T("\\InprocServer32");

	tstring t5 = _T("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Browser Helper Objects\\");
	t5 += BhoCLSIDs;

	l = RegDeleteKeyEx(HKEY_CLASSES_ROOT, t3.c_str(), KEY_WOW64_32KEY, NULL);
	if (l != ERROR_SUCCESS)
		MessageBox(NULL, _T("Err1"), _T("c"), MB_OK);
	l = RegDeleteKeyEx(HKEY_CLASSES_ROOT, t1.c_str(), KEY_WOW64_32KEY, NULL);
	if (l != ERROR_SUCCESS)
		MessageBox(NULL, _T("Err2"), _T("c"), MB_OK);
	l = RegDeleteKeyEx(HKEY_LOCAL_MACHINE, t5.c_str(), KEY_WOW64_32KEY, NULL);
	if (l != ERROR_SUCCESS)
		MessageBox(NULL, _T("Err3"), _T("c"), MB_OK);

    return l;
}


extern "C" BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpvReserved)
{
	hInstance = hinstDLL;
	switch(fdwReason)
	{
		case DLL_PROCESS_ATTACH:
		{
			DisableThreadLibraryCalls(hinstDLL);

			TCHAR pszLoader[MAX_PATH];
			GetModuleFileName(NULL, pszLoader, MAX_PATH);
			_tcslwr(pszLoader);
			if (_tcsstr(pszLoader, _T("explorer.exe"))) 
				return FALSE;

			return TRUE;
		}
	}
}