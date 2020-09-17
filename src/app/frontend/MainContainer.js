import React, { useState, useCallback } from 'react';
import CellListView from './CellListView';

export const MainContainer = () => {
  const [displayCellListView] = useState(false);

  return (
    <div id="mainContainer" style="display: none">
      <div id="contentWrapper">
        <div id="leftPanel" onClick="expandCellList();">
          <input
            type="button"
            value=""
            className="minCellList"
            id="btnMinCellList"
            tabIndex="-1"
          />
        </div>
        {displayCellListView ? <CellListView /> : null}
        <div id="dvCellListContainer" className="mainellListContainer"></div>
        <div
          id="rightPanel"
          className="rightPanelDefaultHeight"
          onClick="collapseCellList();"
        >
          <div id="header">
            <div id="leftHeading" className="leftHeading">
              <div id="cellNameHeading" className="cellNameHeading"></div>
              <div id="cellURLHeading" className="cellURLHeading"></div>
            </div>
            <div id="rightHeading" className="rightHeading">
              <input
                type="button"
                id="tokenBtn"
                className="tokenBtn"
                onClick="openCreateEntityModal('#tokenPopUpModalWindow','#tokenDialogBox', 'txtAccessToken');"
                value="Token"
                tabIndex="-1"
                title="Display the Access Token"
              />
              <input
                type="button"
                id="logoutBtn"
                className="logoutBtn"
                onClick="openCreateEntityModal('#logoutModalWindow','#logoutDialogBox', 'btnCancel');"
                value="Logout"
                tabIndex="-1"
                title="Log out and return to the login screen"
              />
            </div>
          </div>
          <div
            id="mainContent"
            style="padding-right: 20px; min-width: 1228px;"
          ></div>
          <div
            id="mainContentWebDav"
            style="padding-right: 20px; min-width: 1228px; dispaly: none;"
          ></div>
          <div
            style="display: none;"
            id="dvemptyTableMessage"
            className="emptyTableMessage accountEmptyTableMessageWidth"
          ></div>
        </div>
      </div>
    </div>
  );
};
