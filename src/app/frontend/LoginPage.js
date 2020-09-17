import React, { useCallback, useState } from 'react';

// //history.pushState({},"","");
// //On load function called for user id
// $(document).ready(function(){
//     uLogin.renderLoginFields();
// });

// //Validating field values
// function FillBilling(f) {
//     if(document.getElementById("confirm").style.display == "block"){
//         document.getElementById("confirm").style.display = "none";
//         document.getElementById("register").style.display = "block";
//     }
//     else {
//         document.getElementById("confirm").style.display = "none";
//         document.getElementById("register").style.display = "block";
//     }
//     var trimcid = f.cid.value.toString();
//     trimcid = trimcid.replace(/\s/g, '');
//     trimcid = trimcid.trim();
//     var trimcpassd = f.cpassd.value.toString();
//     trimcpassd = trimcpassd.replace(/\s/g, '');
//     trimcpassd = trimcpassd.trim();
//     var trimcfName = f.cfName.value.toString();
//     trimcfName = trimcfName.replace(/\s+/g, " ");
//     trimcfName = trimcfName.trim();
//     var trimcfamilyName = f.cfamilyName.value.toString();
//     trimcfamilyName = trimcfamilyName.replace(/\s+/g, " ");
//     trimcfamilyName = trimcfamilyName.trim();
//     var trimcoName = f.coName.value.toString();
//     trimcoName = trimcoName.replace(/\s+/g, " ");
//     trimcoName = trimcoName.trim();
//     f.rid.value = trimcid;
//     f.rpassd.value = trimcpassd;
//     f.rrpassd.value = f.crpassd.value;
//     f.rfName.value = trimcfName;
//     f.rfamilyName.value = trimcfamilyName;
//     f.roName.value = trimcoName;
//     f.remail.value = f.cemail.value;
// }

// //opening success registration popup.
// function openSuccesPopUp() {
//     var id = '#successMsgPopup';
//     $('#successMsgBlock').fadeIn(1000);
//     var winH = $(window).height();
//     var winW = $(window).width();
//     $(id).css('top', winH / 2 - $(id).height() / 2);
//     $(id).css('left', winW / 2 - $(id).width() / 2);
// }

// //For checking the value after successful registration.
// $(function() {
//     setDynaicBrowserCompatabilitySection();
//     setDynamicLoginSection();
//     if (document.getElementById("userId") != null) {
//         document.querySelector("#userId").spellcheck = false;
//     }
//     var flag = '<%=session.getValue("flag")%>';
//     if (flag == 'true') {
//         openSuccesPopUp();
//         //<%session.putValue("flag", false);%>
//     }
// });

const BrowserSupportedMessage = () => {
  return (
    <div className="browserSupportedMessage" id="incompatibleBrowseMsg">
      <label style="display: table;margin: 0 auto;font-size: 13pt;color: #c80000">
        Your browser is not supported.
      </label>
      <br />
      <label style="display: table;margin: 0 auto;">
        To use Personium unit manager, we recommend using the latest version
      </label>
      <br />
      <label style="display: table;margin: 0 auto;margin-top: -14px">
        of Google Chrome.
      </label>
    </div>
  );
};

const LogoutDiv = props => {
  const { message } = props;
  return;
};

export const LoginPage = () => {
  const [errorFlag, setErrorFlag] = useState(null);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const renderLoginFields = useCallback(
    calledFromCell => {
      if (errorFlag === null && message === null) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    },
    [setVisible]
  );
  return (
    <>
      {/* <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            httpEquiv="Cache-Control"
            content="no-cache, no-store, must-revalidate"
          />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="-1" />
          <title>Personium Unit Manager</title>
          <script
            type="text/javascript"
            src="./js/main/validation/login_validation.js"
          ></script>
          <script type="text/javascript" src="./js/login.js"></script>
          <script
            type="text/javascript"
            src="./js/jquery-1.9.0.min.js"
          ></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-url-parser/2.3.1/purl.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
          <script type="text/javascript" src="./js/commonFunctions.js"></script>
          <script type="text/javascript" src="./js/jquery.modalbox.js"></script>
          <script
            type="text/javascript"
            src="./js/main/validation/reg_validation.js"
          ></script>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            href="./css/loginStylesheet.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css"
          /> */}

      <div className="mySpinner">
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
      <div className="myHiddenDiv" id="loginContainer" style="min-width: 530px">
        {/* <!-- Login Content Starts --> */}
        <div id="loginContentWrapper">
          <div className="dvloginSection" id="dvloginSection">
            <div className="newLoginHeading"></div>
            <div className="loginWrapper">
              <form name="login" id="loginForm" style="margin-left: 106px;">
                <div
                  style="visibility: visible; height: 15px;margin-top: 5px;"
                  id="logoutDiv"
                >
                  <label id="logoutMsg" className="logoutMessage"></label>
                </div>
                <dl>
                  <dt className="dtUnitUrl">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Login URL (with ending slash)"
                      name="loginUrl"
                      id="loginUrl"
                      className="txtUnitUrl"
                    />
                    <span className="newLoginAlertMessage">
                      <aside
                        id="unitspan"
                        style="display: none; width: 100%"
                      ></aside>
                    </span>
                    <div className="clearBoth"></div>
                  </dt>
                  <dt className="dtUserName">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Username"
                      name="userId"
                      id="userId"
                      className="txtUserName"
                    />
                    <span className="newLoginAlertMessage">
                      <aside
                        id="userspan"
                        style="display: none; width: 100%"
                      ></aside>
                    </span>
                    <div className="clearBoth"></div>
                  </dt>
                  <dt className="dtPassword">
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Password"
                      name="passwd"
                      id="passwd"
                      className="txtPassword"
                    />
                    <span className="newLoginAlertMessage">
                      <aside
                        id="paswdspan"
                        style="display: none; width: 100%"
                      ></aside>
                    </span>sd
                    <div className="clearBoth"></div>
                  </dt>
                  <dt style="margin-top: 18px;height: 20px;">
                    <select
                      id="ddLanguageSelector"
                      name="ddLanguageSelector"
                      className="dropDownBig"
                      onClick=""
                      style="float: left;margin-top: -17px;margin-right: 10px;padding-bottom: 2px;margin-left: 80px;height: 30px;width: 150px;"
                    >
                      <option value="en">English(en)</option>
                      {/* <!--                        <option value="ja">Japanese(ja)</option> --> */}
                    </select>
                  </dt>
                  <dt className="dtLoginBtn">
                    <span className="loginArrow">
                      <input
                        type="submit"
                        value="Sign In"
                        className="loginButton"
                        onClick="return uLogin.getEnvDetail();"
                      />
                    </span>
                  </dt>
                </dl>
              </form>
            </div>
          </div>
          <div className="dvnewLoginFooter">
            <footer id="fullLoginFooter">
              <label className="loginFooterPolicy">Privacy Policy</label>
              <br />
              <label className="loginFootercopyright">
                Copyright 2017 FUJITSU
              </label>
            </footer>
          </div>
          <div
            id="successMsgBlock"
            className="modelback"
            style="display: none;"
          >
            <div
              className="modal-window block-border"
              style="display: block; height: 573px; width: 460px; background: #ffffff"
              id="successMsgPopup"
            >
              <div id="confirmRegs">
                <a
                  href="#"
                  title="Close"
                  id="modalbox-close"
                  className="closeIcon"
                  onClick="closeSuccessMsg();"
                >
                  Close
                </a>
                <figure>Your account has been created successfully.</figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
