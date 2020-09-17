import {
  getBoxSubstring,
  getCell,
  retrieveCellRecordCount,
  getTokenByRefreshToken,
} from './common';
import { getClientStore, setClientStore } from './utils/clientStore';

class Home {
  constructor() {
    /** Global variable to store the number of units for a user. */
    this.noOfUnits = 0;
    this.resElasticSearch = 0;
    this.discStorageAvailable = 0;
    this.dataStorageAvailable = 0;
    this.discStorageUsed = 0;
    this.dataStorageUsed = 0;
    this.apiVersion = '0';

    this.opts = {
      lines: 8, // The number of lines to draw
      length: 0, // The length of each line
      width: 7, // The line thickness
      radius: 11, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#b6b6b6', // #rgb or #rrggbb
      speed: 1.2, // Rounds per second
      trail: 68, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto', // Left position relative to parent in px
    };
  }

  /**
   * The purpose of this function is to load cell profile page.
   */
  loadCellDetails(data) {
    this.parseToken(data); // store token in clientStore
    var token = getClientStore().token;
    var refreshToken = getClientStore().refreshToken;
    var expiresIn = getClientStore().expiresIn;
    sessionStorage.tempToken = token;
    sessionStorage.tempRefreshToken = refreshToken;
    sessionStorage.tempExpiresIn = expiresIn;
    this.openResourceManagement();
  }

  /**
   * The purpose of this function is to open resource management page.
   */
  openResourceManagement() {
    var target = getClientStore().baseURL;
    var token = getClientStore().token;
    sessionStorage.tabName = '';
    sessionStorage.selectedcell = '';
    sessionStorage.selectedcellUrl = '';
    sessionStorage.target = target;
    sessionStorage.token = token;
    this.getCellCountAndOpenPage();
    sessionStorage.isSocialGraph = 'false';
    sessionStorage.isResourceMgmt = 'true';
  }

  /**
   * The purpose of this function is to load environment page
   * based on the cell count
   * @param response
   */
  getCellCountAndOpenPage() {
    var totalCellCount = retrieveCellRecordCount();
    sessionStorage.totalCellCountForUnit = totalCellCount;
    // if (totalCellCount == 0) {
    //   $('#mainContainer').hide();
    //   //open create cell popup
    //   var ucellP = new cellUI.popup();
    //   ucellP.openAutoPopup();
    //   setTimeout(function() {
    //     $('#mainContainer').show();
    //     if (document.getElementById('spinnerEnvt') != null) {
    //       $('#spinnerEnvt').remove();
    //     }
    //   }, 300);
    // } else if (totalCellCount > 0) {
    // }
  }

  getHashParams() {
    let hash = location.hash.substring(1);
    let params = hash.split('&');
    let arrParam = {};
    for (var i in params) {
      var param = params[i].split('=');
      arrParam[param[0]] = decodeURIComponent(param[1]);
    }
    // Clear fragments
    location.hash = '';

    return arrParam;
  }

  /**
   * The purpose of this function is to Store selected environment and unit
   * @param envName
   * @param unitURL
   * @param envID
   */
  storeEnvDetails() {
    this.getUserPrivilege();
  }

  /**
   * The purpose of this function is retrieve user privilege.
   *
   * @param jsonData
   */
  getUserPrivilege() {
    var target = sessionStorage.selectedUnitUrl;
    let ManagerInfo = JSON.parse(sessionStorage.ManagerInfo);
    var targetCellUrl = ManagerInfo.cellUrl;
    getTokenByRefreshToken(
      targetCellUrl,
      ManagerInfo.isCellManager ? null : target,
      ManagerInfo.refreshToken
    )
      .then(jsonData => {
        this.loadCellDetails(jsonData);
        ManagerInfo.refreshToken = getClientStore().refreshToken;
        sessionStorage.ManagerInfo = JSON.stringify(ManagerInfo);
      })
      .catch(err => {
        console.log(err);
      });
  }

