import React, { useState, useCallback, useEffect } from 'react';
import { getUiProps } from './locales';

// ported from 'cellListView.html'

function getCellList() {
  let res = null;
  let ManagerInfo = JSON.parse(sessionStorage.ManagerInfo);
  if (ManagerInfo.isCellManager) {
    res = [
      {
        Name: sessionStorage.selectedUnitCellName,
        __metadata: {},
        __published: ManagerInfo.__published, //"/Date(1505096205363)/", // need to get the real published date
        __updated: ManagerInfo.__published,
      },
    ];
  } else {
    let url = getClientStore().baseURL;
    let objJdcContext = new _pc.PersoniumContext(url, '', '', '');
    let ac = objJdcContext.withToken(token);
    res = ac
      .asCellOwner()
      .unit.cell.query()
      .orderby('__updated desc')
      .top(500)
      .skip(0)
      .run();
  }

  return res;
}

/**
 * The purpose of this method is to perform the forward text search operation
 * on cell list.
 */
function forwardTextCellSearch(cellName) {
  var baseUrl = getClientStore().baseURL;
  var objJdcContext = new _pc.PersoniumContext(baseUrl, '', '', '');
  var ac = objJdcContext.withToken(token);
  //var res = ac.asCellOwner().unit.cell.query().filter("substringof('"+cellName+"',Name)").orderby('__updated desc').top(500).skip(0).run();
  var res = ac
    .asCellOwner()
    .unit.cell.query()
    .filter("startswith(Name,'" + cellName + "')")
    .orderby('__updated desc')
    .top(500)
    .skip(0)
    .run();
  var jsondata = JSON.stringify(res);
  var JSONstring = JSON.parse(jsondata);
  var lenJSONstring = JSONstring.length;
  if (lenJSONstring > 0) {
    var cellsText = getUiProps().LBL0011;
    $('#lblTotalCellCount').html(lenJSONstring + ' ' + cellsText);
    $('#mainCellTable').hide();
    $('#noCell').remove();
    $('#searchCellTable').remove();
    showRightPanel();
    $('#mainContentWebDav').hide();
    var date = new Array();
    var searchRow =
      '<table id="searchCellTable" cellpadding="0" cellspacing="0">';
    for (var count = 0; count < lenJSONstring; count++) {
      var obj = JSONstring[count];
      var fullCellName = JSONstring[count].Name;
      date[count] = obj.__published;
      var dtCreate = '' + date[count] + '';
      var selectedCellDate = objCommon.convertEpochDateToReadableFormat(
        dtCreate
      );
      var finalSelectedCellDate = "'" + selectedCellDate + "'";
      if (count == 0) {
        searchRow +=
          '<tr class="allCell selectedCellInCellList" id="searchCellList' +
          count +
          '">';
        searchRow +=
          '<td onClick="getselectedcell(\'' +
          fullCellName +
          "','" +
          count +
          "'," +
          finalSelectedCellDate +
          ')" name = "Cell"><div class="cellNameList" title = "' +
          fullCellName +
          '" valign="top" id="fullCellName">' +
          fullCellName +
          '</div></td>';
      } else {
        searchRow += '<tr class="allCell" id="searchCellList' + count + '">';
        searchRow +=
          '<td onClick="getselectedcell(\'' +
          fullCellName +
          "','" +
          count +
          "'," +
          finalSelectedCellDate +
          ')" name = "Cell"><div class="cellNameList" title = "' +
          fullCellName +
          '" valign="top">' +
          fullCellName +
          '</div></td>';
      }

      searchRow += '</tr>';
    }
    searchRow += '</table>';
    $('#tableDiv').prepend(searchRow);
    var searchedCellName = JSONstring[0].Name;
    if (searchedCellName != sessionStorage.lastselectedcell) {
      getselectedcell(searchedCellName, 0, '', true);
    }
  } else {
    return false;
  }
  return true;
}

