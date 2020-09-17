/**
 * The purpose of this function is to get substring from box name.
 *
 * @param boxName
 * @returns
 */
export const getBoxSubstring = function(boxName) {
  var boxSubstring = null;
  if (boxName != undefined) {
    var lenBoxName = boxName.length;
    if (lenBoxName > 0) {
      boxSubstring = boxName.substring(0, lenBoxName - 1);
    }
  }
  return boxSubstring;
};

export const getCell = async function(cellUrl) {
  return fetch(cellUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
};

export const getTokenByRefreshToken = async function(
  cellUrl,
  p_target,
  refresh_token
) {
  // remove null or undefined
  const params = new URLSearchParams(
    Object.entries({
      grant_type: 'refresh_token',
      refresh_token,
      p_target,
    }).filter(item => item.slice(-1) !== null && item.slice(-1) !== undefined)
  );

  return fetch(cellUrl + '__token', {
    method: 'POST',
    body: params,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(res => {
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      return res;
    })
    .then(res => res.json());
};

/**
 * The purpose of this function is to fetch total cell count against one unit
 * @returns count
 */
export const retrieveCellRecordCount = function() {
  return 1;
  // let ManagerInfo = JSON.parse(sessionStorage.ManagerInfo);
  // if (ManagerInfo.isCellManager) {
  //   return 1;
  // }
  // var baseUrl = getClientStore().baseURL;
  // var token = getClientStore().token;
  // var objJdcContext = new _pc.PersoniumContext(baseUrl, '', '', '');
  // var accessor = objJdcContext.withToken(token);
  // var uri = baseUrl + '__ctl/Cell';
  // uri = uri + '?$top=0&$inlinecount=allpages';
  // var restAdapter = _pc.RestAdapterFactory.create(accessor);
  // var response = restAdapter.get(uri, 'application/json');
  // var json = response.bodyAsJson().d;
  // var count = json.__count;
  // return count;
};

export const validateSchemaURL = function(schemaURL) {
  var isHttp = schemaURL.substring(0, 5);
  var isHttps = schemaURL.substring(0, 6);
  var minURLLength = schemaURL.length;
  var letters = /^[0-9a-zA-Z-_.\/]+$/;
  var startHyphenUnderscore = /^[-_!@#$%^&*()=+]/;
  var urlLength = schemaURL.length;
  var schemaSplit = schemaURL.split('/');
  var isDot = -1;
  if (schemaURL.split('/').length > 2) {
    if (schemaSplit[2].length > 0) {
      isDot = schemaSplit[2].indexOf('.');
    }
  }
  var domainName = schemaURL.substring(8, urlLength);
  if (schemaURL == '' || schemaURL == null || schemaURL == undefined) {
    return false;
  } else if ((isHttp != 'http:' && isHttps != 'https:') || minURLLength <= 8) {
    return false;
  } else if (urlLength > 1024) {
    return false;
  } else if (domainName.match(startHyphenUnderscore)) {
    return false;
  } else if (!domainName.match(letters)) {
    return false;
  } else if (isDot == -1) {
    return false;
  } else if (domainName.indexOf('..') > -1 || domainName.indexOf('//') > -1) {
    return false;
  }
  return true;
};
