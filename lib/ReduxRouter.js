'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _dec, _class2, _class3, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _routerStateEquals = require('./routerStateEquals');

var _routerStateEquals2 = _interopRequireDefault(_routerStateEquals);

var _constants = require('./constants');

var _actionCreators = require('./actionCreators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function memoizeRouterStateSelector(selector) {
  var previousRouterState = null;

  return function (state) {
    var nextRouterState = selector(state);
    if ((0, _routerStateEquals2.default)(previousRouterState, nextRouterState)) {
      return previousRouterState;
    }
    previousRouterState = nextRouterState;
    return nextRouterState;
  };
}

function getRoutesFromProps(props) {
  return props.routes || props.children;
}

var ReduxRouter = (_temp = _class = function (_Component) {
  _inherits(ReduxRouter, _Component);

  function ReduxRouter(props, context) {
    _classCallCheck(this, ReduxRouter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxRouter).call(this, props, context));
  }

  _createClass(ReduxRouter, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.context.store.dispatch((0, _actionCreators.initRoutes)(getRoutesFromProps(this.props)));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.receiveRoutes(getRoutesFromProps(nextProps));
    }
  }, {
    key: 'receiveRoutes',
    value: function receiveRoutes(routes) {
      if (!routes) return;

      var store = this.context.store;

      store.dispatch((0, _actionCreators.replaceRoutes)(routes));
    }
  }, {
    key: 'render',
    value: function render() {
      var store = this.context.store;


      if (!store) {
        throw new Error('Redux store missing from context of <ReduxRouter>. Make sure you\'re ' + 'using a <Provider>');
      }

      var history = store.history;
      var routerStateSelector = store[_constants.ROUTER_STATE_SELECTOR];


      if (!history || !routerStateSelector) {
        throw new Error('Redux store not configured properly for <ReduxRouter>. Make sure ' + 'you\'re using the reduxReactRouter() store enhancer.');
      }

      return _react2.default.createElement(ReduxRouterContext, _extends({
        history: history,
        routerStateSelector: memoizeRouterStateSelector(routerStateSelector)
      }, this.props));
    }
  }]);

  return ReduxRouter;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.node
}, _class.contextTypes = {
  store: _react.PropTypes.object
}, _temp);
var ReduxRouterContext = (_dec = (0, _reactRedux.connect)(function (state, _ref) {
  var routerStateSelector = _ref.routerStateSelector;
  return routerStateSelector(state) || {};
}), _dec(_class2 = (_temp2 = _class3 = function (_Component2) {
  _inherits(ReduxRouterContext, _Component2);

  function ReduxRouterContext() {
    _classCallCheck(this, ReduxRouterContext);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxRouterContext).apply(this, arguments));
  }

  _createClass(ReduxRouterContext, [{
    key: 'render',
    value: function render() {
      var location = this.props.location;


      if (location === null || location === undefined) {
        return null; // Async matching
      }

      var RoutingContext = this.props.RoutingContext || _reactRouter.RoutingContext;

      return _react2.default.createElement(RoutingContext, this.props);
    }
  }]);

  return ReduxRouterContext;
}(_react.Component), _class3.propTypes = {
  location: _react.PropTypes.object,
  RoutingContext: _react.PropTypes.element
}, _temp2)) || _class2);
exports.default = ReduxRouter;