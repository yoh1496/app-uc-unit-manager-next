import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoxListView } from './BoxListView';

function NavigationBar() {
  const handleOpenBoxList = useCallback(() => {
    /* boxListData func */
  }, []);

  const handleOpenRoleList = useCallback(() => {
    /* roleListData func */
  }, []);

  const handleOpenAccountList = useCallback(() => {
    /* accountListData func */
  }, []);

  const handleOpenExternalCellList = useCallback(() => {
    /* externalCellList func */
  }, []);

  const handleOpenRelationList = useCallback(() => {
    /* relationListData func */
  }, []);

  const handleOpenExternalRoleList = useCallback(() => {
    /* externalRoleList func */
  }, []);
  return (
    <div id="navigationBar">
      <ul className="navList">
        <li
          id="boxNav"
          className="boxNav selected"
          onClick={handleOpenBoxList}
          title="Display the Box List to manage boxes which store data for applications"
        >
          <div id="boxTabWrapper" className="boxTabWrapper">
            <div id="boxIcon" className="boxIcon"></div>
            <label id="boxText" className="boxText">
              Box
            </label>
          </div>
        </li>
        <li
          id="roleNav"
          className="roleNav"
          onClick={handleOpenRoleList}
          title="Display the Role List to manage roles or perform basic operations on the selected role"
        >
          <div id="roleTabWrapper" className="roleTabWrapper">
            <div id="roleIcon" className="roleIcon"></div>
            <label id="roleText" className="roleText">
              Role
            </label>
          </div>
        </li>
        <li
          id="accountNav"
          className="accountNav"
          onClick={handleOpenAccountList}
          title="Display the Account List to manage user accounts which belong to this cell"
        >
          <div id="accountTabWrapper" className="accountTabWrapper">
            <div id="accountIcon" className="accountIcon"></div>
            <label id="accountText" className="accountText">
              Account
            </label>
          </div>
        </li>
        <li id="socialNav" className="socialNav">
          <div id="socialTabWrapper" className="socialTabWrapper">
            <div id="socialIcon" className="socialIcon"></div>
            <label id="socialText" className="socialText">
              Social
            </label>
            <div id="socialArrow" className="socialArrow"></div>
          </div>
          <ul className="socialSubMenu">
            <li
              className="externalCellWrapper"
              onClick={handleOpenExternalCellList}
              title="Display the External Cell List to manage cells within or outside this unit (currently logged in)"
            >
              <a href="#" className="externalCell">
                External Cell
              </a>
            </li>
            <li
              className="relationWrapper"
              onClick={handleOpenRelationList}
              title="Display the Relation List to manage relationships between the selected cell and external cells"
            >
              <a href="#" className="relation">
                Relation
              </a>
            </li>
            <li
              className="externalRoleWrapper"
              onClick={handleOpenExternalRoleList}
              title="Display the Extrenal Role List to manage external roles"
            >
              <a href="#" className="externalRole">
                External Role
              </a>
            </li>
          </ul>
        </li>
        <li id="messageNav" className="messageNav">
          <div id="messageTabWrapper" className="messageTabWrapper">
            <div id="messageIcon" className="messageIcon"></div>
            <label id="messageText" className="messageText">
              Message
            </label>
            <div id="messageArrow" className="messageArrow"></div>
          </div>
          <ul className="messageSubMenu">
            <li
              className="externalCellWrapper"
              onClick="openReceivedMessageList();"
            >
              <a href="#" className="externalCell">
                Received
              </a>
            </li>
            <li
              className="externalRoleWrapper"
              onClick="uMainNavigation.openSentMessageList();"
            >
              <a href="#" className="externalRole">
                Sent
              </a>
            </li>
          </ul>
        </li>
        <li id="eventNav" className="eventNav">
          <div id="eventTabWrapper" className="eventTabWrapper">
            <div id="eventIcon" className="eventIcon"></div>
            <label id="eventText" className="eventText">
              Event
            </label>
            <div id="eventArrow" className="eventArrow"></div>
          </div>
          <ul className="eventSubMenu">
            <li
              className="externalCellWrapper"
              onClick="uMainNavigation.logViewData();"
            >
              <a href="#" className="externalCell">
                Log
              </a>
            </li>
            <li
              className="externalCellWrapper"
              onClick="uMainNavigation.ruleViewData();"
            >
              <a href="#" className="externalCell">
                Rule
              </a>
            </li>
          </ul>
        </li>
        <li
          id="snapshotNav"
          className="snapshotNav"
          onClick="uMainNavigation.snapshotViewData();"
        >
          <div id="snapshotTabWrapper" className="snapshotTabWrapper">
            <div id="snapshotIcon" className="snapshotIcon"></div>
            <label id="snapshotText" className="snapshotText">
              Snapshot
            </label>
          </div>
        </li>
        <li
          id="infoNav"
          className="infoNav"
          onClick="uMainNavigation.CellInfoNavigationData();"
          title="Configure the profile or perform administrative operations on this cell"
        >
          <div id="infoTabWrapper" className="infoTabWrapper">
            <div id="infoIcon" className="infoIcon"></div>
            <label id="infoText" className="infoText">
              Info
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}

export function Top() {
  const [isCellManager] = useState(false);

  return (
    <div>
      <div id="mainContainer">
        <div id="contentWrapper">
          {isCellManager ? (
            <>
              <div id="leftPanel" onClick="expandCellList();">
                <input
                  type="button"
                  value=""
                  className="minCellList"
                  id="btnMinCellList"
                  tabIndex="-1"
                />
              </div>
              <div
                id="dvCellListContainer"
                className="mainellListContainer"
              ></div>
            </>
          ) : null}
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
            <NavigationBar />
            <div id="mainContent" style={{ paddingRight: 20, minWidth: 1228 }}>
              <BoxListView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