  setEnvironmentVariables() {
    let tempParams = this.getHashParams();
    if (tempParams.selectedLanguage) {
      sessionStorage.selectedLanguage = tempParams.selectedLanguage;
    }
    if (tempParams.contextRoot) {
      sessionStorage.contextRoot = tempParams.contextRoot;
    }
    if (
      tempParams.clickedEnvironmentUnitUrl != null &&
      tempParams.clickedEnvironmentUnitCellName != null &&
      tempParams.ManagerInfo != null
    ) {
      sessionStorage.selectedUnitUrl = tempParams.clickedEnvironmentUnitUrl;
      sessionStorage.selectedUnitCellName =
        tempParams.clickedEnvironmentUnitCellName;
      sessionStorage.ManagerInfo = tempParams.ManagerInfo;
    }
    sessionStorage.pathBasedCellUrlEnabled = true;
    sessionStorage.newApiVersion = false;
    getCell(sessionStorage.selectedUnitUrl)
      .then(res => {
        let ver = res.headers.get('x-personium-version');
        if (ver >= '1.7.1') {
          sessionStorage.newApiVersion = true;
          return res.json().then(jsonDat => {
            sessionStorage.pathBasedCellUrlEnabled =
              jsonDat.unit.path_based_cellurl_enabled;
          });
        } else if (ver >= '1.6.16') {
          sessionStorage.newApiVersion = true;
        }
        return;
      })
      .then(() => {
        this.storeEnvDetails();
      });
  }

  getAPIVersion() {
    // /**
    //  * The purpose of this function to get the API version of the unit.
    //  */
    // home.prototype.getAPIVersion = function(requestURL) {
    //   var unitUrl = requestURL + '__ctl/Cell';
    //   var CSRFTokenAPIVersion = sessionStorage.requestId;
    //   $.ajax({
    //     dataType: 'json',
    //     url: './home',
    //     type: 'POST',
    //     data: {
    //       operation: 'APIVersion',
    //       unitUrl: unitUrl,
    //       CSRFTokenAPIVersion: CSRFTokenAPIVersion,
    //     },
    //     async: true,
    //     cache: false,
    //     success: function(response) {
    //       uHome.apiVersion = '0';
    //     },
    //     error: function(response) {
    //       uHome.apiVersion = '';
    //     },
    //   });
    //   return true;
    // };
  }

  getElasticSearchDavResponse(json) {
    /**
     * The purpose of this function to get the API version of the unit.
     */
    var data = json.diskSpaceResponse;
    var jsonData = JSON.parse(data);
    var statusData = jsonData.status;
    var volumeStatus = statusData.volumeStatus;
    this.resElasticSearch = 0;
    this.dataStorageAvailable = 1;
    this.discStorageAvailable = 1;
    this.dataStorageUsed = 0;
    this.discStorageUsed = 0;
    for (var i = 0; i < volumeStatus.length; i++) {
      this.resElasticSearch = 1;
      var volume = volumeStatus[i].volume;
      if (volume == 'elasticsearch1') {
        if (volumeStatus[i].allocatedDiskSize !== undefined) {
          this.dataStorageAvailable = volumeStatus[i].allocatedDiskSize;
          this.dataStorageUsed = volumeStatus[i].usedDiskSize;
        }
      }

      if (volume == 'dav') {
        if (volumeStatus[i].allocatedDiskSize !== undefined) {
          this.discStorageAvailable = volumeStatus[i].allocatedDiskSize;
          this.discStorageUsed = volumeStatus[i].usedDiskSize;
        }
      }
    }
    return true;
  }
}

export const home = new Home();

// var envtDeleteDialogBox = 'environmentDeleteDialogBox';
// var envtDeleteModalWindow = 'environmentDeleteModalWindow';
// var envtID = null;
// var statusHashTable = new HashTable({
//   available: 'availableStatusIconUnit',
//   'not available': 'notavailable',
//   'can’t connect with the unit': 'connectionFailed',
//   'failed to retrieve unit information': 'infoRetrivalFailed',
// });

/**
 * The purpose of this function is to return the time zone.
 *
 * @returns
 */
home.prototype.getTimeZone = function() {
  var date = new Date();
  var strDate = date.toString();
  var fullTimeZoneValue = null;
  var regex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
  if (strDate != null) {
    var hasJapaneseCharacters = regex.test(strDate);
    if (hasJapaneseCharacters) {
      fullTimeZoneValue = 'Japan Standard Time';
    } else {
      var timeZone = strDate.split('(');
      fullTimeZoneValue = getBoxSubstring(timeZone[1]);
    }
  }
  return fullTimeZoneValue;
};

// /**
//  * The purpose of this function is to disable configuration unit
//  * button for user privilege.
//  */
// home.prototype.disableConfigureUnitButton = function() {
//   var privilege = sessionStorage.loggedInUserPrivilege;
//   var USER = 'user';
//   if (privilege.toLowerCase() == USER.toLowerCase()) {
//     $('.btnConfigurationUnit').css('background-color', '#e8e8e8');
//     $('.btnConfigurationUnit').css('color', '#9d9d9d');
//     $('.btnConfigurationUnit').css('cursor', 'default');
//     $('.btnConfigurationUnit').removeAttr('onclick');
//     $('.configUnitIcon').removeClass('configureUnitIcon');
//     $('.configUnitIcon').addClass('disableConfigureUnitIcon');
//   }
// };

