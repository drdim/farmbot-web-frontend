import * as React from "react";
import { Link } from "react-router";
import { sendCommand } from "../devices/bot_actions";
import { AuthState } from "../auth/auth_reducer";
import { BotState } from "../devices/interfaces";

interface NavButtonState {
  auth: AuthState;
  dispatch: Function;
  bot: BotState;
}

let LogoutButton = ({ auth }: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <a className="logout-button"
      onClick={() => {
        sessionStorage.clear();
        location.reload();
      } }>
      Log Out
    </a>;
};

// TODO: Rick, make this real!
let SyncButton = ({auth, dispatch}: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <button className="nav-sync button-like green"
                 onClick={
                   () => dispatch(sendCommand({name: "syncSequence"}))
                 }>
      Sync
    </button>;
};

// TODO: Rick, make this real!
let StatusTicker = ({auth, bot}: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <div className="status-ticker-wrapper">
      <div className="status-ticker-light" />
      <label className="status-ticker-message">{ bot.status }</label>
    </div>;
};

// TODO: Rick, make this real!
let EStopButton = ({auth, dispatch}: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <button className="nav-e-stop button-like red"
            type="button"
            onClick={ () => dispatch(sendCommand({name: "emergencyStop" })) } >
    E-Stop
    </button>;
};

let links = {
  "Farm Designer" : "/app/dashboard/designer",
  "Controls"      : "/app/dashboard/controls",
  "Device"        : "/app/dashboard/devices",
  "Sequences"     : "/app/dashboard/sequences",
  "Regimens"      : "/app/dashboard/regimens"
};

// TODO: Convert to ES6 class or stateless component and add a display name.
export function Navbar(props) {
  return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header drop-shadow">
            <button className="navbar-toggle"
                    data-target="#navbar"
                    data-toggle="collapse"
                    type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              {
                Object.keys(links).map((description) => {
                  let url = links[description];
                  return (
                          <li key={url}>
                            <Link to={url}>{description}</Link>
                          </li>
                        );
                })
              }
            </ul>
            <SyncButton { ...props }/>
            <StatusTicker { ...props }/>
            <LogoutButton { ...props }/>
            <EStopButton { ...props }/>
          </div>
        </div>
      </nav>
    );
  };
