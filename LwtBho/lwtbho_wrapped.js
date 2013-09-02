L"function totalLeftOffset(element)"
L"{"
L"	var amount = 0;"
L"	while (element != null)"
L"	{"
L"		amount += element.offsetLeft;"
L"		element = element.offsetParent;"
L"	}"
L"	return amount;"
L"}"
L""
L"function totalTopOffset(element)"
L"{"
L"	var amount = 0;"
L"	while (element != null)"
L"	{"
L"		amount += element.offsetTop;"
L"		element = element.offsetParent;"
L"	}"
L"	return amount;"
L"}"
L""
L"function fixPageXY(e)"
L"{"
L"	if (e.pageX == null && e.clientX != null )"
L"	{"
L"		var html = document.documentElement;"
L"		var body = document.body;"
L"		e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);"
L"		e.pageX -= html.clientLeft || 0;"
L"		e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);"
L"		e.pageY -= html.clientTop || 0;"
L"	}"
L"}"
L""
L"function setSelection(elem, lastterm, curTerm)"
L"{"
L"	elem.id = 'lwtcursel';"
L"	lastterm.setAttribute('lwtcursel', curTerm);"
L"	elem.className = elem.className + ' lwtSel';"
L"}"
L"function getSelection()"
L"{"
L"	var elem = document.getElementById('lwtcursel');"
L"	if (elem === null)"
L"		return '';"
L"	return elem.getAttribute('lwtcursel');"
L"}"
L""
L"function removeSelection()"
L"{"
L"	var elem = document.getElementById('lwtcursel');"
L"	if (elem == null)"
L"	{"
L"		return;"
L"	}"
L"	elem.id = '';"
L"	document.getElementById('lwtlasthovered').setAttribute('lwtcursel','');"
L"	var curClass = elem.className;"
L"	var lastSpace = curClass.lastIndexOf(' ');"
L"	if (lastSpace >= 0)"
L"	{"
L"		var putClass = curClass.substr(0, lastSpace + 1);"
L"		elem.className = putClass;"
L"	}"
L"}"
L""
L"function XOnElement(x, elem)"
L"{"
L"	if (x < totalLeftOffset(elem) || x >= totalLeftOffset(elem) + elem.offsetWidth)"
L"	{"
L"		return false;"
L"	}"
L"	return true;"
L"}"
L""
L"function YOnElement(y, elem)"
L"{"
L"	if (y < totalTopOffset(elem) || y >= totalTopOffset(elem) + elem.offsetHeight)"
L"	{"
L"		return false;"
L"	}"
L"	return true;"
L"}"
L""
L"function XYOnElement(x, y, elem)"
L"{"
L"	return (XOnElement(x, elem) && YOnElement(y, elem));"
L"}"
L""
L"function lwtcontextexit()"
L"{"
L"	removeSelection();"
L"	CloseOpenDialogs();"
L"}"
L""
L"function lwtdivmout(e)"
L"{"
L"	fixPageXY(e);"
L"	var statbox = window.curStatbox;"
L"	var bVal = XYOnElement(e.pageX, e.pageY, statbox);"
L"	if (bVal == false)"
L"	{"
L"		lwtmout(e);"
L"	}"
L"}"
L""
L"function lwtmout(e)"
L"{"
L"	fixPageXY(e);"
L"	var statbox = window.curStatbox;"
L"	if (!XYOnElement(e.pageX, e.pageY, statbox))"
L"	{"
L"		lwtcontextexit();"
L"	}"
L"}"
L""
L"function CloseOpenDialogs()"
L"{"
L"	window.curStatbox.style.display = 'none';"
L"}"
L""
L"function lwtkeypress()"
L"{"
L"	if (document.getElementById('lwtlasthovered').getAttribute('lwtcursel') == '')"
L"	{"
L"		return;"
L"	}"
L"	var e = window.event;"
L"	if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)"
L"	{"
L"		return;"
L"		alert('in lwtkeypress return!');"
L"	}"
L"	switch(e.keyCode)"
L"	{"
L"		case 49:"
L"			document.getElementById('lwtsetstat1').click();"
L"			break;"
L"		case 50:"
L"			document.getElementById('lwtsetstat2').click();"
L"			break;"
L"		case 51:"
L"			document.getElementById('lwtsetstat3').click();"
L"			break;"
L"		case 52:"
L"			document.getElementById('lwtsetstat4').click();"
L"			break;"
L"		case 53:"
L"			document.getElementById('lwtsetstat5').click();"
L"			break;"
L"		case 87:"
L"			document.getElementById('lwtsetstat99').click();"
L"			break;"
L"		case 73:"
L"			document.getElementById('lwtsetstat98').click();"
L"			break;"
L"		case 85:"
L"			document.getElementById('lwtsetstat0').click();"
L"			break;"
L"		case 27:"
L"			CloseOpenDialogs();"
L"			break;"
L"	}"
L"}"
L""
L"function ExtrapLink(elem, linkForm, curTerm)"
L"{"
L"	if (elem == null) {return;}"
L"	var extrap = 'javascript:void(0);';"
L"	if (linkForm.indexOf('*') == 0)"
L"	{"
L"		extrap = linkForm.substr(1, linkForm.length);"
L"		extrap = extrap.replace('###', curTerm);"
L"		elem.setAttribute('target', '_blank');"
L"	}"
L"	else if (linkForm.indexOf('###') >= 0)"
L"	{"
L"		extrap = linkForm.replace('###', curTerm);"
L"		elem.setAttribute('target', '_blank');"
L"	}"
L"	elem.setAttribute('href', extrap);"
L"}"
L""
L"function lwtmover(whichid, e, origin)"
L"{"
L"	removeSelection();"
L"	var divRec = document.getElementById(whichid);"
L"	if (divRec == null) {alert('could not locate divRec');}"
L"	var curTerm = divRec.getAttribute('lwtterm');"
L"	var lastterm = document.getElementById('lwtlasthovered');"
L"	if (lastterm == null) {alert('could not loccated lasthovered field');}"
L"	lastterm.setAttribute('lwtterm', curTerm);"
L"	lastterm.setAttribute('lwtstat', divRec.getAttribute('lwtstat'));"
L"	setSelection(origin, lastterm, curTerm);"
L"	fixPageXY(e);"
L"	lwtshowinlinestat(e, curTerm, origin);"
L"	var infobox = document.getElementById('lwtinfobox');"
L"	if (infobox == null) {alert('could not locate infobox to render popup');}"
L"	infobox.style.left = (e.pageX + 10) + 'px';"
L"	infobox.style.top = e.pageY + 'px';"
L"	document.getElementById('lwtinfoboxterm').innerText = curTerm;"
L"	document.getElementById('lwtinfoboxtrans').innerText = divRec.getAttribute('lwttrans');"
L"	document.getElementById('lwtinfoboxrom').innerText = divRec.getAttribute('lwtrom');"
L"}"
L""
L"function lwtshowinlinestat(e, curTerm, origin)"
L"{"
L"	var statbox = null;"
L"	var curStat = '';"
L""
L"	if (window.mwTermBegin != null)"
L"	{"
L"		statbox = document.getElementById('lwtInlineMWEndPopup');"
L"		if (window.keydownEventAttached == true)"
L"		{"
L"			document.detachEvent('onkeydown', lwtkeypress);"
L"			window.keydownEventAttached = false;"
L"		}"
L"	}"
L"	else"
L"	{"
L"		statbox = document.getElementById('lwtinlinestat');"
L"		curStat = document.getElementById('lwtcursel').className;"
L"		ExtrapLink(document.getElementById('lwtextrapdict1'), document.getElementById('lwtdict1').getAttribute('src'), curTerm);"
L"		ExtrapLink(document.getElementById('lwtextrapdict2'), document.getElementById('lwtdict2').getAttribute('src'), curTerm);"
L"		ExtrapLink(document.getElementById('lwtextrapgoogletrans'), document.getElementById('lwtgoogletrans').getAttribute('src'), curTerm);"
L"		if (window.keydownEventAttached != true)"
L"		{"
L"			document.attachEvent('onkeydown', lwtkeypress);"
L"			window.keydownEventAttached = true;"
L"		}"
L"	}"
L""
L"	if (statbox == null)"
L"	{"
L"		alert('could not locate inline status change popup');"
L"		return;"
L"	}"
L""
L"	window.curStatbox = statbox;"
L""
L"	var posElem = origin;"
L"	var altElem = e.srcElement;"
L"	var inlineTop2 = (totalTopOffset(posElem) + posElem.offsetHeight - 2);"
L"	var inlineTop = totalTopOffset(posElem);"
L"	if (curStat.indexOf('9') >= 0)"
L"	{"
L"		inlineTop -= 2;"
L"	}"
L""
L""
L"	statbox.style.left = totalLeftOffset(posElem) + 'px';"
L"	document.getElementById('lwtTermTrans').style.width = posElem.offsetWidth + 'px';"
L"	document.getElementById('lwtTermTrans2').style.width = posElem.offsetWidth + 'px';"
L"	statbox.style.top = inlineTop + 'px';"
L""
L"	var inlineBottom = inlineTop + statbox.offsetHeight;"
L"	statbox.style.display = 'block';"
L"	if (inlineBottom > window.pageYOffset + window.innerHeight)"
L"		statbox.scrollIntoView(false);"
L"}"
L""
L"function traverseDomTree_NextNodeByTagName(elem, aTagName)"
L"{"
L"	if (elem.hasChildNodes() == true)"
L"	{"
L"		if (elem.firstChild.tagName == aTagName)"
L"			return elem.firstChild;"
L"		else"
L"			return traverseDomTree_NextNodeByTagName(elem.firstChild, aTagName);"
L"	}"
L""
L"	var possNextElem = elem.nextSibling;"
L"	if (possNextElem == null)"
L"	{"
L"		while (elem.parentNode.nextSibling == null)"
L"		{"
L"			elem = elem.parentNode;"
L"			if (elem == null)"
L"				return null;"
L"		}"
L""
L"		if (elem.parentNode.nextSibling.tagName == aTagName)"
L"			return elem.parentNode.nextSibling;"
L"		else"
L"			return traverseDomTree_NextNodeByTagName(elem.parentNode.nextSibling, aTagName);"
L"	}"
L""
L"	if (possNextElem.tagName == aTagName)"
L"		return possNextElem;"
L"	else"
L"		return traverseDomTree_NextNodeByTagName(possNextElem, aTagName);"
L"}"
L""
L"function beginMW()"
L"{"
L"	window.mwTermBegin = document.getElementById('lwtcursel');"
L"	lwtcontextexit();"
L"}"
L""
L"function cancelMW()"
L"{"
L"	window.mwTermBegin = null;"
L"	lwtcontextexit();"
L"}"
L""
L"function captureMW(newStatus)"
L"{"
L"	var newTerm = getChosenMWTerm(document.getElementById('lwtcursel'));"
L"	cancelMW();"
L"	if (newTerm != '')"
L"	{"
L"		var lastterm = document.getElementById('lwtlasthovered');"
L"		if (lastterm == null) {alert('could not locate lasthovered field');}"
L"		lastterm.setAttribute('lwtterm', newTerm);"
L"		lastterm.setAttribute('lwtstat', '0');"
L""
L"		switch(newStatus)"
L"		{"
L"			case 49:"
L"				document.getElementById('lwtsetstat1').click();"
L"				break;"
L"			case 50:"
L"				document.getElementById('lwtsetstat2').click();"
L"				break;"
L"			case 51:"
L"				document.getElementById('lwtsetstat3').click();"
L"				break;"
L"			case 52:"
L"				document.getElementById('lwtsetstat4').click();"
L"				break;"
L"			case 53:"
L"				document.getElementById('lwtsetstat5').click();"
L"				break;"
L"			case 87:"
L"				document.getElementById('lwtsetstat99').click();"
L"				break;"
L"			case 73:"
L"				document.getElementById('lwtsetstat98').click();"
L"				break;"
L"		}"
L"	}"
L"	else"
L"		alert('Not a valid composite term selection.');"
L"}"
L""
L"function getChosenMWTerm(elemLastPart)"
L"{"
L"	var bWithSpaces = false;"
L"	if (document.getElementById('lwtwithspaces').getAttribute('value') == 'yes')"
L"		bWithSpaces = true;"
L""
L"	var curTerm = window.mwTermBegin.getAttribute('lwtterm');"
L"	if (curTerm.length <= 0)"
L"		return '';"
L"	var chosenMWTerm = curTerm;"
L""
L"	var elem = window.mwTermBegin;"
L"	for (var i = 0; i < 8; i++)"
L"	{"
L"		elem = traverseDomTree_NextNodeByTagName(elem, 'SPAN');"
L""
L"		if (elem == null)"
L"			return '';"
L""
L"		curTerm = elem.getAttribute('lwtterm');"
L"		if (curTerm.length <= 0)"
L"			i--;"
L"		else"
L"		{"
L"			if (bWithSpaces == true)"
L"				chosenMWTerm += ' ';"
L"			"
L"			chosenMWTerm += curTerm;"
L"			alert(chosenMWTerm);"
L""
L"			if (elem == elemLastPart)"
L"				return chosenMWTerm;"
L"		}"
L"	}"
L""
L"	return '';"
L"}"
L""
L"function getPossibleMWTermParts(elem)"
L"{"
L"	var mwList = new Array(8);"
L"	for (var i = 0; i < 8; i++)"
L"	{"
L"		mwList[i] = '';"
L"	}"
L""
L"	var curTerm = elem.getAttribute('lwtterm');"
L"		"
L"	if (curTerm.length <= 0)"
L"		return mwList;"
L""
L"	for (0; i < 8; i++)"
L"	{"
L"		elem = traverseDomTree_NextNodeByTagName(elem, 'SPAN');"
L""
L"		if (elem == null)"
L"			return mwList;"
L""
L"		if (elem.className == 'lwtsent')"
L"			return mwList;"
L""
L"		curTerm = elem.getAttribute('lwtterm');"
L"		if (curTerm.length <= 0)"
L"			i--;"
L"		else"
L"			mwList[i] = curTerm;"
L"	}"
L""
L"	return mwList;"
L"}"
L"function getMWTermPartsAccrued(elem)"
L"{"
L"	var parts = getMWTermParts(elem);"
L"	var partsAccrued = new Array(8);"
L""
L"	for (var i = 0; i < 8; i++)"
L"	{"
L"		mwList[i] = '';"
L"	}"
L""
L"	var bWithSpaces = false;"
L"	if (document.getElementById('lwtwithspaces').getAttribute('value') == 'yes')"
L"		bWithSpaces = true;"
L""
L"	var curTerm = elem.getAttribute('lwtterm');"
L"		"
L"	if (curTerm.length <= 0)"
L"		return mwList;"
L""
L"	var accruedTerm = curTerm;"
L""
L"	for (i = 0; i < 8 && parts[i] != ''; i++)"
L"	{"
L"		if (bWithSpaces == true)"
L"			accruedTerm += ' ';"
L""
L"		accruedTerm += parts[i];"
L"		partsAccrued[i] = accruedTerm;"
L"	}"
L""
L"	return partsAccrued;"
L"	"
L"}"