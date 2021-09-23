import PathsModel from './model/paths-model';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint = 'https://15.ecmascript.pages.academy/big-trip', authorization = 'Basic w23Q23ffkd3552jfj') {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPaths() {
    return this._load({url: 'points'})
      .then(Api.toJSON)
      .then((paths) => paths.map(PathsModel.adaptToClient));
  }

  getDestinations() {
    return this._load({url: 'destinations/'})
      .then(Api.toJSON)
      .then((paths) => paths.map(PathsModel.adaptToClient));
  }

  getOffers() {
    return this._load({url: 'offers/'})
      .then(Api.toJSON)
      .then((paths) => paths.map(PathsModel.adaptToClient));
  }

  addPath(path) {
    return this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(PathsModel.adaptToServer(path)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PathsModel.adaptToClient);
  }

  deletePath(path) {
    return this._load({
      url: `points/${path.id}`,
      method: Method.DELETE,
    });
  }

  updatePath(path) {
    return this._load({
      url: `points/${path.id}`,
      method: Method.PUT,
      body: JSON.stringify(PathsModel.adaptToServer(path)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PathsModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