export const CellListView = () => {
  const [searchCellName, setSearchCellName] = useState('');
  const handleCrossIconOnTextSearch = useCallback(() => {
    /**
     * The purpose of this method is to show/hide cross icon on saerch text box
     * as per data.
     */
    // if ($('#txtSearchCellName').val() != '') {
    //   $('#txtSearchCellName').addClass('clearable');
    // } else {
    //   $('#txtSearchCellName').removeClass('clearable');
    //   $('#txtSearchCellName').removeClass('clearableHover');
    // }
  }, []);

  const textCellSearch = useCallback(() => {
    /**
     * The purpose of this method is to perform the text search operation
     * on cell list.
     */
    objCommon.hideListTypePopUp();
    textSearch = true;
    jquery1_9_0('#tableDiv').mCustomScrollbar('destroy');
    var cellName = $('#txtSearchCellName').val();
    if (cellName != undefined && cellName != '') {
      var result = forwardTextCellSearch(cellName);
      if (!result) {
        var cellText = getUiProps().LBL0012;
        $('#lblTotalCellCount').html('0 ' + cellText);
        $('#mainCellTable').hide();
        $('#searchCellTable').remove();
        $('#noCell').remove();
        hideRightPanel();
        $('#mainContentWebDav').hide();
        $('#dvemptyTableMessage').hide();
        var position = $('.content').height();
        var marginTop = Math.round(position / 2);
        var noCellFound = getUiProps().MSG0322;
        var noRow =
          '<div id="noCell" class="noCell" style="margin-top:' +
          marginTop +
          'px">' +
          noCellFound +
          '</div>';
        $('#tableDiv').prepend(noRow);
        if (sessionStorage.selectedLanguage == 'ja') {
          $('#noCell').addClass('japaneseFont');
        }
      }
    } else {
      if (
        document.getElementById('searchCellTable') != null ||
        document.getElementById('noCell') != null
      ) {
        $('#txtSearchCellName').val('');
        var cellsText = getUiProps().LBL0011;
        $('#lblTotalCellCount').html(
          sessionStorage.totalCellCountForUnit + ' ' + cellsText
        );
        $('#searchCellTable').remove();
        $('#noCell').remove();
        $('#mainCellTable').show();
        getselectedcell(
          sessionStorage.lastselectedcell,
          sessionStorage.lastselectedindex,
          sessionStorage.lastselectedcelldate,
          false
        );
        showRightPanel();
        handleCrossIconOnTextSearch();
      }
    }
    jquery1_9_0('#tableDiv').mCustomScrollbar({
      scrollButtons: {
        enable: false,
      },
      advanced: {
        updateOnBrowserResize: false,
      },
      callbacks: {
        onTotalScroll: function() {
          retrieveChunkedDataCell();
        },
      },
      theme: 'light',
    });
    setTimeout(function() {
      if (cellName != undefined && cellName.length == 0) {
        var selectedCellClass = '.selectedCellInCellList';
        jquery1_9_0('#tableDiv').mCustomScrollbar(
          'scrollTo',
          selectedCellClass
        );
      }
    }, 500);
  }, []);

  const handleKeyPress = useCallback(() => {
    /**
     * The purpose of this method is to perform full text search operation on
     * enter key press.
     */
    var event = window.event;
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13') {
      textCellSearch();
    }
  }, [textCellSearch]);

  const refreshCellList = useCallback(() => {
    /**
     * The purpose of this method is to refresh the cell list.
     */
    setSearchCellName('');
    handleCrossIconOnTextSearch();
    $('#searchCellTable').remove();
    $('#noCell').remove();
    showRightPanel(isCellCreate);
    createcelltable();
    activeCell(0);
    selectBoxInNavigationBar();
    addSelectedClassMainNavBox();
  }, []);

  const [currentCellUrl, setCurrentCellUrl] = useState('');
  useEffect(() => {
    /* The purpose of this function is to call the dynamic table function.
     */
    $('#rightSection :input').attr('disabled', false);
    $('#cellProfileElements :input').attr('disabled', true);
    setCurrentCellUrl(getClientStore().baseURL);
    $('#txtSearchCellName').mousemove(function(e) {
      if (
        $('#txtSearchCellName').val() != '' &&
        $('#txtSearchCellName').val() != undefined
      ) {
        var searchBoxWidth = document.getElementById('txtSearchCellName')
          .offsetWidth;
        var searchBoxHeight = document.getElementById('txtSearchCellName')
          .offsetHeight;
        var xPosition = e.pageX;
        var yPosition = e.pageY;
        var crossIconWidth = xPosition - searchBoxWidth - 17;
        var crossIconHeight = searchBoxHeight - yPosition;
        if (
          crossIconWidth >= -20 &&
          crossIconWidth <= -8 &&
          crossIconHeight <= -35 &&
          crossIconHeight >= -62
        ) {
          $('#txtSearchCellName').removeClass('clearable');
          $('#txtSearchCellName').addClass('clearableHover');
          $('#txtSearchCellName').css('cursor', 'pointer');
        } else {
          if ($('#txtSearchCellName').hasClass('clearableHover')) {
            $('#txtSearchCellName').removeClass('clearableHover');
            $('#txtSearchCellName').addClass('clearable');
            $('#txtSearchCellName').css('cursor', 'default');
          }
        }
      }
    });

    $('#txtSearchCellName').mouseover(function() {
      if (
        $('#txtSearchCellName').val() == '' ||
        $('#txtSearchCellName').val() == undefined
      ) {
        $('#txtSearchCellName').css('cursor', 'default');
      }
    });

    $('#txtSearchCellName').click(function(e) {
      var searchBoxWidth = document.getElementById('txtSearchCellName')
        .offsetWidth;
      var searchBoxHeight = document.getElementById('txtSearchCellName')
        .offsetHeight;
      var xPosition = e.clientX;
      var yPosition = e.clientY;
      var crossIconWidth = searchBoxWidth - xPosition;
      var crossIconHeight = searchBoxHeight - yPosition;

      if (
        crossIconWidth >= -4 &&
        crossIconWidth <= 4 &&
        crossIconHeight <= -40 &&
        crossIconHeight >= -56
      ) {
        if (textSearch) {
          restoreCellList();
        }
        $('#txtSearchCellName').val('');
        $('#txtSearchCellName').removeClass('clearableHover');
        textSearch = false;
      }
    });

    $('#chkAdmin').click(function() {
      if ($('#chkAdmin').is(':checked')) {
        document.getElementById('txtRoleName').disabled = false;
      } else {
        uCellProfile.removeStatusIcons('#txtRoleName');
        $('#popupRoleNameErrorMsg').html('');
        document.getElementById('txtRoleName').disabled = true;
        document.getElementById('txtRoleName').value = '';
      }
    });
    $('#chkCreateProfile').click(function() {
      cellpopup.validateInput();
      if ($('#chkAdmin').is(':checked')) {
        cellpopup.roleValidation();
      }
      if ($('#chkCreateProfile').is(':checked')) {
        //to be changed to false while cell profile implementation
        $('.addOrRemoveCursor').css('cursor', 'pointer');
        $('#cellProfileElements :input').removeAttr('disabled');
        enableBrowseButton('#btnCellProfileBrowse', '#idImgFileCell');
      } else {
        $('#cellProfileElements :input').attr('disabled', true);
        $('.addOrRemoveCursor').css('cursor', 'default');
        disableBrowseButton('#btnCellProfileBrowse');
        $('#publicProfile').attr('checked', false);
        uCellProfile.removeStatusIcons('#trDisplayName');
        clearBoxProfileSection(
          '#idImgFileCell',
          'popupCellImageErrorMsg',
          '#btnCellProfileBrowse',
          '#figCellProfile',
          '#imgCellProfile',
          '#lblCellNoFileSelected'
        );
      }
    });
    getWindowSize();
    var index = 0;
    var isSearch = 'false';
    if (
      sessionStorage.isSearch !== 'undefined' &&
      sessionStorage.isSearch === 'true'
    ) {
      isSearch = 'true';
      sessionStorage.isSearch = 'false';
    }
    createcelltable(isSearch);
    if (sessionStorage.isSocialGraph == 'true') {
      setStyleSelectedCell(
        sessionStorage.selectedCellNameOnGraphList,
        sessionStorage.index
      );
      sessionStorage.isSocialGraph = 'false';
    }
  }, []);

  return (
    <div>
      <div id="dvEnvironmentName" className="envNameHeadingCellList">
        <label>Cell List</label>
      </div>
      <div className="divTxtboxCellListSearch" id="dvCellListSearchPanel">
        <input
          type="text"
          id="txtSearchCellName"
          className="txtBoxCellSearch"
          onKeyUp={handleCrossIconOnTextSearch}
          placeholder="Search Cell..."
          onKeyPress={handleKeyPress}
          tabIndex="-1"
          value={searchCellName}
        />
        <input
          type="button"
          id="imgSearchRecords"
          title="Search"
          onClick={textCellSearch()}
          src=""
          className="searchImage"
          tabIndex="-1"
        />
        <input
          type="submit"
          value=""
          title="Refresh List"
          className="btnCellRefresh"
          onClick={refreshCellList()}
          tabIndex="-1"
        />
      </div>
      <div id="dvCellCountDisplay" className="divCellCountDisplay">
        <label className="lblCellCountDisplay" id="lblTotalCellCount"></label>
      </div>

      <div id="tableDiv" className="content divCellTable"></div>
      <div className="divExpandCellList" id="dvCellListStretch">
        <input
          type="button"
          value=""
          className="btnCellListStretch"
          id="btnCellListSlide"
          tabIndex="-1"
        />
      </div>
      <div
        className="divCreateCell"
        id="btnCreateCell"
        onClick="cellpopup.selTemplateUI()"
        title="Create a blank cell"
      >
        <input
          type="button"
          className="cellCreateIcon"
          id="cellCreateIcon"
          onClick="cellpopup.selTemplateUI();"
          tabIndex="-1"
        />{' '}
        <label htmlFor="cellCreateIcon" className="lblCellCreate">
          Create
        </label>
      </div>

      <div
        id="modalSpinnerCellList"
        className="modelbackSpinner"
        style="display: none;"
      >
        <div
          className="modal-window block-border"
          style="display: block; height: 0; width: 0; background: transparent; position: absolute; top: 50%; left: 50%; border: 0"
          id="dialogSpinner"
        >
          <div id="spinnerPopUp"></div>
        </div>
      </div>
    </div>
  );
};