// /**
//  * The purpose of this function is to display access rights message.
//  */
// home.prototype.displayAccesRightsMessage = function() {
//   $('#dvemptyTableUserPrivilegeMessage').text(
//     'Only privileged user can access Administrator Management'
//   );
//   $('#dvemptyTableUserPrivilegeMessage').css('width', 368 + 'px');
//   $('#dvemptyTableUserPrivilegeMessage').show();
//   //$("#createUser").hide();
//   $('#adminMgmtTableDiv').hide();
//   $('#adminMgmtHead').hide();
// };

// /**
//  * The purpose of this function is to display users table.
//  */
// home.prototype.displayUsersTable = function() {
//   $('#dvemptyTableUserPrivilegeMessage').hide();
//   //$("#createUser").show();
//   uAdministratorManagement.fetchActiveUsersList();
//   $('#adminMgmtTableDiv').show();
//   $('#adminMgmtHead').show();
// };

// /**
//  * The purpose of this method is to set the gap between navigation icons
//  * dynamically on change of view prt size.
//  */
// home.prototype.setNavigationGap = function() {
//   var width = $(window).width();
//   var minGap = 35 / 1280;
//   var dynamicGap = minGap * width;
//   if (width > 1280) {
//     $('.adminMgmtWrapper').css('margin-left', dynamicGap + 'px');
//   } else {
//     $('.adminMgmtWrapper').css('margin-left', '35px');
//   }
// };

// /**
//  * The purpose of this method is to set hovering changes on Navigation Bar.
//  */
// home.prototype.hoverEffectNavigationBar = function() {
//   $('.serviceMgmtWrapper').hover(
//     function() {
//       $('#serviceMgmtIcon').removeClass('serviceMgmtIconGrey');
//       $('#serviceMgmtIcon').addClass('serviceMgmtIconRed');
//       $('#serviceMgmtTxt').removeClass('serviceMgmtTxtGrey');
//       $('#serviceMgmtTxt').addClass('serviceMgmtTxtRed');
//       $('.serviceMgmtWrapper').css('cursor', 'pointer');
//     },
//     function() {
//       if (!$('#serviceMgmtWrapper').hasClass('selected')) {
//         $('#serviceMgmtIcon').addClass('serviceMgmtIconGrey');
//         $('#serviceMgmtIcon').removeClass('serviceMgmtIconRed');
//         $('#serviceMgmtTxt').addClass('serviceMgmtTxtGrey');
//         $('#serviceMgmtTxt').removeClass('serviceMgmtTxtRed');
//         $('.serviceMgmtWrapper').css('cursor', 'default');
//       }
//     }
//   );
//   $('.adminMgmtWrapper').hover(
//     function() {
//       $('#adminMgmtIcon').removeClass('adminMgmtIconGrey');
//       $('#adminMgmtIcon').addClass('adminMgmtIconRed');
//       $('#adminMgmtTxt').removeClass('adminMgmtTxtGrey');
//       $('#adminMgmtTxt').addClass('adminMgmtTxtRed');
//       $('.adminMgmtWrapper').css('cursor', 'pointer');
//     },
//     function() {
//       if (!$('#adminMgmtWrapper').hasClass('selected')) {
//         $('#adminMgmtIcon').addClass('adminMgmtIconGrey');
//         $('#adminMgmtIcon').removeClass('adminMgmtIconRed');
//         $('#adminMgmtTxt').addClass('adminMgmtTxtGrey');
//         $('#adminMgmtTxt').removeClass('adminMgmtTxtRed');
//         $('.adminMgmtWrapper').css('cursor', 'default');
//       }
//     }
//   );
// };

// /**
//  * The purpose of this method is to set tab css when
//  * Service Management Tab is clicked.
//  */
// home.prototype.setTabColorWhenServiceMgmtSelected = function() {
//   $('#serviceMgmtWrapper').addClass('selected');
//   $('#adminMgmtWrapper').removeClass('selected');
//   $('#adminMgmtIcon').addClass('adminMgmtIconGrey');
//   $('#adminMgmtIcon').removeClass('adminMgmtIconRed');
//   $('#adminMgmtTxt').addClass('adminMgmtTxtGrey');
//   $('#adminMgmtTxt').removeClass('adminMgmtTxtRed');
//   $('#serviceMgmtIcon').removeClass('serviceMgmtIconGrey');
//   $('#serviceMgmtIcon').addClass('serviceMgmtIconRed');
//   $('#serviceMgmtTxt').removeClass('serviceMgmtTxtGrey');
//   $('#serviceMgmtTxt').addClass('serviceMgmtTxtRed');
//   $('#serviceManagmentHeader').show();
// };

