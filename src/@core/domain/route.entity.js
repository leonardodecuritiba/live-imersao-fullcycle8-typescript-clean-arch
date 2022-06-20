"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Route = void 0;
var crypto_1 = require("crypto");
//Será minha entidade rota
var Route = /** @class */ (function () {
    function Route(props, id) {
        this.id = id || crypto_1["default"].randomUUID();
        this.props = __assign(__assign({}, props), { points: props.points || [] });
    }
    // Atualizando o meu title, a alteraçao das propriedades da minha entidade
    // ficarão sempre a cargo da minha entidade, pois fazem parte da regra de negócio.
    // Qualquer regra de negócio precisa ser executada pelos metodos das Entidades
    // Entidades anêmicas é ficar usando set para fazer as coisas, nao deixando claro
    // as regras de negócio.
    Route.prototype.updateTitle = function (title) {
        this.title = title;
        //Outras coisas que eu poderia fazer
        //mudar pra maiúsculo
        //valor alguns caracteres
        //validações
    };
    //updatePosition é muito mais que um setter, ele envolve a regra de meu negocio
    Route.prototype.updatePosition = function (startPosition, endPosition) {
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        //mudar pra maiúsculo
        //valor alguns caracteres
        //validações
    };
    //updatePoints é muito mais que um setter, ele envolve a regra de meu negocio
    Route.prototype.updatePoints = function (points) {
        this.points = points;
        //mudar pra maiúsculo
        //valor alguns caracteres
        //validações
    };
    Object.defineProperty(Route.prototype, "title", {
        get: function () {
            return this.props.title;
        },
        set: function (value) {
            this.props.title = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "startPosition", {
        get: function () {
            return this.props.startPosition;
        },
        set: function (value) {
            this.props.startPosition = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "endPosition", {
        get: function () {
            return this.props.endPosition;
        },
        set: function (value) {
            this.props.endPosition = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "points", {
        get: function () {
            return this.props.points;
        },
        set: function (value) {
            this.props.points = value;
        },
        enumerable: false,
        configurable: true
    });
    Route.prototype.toJSON = function () {
        return __assign({ id: this.id }, this.props);
    };
    return Route;
}());
exports.Route = Route;
