import * as _ from "lodash";
import * as $ from "jquery";

export class Device {
  static fetch = function() {
    return $.ajax({
      method: "GET",
      url: "//myapp.smartp.online" + "/api/device"
    });
  };

  static save = function (that) {
    return $.ajax({
      method: "POST",
      url: "//myapp.smartp.online" + "/api/device",
      data: that
    });
  };

  static destroy = function (that) {
    return $.ajax({
      method: "DELETE",
      url: "//myapp.smartp.online" + "/api/device"
    });
  };
  public _id: String;
  public name: String;

  constructor (opts) {
    let options = (opts || {});
    this._id  = String(options._id || _.random(0, 1000));
    this.name = (options.name || "Untitled Device");
  };
};