// /**
//  * The purpose of this method is to get the number of objects in a map.
//  * @param obj
//  * @returns {Number}
//  */
// Object.size = function(obj) {
//   var size = 0,
//     key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) size++;
//   }
//   return size;
// };

// /**
//  * The purpose of this function to get the Dav/Disc data from unit.
//  */
// home.prototype.getStatusData = function(requestURL) {
//   var unitUrl = requestURL + '__mx/stats';
//   var CSRFTokenDiscSpace = sessionStorage.requestId;
//   $.ajax({
//     dataType: 'json',
//     url: './home',
//     type: 'POST',
//     data: {
//       operation: 'DiscSpace',
//       unitUrl: unitUrl,
//       CSRFTokenDiscSpace: CSRFTokenDiscSpace,
//     },
//     async: false,
//     cache: false,
//     success: function(response) {
//       if (response.sessionTimeOut != 'sessionTimeOut') {
//         getElasticSearchDavResponse(response);
//       }
//     },
//     error: function(response) {
//       uHome.resElasticSearch = 0;
//     },
//   });
//   return true;
// };

/**
 * The purpose of this function is to parse token retrieved in XML format.
 *
 * @param data
 */
home.prototype.parseToken = function(data) {
  var jsonData = {};
  var accessToken = data.access_token;
  var refreshToken = data.refresh_token;
  var expiresIn = data.expires_in;
  var envName = sessionStorage.selectedEnvName;
  var unitURL = sessionStorage.selectedUnitUrl;
  jsonData['token'] = accessToken;
  jsonData['environmentName'] = envName;
  jsonData['baseURL'] = unitURL;
  jsonData['refreshToken'] = refreshToken;
  jsonData['expiresIn'] = expiresIn;
  setClientStore(jsonData);
  sessionStorage.tokenCreationDateTime = new Date().getTime();
};

// // DELETE ENVIRONMENT START
// /**
//  * This method opens up a new pop up window for Deleting environment .
//  *
//  * @param idDialogBox
//  * @param idModalWindow
//  * @param selectedEnvID
//  */
// home.prototype.openPopUpWindow = function(
//   idDialogBox,
//   idModalWindow,
//   selectedEnvID
// ) {
//   envtID = selectedEnvID;
//   $(idModalWindow).fadeIn(1000);
//   var windowHeight = $(window).height();
//   var windowWidth = $(window).width();
//   $(idDialogBox).css('top', windowHeight / 2 - $(idDialogBox).height() / 2);
//   $(idDialogBox).css('left', windowWidth / 2 - $(idDialogBox).width() / 2);
// };

// /**
//  * The purpose of the following method is to display delete button,should the
//  * privilege happens to be ADMIN.
//  *
//  * @param jsonData
//  * @returns
//  */
// home.prototype.showDeleteButton = function(jsonData) {
//   var privilege = jsonData.privilege;
//   sessionStorage.loggedInUserPrivilege = privilege;
//   var ADMIN = 'administrator';
//   var SUBSCRIBER = 'subscriber';
//   var USER = 'user';
//   if (
//     privilege.toLowerCase() == ADMIN.toLowerCase() ||
//     privilege.toLowerCase() == SUBSCRIBER.toLowerCase()
//   ) {
//     $('.tdDelete').show();
//     $('#btnCreateEnvironment').show();
//   } else if (privilege.toLowerCase() == USER.toLowerCase()) {
//     $('.tdDelete').hide();
//     $('#btnCreateEnvironment').hide();
//   }
//   return privilege;
// };

// // DELETE ENVIRONMENT ENDS

// $(function() {
//   $.ajaxSetup({ cache: false });
//   sessionStorage.isHomePage == 'true';
// });

// /**
//  * The purpose of this method is to set the max-width for organization name
//  * dynamically on change of view prt size.
//  */
// home.prototype.setDynamicOrgNameWidth = function() {
//   var width = $(window).width();
//   var ellipsisWidth = width - 345;
//   if (width > 1280) {
//     $('#dvOrgName').css('max-width', ellipsisWidth + 'px');
//   } else {
//     $('#dvOrgName').css('max-width', '935px');
//   }
// };
