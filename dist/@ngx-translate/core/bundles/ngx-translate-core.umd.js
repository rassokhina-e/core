(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ngx-translate/core', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global['ngx-translate'] = global['ngx-translate'] || {}, global['ngx-translate'].core = {}),global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,rxjs,operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ TranslateLoader = /** @class */ (function () {
        function TranslateLoader() {
        }
        return TranslateLoader;
    }());
    /**
     * This loader is just a placeholder that does nothing, in case you don't need a loader at all
     */
    var TranslateFakeLoader = /** @class */ (function (_super) {
        __extends(TranslateFakeLoader, _super);
        function TranslateFakeLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} lang
         * @return {?}
         */
        TranslateFakeLoader.prototype.getTranslation = /**
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                return rxjs.of({});
            };
        TranslateFakeLoader.decorators = [
            { type: core.Injectable }
        ];
        return TranslateFakeLoader;
    }(TranslateLoader));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ MissingTranslationHandler = /** @class */ (function () {
        function MissingTranslationHandler() {
        }
        return MissingTranslationHandler;
    }());
    /**
     * This handler is just a placeholder that does nothing, in case you don't need a missing translation handler at all
     */
    var FakeMissingTranslationHandler = /** @class */ (function () {
        function FakeMissingTranslationHandler() {
        }
        /**
         * @param {?} params
         * @return {?}
         */
        FakeMissingTranslationHandler.prototype.handle = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                return params.key;
            };
        FakeMissingTranslationHandler.decorators = [
            { type: core.Injectable }
        ];
        return FakeMissingTranslationHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ TranslateCompiler = /** @class */ (function () {
        function TranslateCompiler() {
        }
        return TranslateCompiler;
    }());
    /**
     * This compiler is just a placeholder that does nothing, in case you don't need a compiler at all
     */
    var TranslateFakeCompiler = /** @class */ (function (_super) {
        __extends(TranslateFakeCompiler, _super);
        function TranslateFakeCompiler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} value
         * @param {?} lang
         * @return {?}
         */
        TranslateFakeCompiler.prototype.compile = /**
         * @param {?} value
         * @param {?} lang
         * @return {?}
         */
            function (value, lang) {
                return value;
            };
        /**
         * @param {?} translations
         * @param {?} lang
         * @return {?}
         */
        TranslateFakeCompiler.prototype.compileTranslations = /**
         * @param {?} translations
         * @param {?} lang
         * @return {?}
         */
            function (translations, lang) {
                return translations;
            };
        TranslateFakeCompiler.decorators = [
            { type: core.Injectable }
        ];
        return TranslateFakeCompiler;
    }(TranslateCompiler));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /* tslint:disable */
    /**
     * Determines if two objects or two values are equivalent.
     *
     * Two objects or values are considered equivalent if at least one of the following is true:
     *
     * * Both objects or values pass `===` comparison.
     * * Both objects or values are of the same type and all of their properties are equal by
     *   comparing them with `equals`.
     *
     * @param {?} o1 Object or value to compare.
     * @param {?} o2 Object or value to compare.
     * @return {?} true if arguments are equal.
     */
    function equals(o1, o2) {
        if (o1 === o2)
            return true;
        if (o1 === null || o2 === null)
            return false;
        if (o1 !== o1 && o2 !== o2)
            return true; // NaN === NaN
        // NaN === NaN
        /** @type {?} */
        var t1 = typeof o1;
        /** @type {?} */
        var t2 = typeof o2;
        /** @type {?} */
        var length;
        /** @type {?} */
        var key;
        /** @type {?} */
        var keySet;
        if (t1 == t2 && t1 == 'object') {
            if (Array.isArray(o1)) {
                if (!Array.isArray(o2))
                    return false;
                if ((length = o1.length) == o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!equals(o1[key], o2[key]))
                            return false;
                    }
                    return true;
                }
            }
            else {
                if (Array.isArray(o2)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in o1) {
                    if (!equals(o1[key], o2[key])) {
                        return false;
                    }
                    keySet[key] = true;
                }
                for (key in o2) {
                    if (!(key in keySet) && typeof o2[key] !== 'undefined') {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    /* tslint:enable */
    /**
     * @param {?} value
     * @return {?}
     */
    function isDefined(value) {
        return typeof value !== 'undefined' && value !== null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    /**
     * @param {?} target
     * @param {?} source
     * @return {?}
     */
    function mergeDeep(target, source) {
        /** @type {?} */
        var output = Object.assign({}, target);
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach(function (key) {
                var _a, _b;
                if (isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                    }
                    else {
                        output[key] = mergeDeep(target[key], source[key]);
                    }
                }
                else {
                    Object.assign(output, (_b = {}, _b[key] = source[key], _b));
                }
            });
        }
        return output;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ TranslateParser = /** @class */ (function () {
        function TranslateParser() {
        }
        return TranslateParser;
    }());
    var TranslateDefaultParser = /** @class */ (function (_super) {
        __extends(TranslateDefaultParser, _super);
        function TranslateDefaultParser() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
            return _this;
        }
        /**
         * @param {?} expr
         * @param {?=} params
         * @return {?}
         */
        TranslateDefaultParser.prototype.interpolate = /**
         * @param {?} expr
         * @param {?=} params
         * @return {?}
         */
            function (expr, params) {
                /** @type {?} */
                var result;
                if (typeof expr === 'string') {
                    result = this.interpolateString(expr, params);
                }
                else if (typeof expr === 'function') {
                    result = this.interpolateFunction(expr, params);
                }
                else {
                    // this should not happen, but an unrelated TranslateService test depends on it
                    result = ( /** @type {?} */(expr));
                }
                return result;
            };
        /**
         * @param {?} target
         * @param {?} key
         * @return {?}
         */
        TranslateDefaultParser.prototype.getValue = /**
         * @param {?} target
         * @param {?} key
         * @return {?}
         */
            function (target, key) {
                /** @type {?} */
                var keys = key.split('.');
                key = '';
                do {
                    key += keys.shift();
                    if (isDefined(target) && isDefined(target[key]) && (typeof target[key] === 'object' || !keys.length)) {
                        target = target[key];
                        key = '';
                    }
                    else if (!keys.length) {
                        target = undefined;
                    }
                    else {
                        key += '.';
                    }
                } while (keys.length);
                return target;
            };
        /**
         * @param {?} fn
         * @param {?=} params
         * @return {?}
         */
        TranslateDefaultParser.prototype.interpolateFunction = /**
         * @param {?} fn
         * @param {?=} params
         * @return {?}
         */
            function (fn, params) {
                return fn(params);
            };
        /**
         * @param {?} expr
         * @param {?=} params
         * @return {?}
         */
        TranslateDefaultParser.prototype.interpolateString = /**
         * @param {?} expr
         * @param {?=} params
         * @return {?}
         */
            function (expr, params) {
                var _this = this;
                if (!params) {
                    return expr;
                }
                return expr.replace(this.templateMatcher, function (substring, b) {
                    /** @type {?} */
                    var r = _this.getValue(params, b);
                    return isDefined(r) ? r : substring;
                });
            };
        TranslateDefaultParser.decorators = [
            { type: core.Injectable }
        ];
        return TranslateDefaultParser;
    }(TranslateParser));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslateStore = /** @class */ (function () {
        function TranslateStore() {
            /**
             * The lang currently used
             */
            this.currentLang = this.defaultLang;
            /**
             * a list of translations per lang
             */
            this.translations = {};
            /**
             * an array of langs
             */
            this.langs = [];
            /**
             * An EventEmitter to listen to translation change events
             * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
             *     // do something
             * });
             */
            this.onTranslationChange = new core.EventEmitter();
            /**
             * An EventEmitter to listen to lang change events
             * onLangChange.subscribe((params: LangChangeEvent) => {
             *     // do something
             * });
             */
            this.onLangChange = new core.EventEmitter();
            /**
             * An EventEmitter to listen to default lang change events
             * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
             *     // do something
             * });
             */
            this.onDefaultLangChange = new core.EventEmitter();
        }
        return TranslateStore;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var USE_STORE = new core.InjectionToken('USE_STORE');
    /** @type {?} */
    var USE_DEFAULT_LANG = new core.InjectionToken('USE_DEFAULT_LANG');
    var TranslateService = /** @class */ (function () {
        /**
         *
         * @param store an instance of the store (that is supposed to be unique)
         * @param currentLoader An instance of the loader currently used
         * @param compiler An instance of the compiler currently used
         * @param parser An instance of the parser currently used
         * @param missingTranslationHandler A handler for missing translations.
         * @param isolate whether this service should use the store or not
         * @param useDefaultLang whether we should use default language translation when current language translation is missing.
         */
        function TranslateService(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang, isolate) {
            if (useDefaultLang === void 0) {
                useDefaultLang = true;
            }
            if (isolate === void 0) {
                isolate = false;
            }
            this.store = store;
            this.currentLoader = currentLoader;
            this.compiler = compiler;
            this.parser = parser;
            this.missingTranslationHandler = missingTranslationHandler;
            this.useDefaultLang = useDefaultLang;
            this.isolate = isolate;
            this._isActive = false;
            this.pending = false;
            this._onTranslationChange = new core.EventEmitter();
            this._onLangChange = new core.EventEmitter();
            this._onDefaultLangChange = new core.EventEmitter();
            this._langs = [];
            this._translations = {};
            this._translationRequests = {};
        }
        Object.defineProperty(TranslateService.prototype, "onTranslationChange", {
            /**
             * An EventEmitter to listen to translation change events
             * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
               *     // do something
               * });
             */
            get: /**
             * An EventEmitter to listen to translation change events
             * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
             *     // do something
             * });
             * @return {?}
             */ function () {
                return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "onLangChange", {
            /**
             * An EventEmitter to listen to lang change events
             * onLangChange.subscribe((params: LangChangeEvent) => {
               *     // do something
               * });
             */
            get: /**
             * An EventEmitter to listen to lang change events
             * onLangChange.subscribe((params: LangChangeEvent) => {
             *     // do something
             * });
             * @return {?}
             */ function () {
                return this.isolate ? this._onLangChange : this.store.onLangChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "onDefaultLangChange", {
            /**
             * An EventEmitter to listen to default lang change events
             * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
               *     // do something
               * });
             */
            get: /**
             * An EventEmitter to listen to default lang change events
             * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
             *     // do something
             * });
             * @return {?}
             */ function () {
                return this.isolate ? this._onDefaultLangChange : this.store.onDefaultLangChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "defaultLang", {
            /**
             * The default lang to fallback when translations are missing on the current lang
             */
            get: /**
             * The default lang to fallback when translations are missing on the current lang
             * @return {?}
             */ function () {
                return this.isolate ? this._defaultLang : this.store.defaultLang;
            },
            set: /**
             * @param {?} defaultLang
             * @return {?}
             */ function (defaultLang) {
                if (this.isolate) {
                    this._defaultLang = defaultLang;
                }
                else {
                    this.store.defaultLang = defaultLang;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "currentLang", {
            /**
             * The lang currently used
             */
            get: /**
             * The lang currently used
             * @return {?}
             */ function () {
                return this.isolate ? this._currentLang : this.store.currentLang;
            },
            set: /**
             * @param {?} currentLang
             * @return {?}
             */ function (currentLang) {
                if (this.isolate) {
                    this._currentLang = currentLang;
                }
                else {
                    this.store.currentLang = currentLang;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "langs", {
            /**
             * an array of langs
             */
            get: /**
             * an array of langs
             * @return {?}
             */ function () {
                return this.isolate ? this._langs : this.store.langs;
            },
            set: /**
             * @param {?} langs
             * @return {?}
             */ function (langs) {
                if (this.isolate) {
                    this._langs = langs;
                }
                else {
                    this.store.langs = langs;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "translations", {
            /**
             * a list of translations per lang
             */
            get: /**
             * a list of translations per lang
             * @return {?}
             */ function () {
                return this.isolate ? this._translations : this.store.translations;
            },
            set: /**
             * @param {?} translations
             * @return {?}
             */ function (translations) {
                if (this.isolate) {
                    this._translations = translations;
                }
                else {
                    this.store.translations = translations;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the default language to use as a fallback
         */
        /**
         * Sets the default language to use as a fallback
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.setDefaultLang = /**
         * Sets the default language to use as a fallback
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                var _this = this;
                if (lang === this.defaultLang) {
                    return;
                }
                /** @type {?} */
                var pending = this.retrieveTranslations(lang);
                if (typeof pending !== "undefined") {
                    // on init set the defaultLang immediately
                    if (!this.defaultLang) {
                        this.defaultLang = lang;
                    }
                    pending.pipe(operators.take(1))
                        .subscribe(function (res) {
                        _this.changeDefaultLang(lang);
                    });
                }
                else { // we already have this language
                    this.changeDefaultLang(lang);
                }
            };
        /**
         * Gets the default language used
         */
        /**
         * Gets the default language used
         * @return {?}
         */
        TranslateService.prototype.getDefaultLang = /**
         * Gets the default language used
         * @return {?}
         */
            function () {
                return this.defaultLang;
            };
        /**
         * Changes the lang currently used
         */
        /**
         * Changes the lang currently used
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.use = /**
         * Changes the lang currently used
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                var _this = this;
                // don't change the language if the language given is already selected
                if (lang === this.currentLang) {
                    return rxjs.of(this.translations[lang]);
                }
                /** @type {?} */
                var pending = this.retrieveTranslations(lang);
                if (typeof pending !== "undefined") {
                    // on init set the currentLang immediately
                    if (!this.currentLang) {
                        this.currentLang = lang;
                    }
                    pending.pipe(operators.take(1))
                        .subscribe(function (res) {
                        _this.changeLang(lang);
                    });
                    return pending;
                }
                else { // we have this language, return an Observable
                    this.changeLang(lang);
                    return rxjs.of(this.translations[lang]);
                }
            };
        /**
         * Retrieves the given translations
         */
        /**
         * Retrieves the given translations
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.retrieveTranslations = /**
         * Retrieves the given translations
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                /** @type {?} */
                var pending;
                // if this language is unavailable, ask for it
                if (typeof this.translations[lang] === "undefined") {
                    this._translationRequests[lang] = this._translationRequests[lang] || this.getTranslation(lang);
                    pending = this._translationRequests[lang];
                }
                return pending;
            };
        /**
         * Gets an object of translations for a given language with the current loader
         * and passes it through the compiler
         */
        /**
         * Gets an object of translations for a given language with the current loader
         * and passes it through the compiler
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.getTranslation = /**
         * Gets an object of translations for a given language with the current loader
         * and passes it through the compiler
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                var _this = this;
                this.pending = true;
                /** @type {?} */
                var loadingTranslations = this.currentLoader.getTranslation(lang).pipe(operators.share());
                this.loadingTranslations = loadingTranslations.pipe(operators.take(1), operators.map(function (res) { return _this.compiler.compileTranslations(res, lang); }), operators.share());
                this.loadingTranslations
                    .subscribe(function (res) {
                    _this.translations[lang] = res;
                    _this.updateLangs();
                    _this.pending = false;
                }, function (err) {
                    _this.pending = false;
                });
                return loadingTranslations;
            };
        /**
         * Manually sets an object of translations for a given language
         * after passing it through the compiler
         */
        /**
         * Manually sets an object of translations for a given language
         * after passing it through the compiler
         * @param {?} lang
         * @param {?} translations
         * @param {?=} shouldMerge
         * @return {?}
         */
        TranslateService.prototype.setTranslation = /**
         * Manually sets an object of translations for a given language
         * after passing it through the compiler
         * @param {?} lang
         * @param {?} translations
         * @param {?=} shouldMerge
         * @return {?}
         */
            function (lang, translations, shouldMerge) {
                if (shouldMerge === void 0) {
                    shouldMerge = false;
                }
                translations = this.compiler.compileTranslations(translations, lang);
                if (shouldMerge && this.translations[lang]) {
                    this.translations[lang] = mergeDeep(this.translations[lang], translations);
                }
                else {
                    this.translations[lang] = translations;
                }
                this.updateLangs();
                this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
            };
        /**
         * Returns an array of currently available langs
         */
        /**
         * Returns an array of currently available langs
         * @return {?}
         */
        TranslateService.prototype.getLangs = /**
         * Returns an array of currently available langs
         * @return {?}
         */
            function () {
                return this.langs;
            };
        /**
         * Add available langs
         */
        /**
         * Add available langs
         * @param {?} langs
         * @return {?}
         */
        TranslateService.prototype.addLangs = /**
         * Add available langs
         * @param {?} langs
         * @return {?}
         */
            function (langs) {
                var _this = this;
                langs.forEach(function (lang) {
                    if (_this.langs.indexOf(lang) === -1) {
                        _this.langs.push(lang);
                    }
                });
            };
        /**
         * Update the list of available langs
         */
        /**
         * Update the list of available langs
         * @return {?}
         */
        TranslateService.prototype.updateLangs = /**
         * Update the list of available langs
         * @return {?}
         */
            function () {
                this.addLangs(Object.keys(this.translations));
            };
        /**
         * Returns the parsed result of the translations
         */
        /**
         * Returns the parsed result of the translations
         * @param {?} translations
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?}
         */
        TranslateService.prototype.getParsedResult = /**
         * Returns the parsed result of the translations
         * @param {?} translations
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?}
         */
            function (translations, key, interpolateParams) {
                var e_1, _a, e_2, _b;
                /** @type {?} */
                var res;
                if (key instanceof Array) {
                    /** @type {?} */
                    var result = {};
                    /** @type {?} */
                    var observables = false;
                    try {
                        for (var key_1 = __values(key), key_1_1 = key_1.next(); !key_1_1.done; key_1_1 = key_1.next()) {
                            var k = key_1_1.value;
                            result[k] = this.getParsedResult(translations, k, interpolateParams);
                            if (typeof result[k].subscribe === "function") {
                                observables = true;
                            }
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (key_1_1 && !key_1_1.done && (_a = key_1.return))
                                _a.call(key_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                    if (observables) {
                        /** @type {?} */
                        var mergedObs = void 0;
                        try {
                            for (var key_2 = __values(key), key_2_1 = key_2.next(); !key_2_1.done; key_2_1 = key_2.next()) {
                                var k = key_2_1.value;
                                /** @type {?} */
                                var obs = typeof result[k].subscribe === "function" ? result[k] : rxjs.of(( /** @type {?} */(result[k])));
                                if (typeof mergedObs === "undefined") {
                                    mergedObs = obs;
                                }
                                else {
                                    mergedObs = rxjs.merge(mergedObs, obs);
                                }
                            }
                        }
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (key_2_1 && !key_2_1.done && (_b = key_2.return))
                                    _b.call(key_2);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
                        }
                        return mergedObs.pipe(operators.toArray(), operators.map(function (arr) {
                            /** @type {?} */
                            var obj = {};
                            arr.forEach(function (value, index) {
                                obj[key[index]] = value;
                            });
                            return obj;
                        }));
                    }
                    return result;
                }
                if (translations) {
                    res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
                }
                if (typeof res === "undefined" && this.defaultLang && this.defaultLang !== this.currentLang && this.useDefaultLang) {
                    res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
                }
                if (typeof res === "undefined") {
                    /** @type {?} */
                    var params = { key: key, translateService: this };
                    if (typeof interpolateParams !== 'undefined') {
                        params.interpolateParams = interpolateParams;
                    }
                    res = this.missingTranslationHandler.handle(params);
                }
                return typeof res !== "undefined" ? res : key;
            };
        /**
         * Gets the translated value of a key (or an array of keys)
         * @returns the translated key, or an object of translated keys
         */
        /**
         * Gets the translated value of a key (or an array of keys)
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?} the translated key, or an object of translated keys
         */
        TranslateService.prototype.get = /**
         * Gets the translated value of a key (or an array of keys)
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?} the translated key, or an object of translated keys
         */
            function (key, interpolateParams) {
                var _this = this;
                if (!isDefined(key) || !key.length) {
                    throw new Error("Parameter \"key\" required");
                }
                // check if we are loading a new translation to use
                if (this.pending) {
                    return rxjs.Observable.create(function (observer) {
                        /** @type {?} */
                        var onComplete = function (res) {
                            observer.next(res);
                            observer.complete();
                        };
                        /** @type {?} */
                        var onError = function (err) {
                            observer.error(err);
                        };
                        _this.loadingTranslations.subscribe(function (res) {
                            res = _this.getParsedResult(res, key, interpolateParams);
                            if (typeof res.subscribe === "function") {
                                res.subscribe(onComplete, onError);
                            }
                            else {
                                onComplete(res);
                            }
                        }, onError);
                    });
                }
                else {
                    /** @type {?} */
                    var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
                    if (typeof res.subscribe === "function") {
                        return res;
                    }
                    else {
                        return rxjs.of(res);
                    }
                }
            };
        /**
         * Returns a stream of translated values of a key (or an array of keys) which updates
         * whenever the language changes.
         * @returns A stream of the translated key, or an object of translated keys
         */
        /**
         * Returns a stream of translated values of a key (or an array of keys) which updates
         * whenever the language changes.
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?} A stream of the translated key, or an object of translated keys
         */
        TranslateService.prototype.stream = /**
         * Returns a stream of translated values of a key (or an array of keys) which updates
         * whenever the language changes.
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?} A stream of the translated key, or an object of translated keys
         */
            function (key, interpolateParams) {
                var _this = this;
                if (!isDefined(key) || !key.length) {
                    throw new Error("Parameter \"key\" required");
                }
                return rxjs.concat(this.get(key, interpolateParams), this.onLangChange.pipe(operators.switchMap(function (event) {
                    /** @type {?} */
                    var res = _this.getParsedResult(event.translations, key, interpolateParams);
                    if (typeof res.subscribe === "function") {
                        return res;
                    }
                    else {
                        return rxjs.of(res);
                    }
                })));
            };
        /**
         * Returns a translation instantly from the internal state of loaded translation.
         * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
         */
        /**
         * Returns a translation instantly from the internal state of loaded translation.
         * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?}
         */
        TranslateService.prototype.instant = /**
         * Returns a translation instantly from the internal state of loaded translation.
         * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?}
         */
            function (key, interpolateParams) {
                if (!isDefined(key) || !key.length) {
                    throw new Error("Parameter \"key\" required");
                }
                /** @type {?} */
                var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
                if (typeof res.subscribe !== "undefined") {
                    if (key instanceof Array) {
                        /** @type {?} */
                        var obj_1 = {};
                        key.forEach(function (value, index) {
                            obj_1[key[index]] = key[index];
                        });
                        return obj_1;
                    }
                    return key;
                }
                else {
                    return res;
                }
            };
        /**
         * Sets the translated value of a key, after compiling it
         */
        /**
         * Sets the translated value of a key, after compiling it
         * @param {?} key
         * @param {?} value
         * @param {?=} lang
         * @return {?}
         */
        TranslateService.prototype.set = /**
         * Sets the translated value of a key, after compiling it
         * @param {?} key
         * @param {?} value
         * @param {?=} lang
         * @return {?}
         */
            function (key, value, lang) {
                if (lang === void 0) {
                    lang = this.currentLang;
                }
                this.translations[lang][key] = this.compiler.compile(value, lang);
                this.updateLangs();
                this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
            };
        /**
         * Changes the current lang
         */
        /**
         * Changes the current lang
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.changeLang = /**
         * Changes the current lang
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                this.currentLang = lang;
                this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
                // if there is no default lang, use the one that we just set
                if (!this.defaultLang) {
                    this.changeDefaultLang(lang);
                }
            };
        /**
         * Changes the default lang
         */
        /**
         * Changes the default lang
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.changeDefaultLang = /**
         * Changes the default lang
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                this.defaultLang = lang;
                this.onDefaultLangChange.emit({ lang: lang, translations: this.translations[lang] });
            };
        /**
         * Allows to reload the lang file from the file
         */
        /**
         * Allows to reload the lang file from the file
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.reloadLang = /**
         * Allows to reload the lang file from the file
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                this.resetLang(lang);
                return this.getTranslation(lang);
            };
        /**
         * Deletes inner translation
         */
        /**
         * Deletes inner translation
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.resetLang = /**
         * Deletes inner translation
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                this._translationRequests[lang] = undefined;
                this.translations[lang] = undefined;
            };
        /**
         * Returns the language code name from the browser, e.g. "de"
         */
        /**
         * Returns the language code name from the browser, e.g. "de"
         * @return {?}
         */
        TranslateService.prototype.getBrowserLang = /**
         * Returns the language code name from the browser, e.g. "de"
         * @return {?}
         */
            function () {
                if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
                    return undefined;
                }
                /** @type {?} */
                var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
                browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
                if (browserLang.indexOf('-') !== -1) {
                    browserLang = browserLang.split('-')[0];
                }
                if (browserLang.indexOf('_') !== -1) {
                    browserLang = browserLang.split('_')[0];
                }
                return browserLang;
            };
        /**
         * Returns the culture language code name from the browser, e.g. "de-DE"
         */
        /**
         * Returns the culture language code name from the browser, e.g. "de-DE"
         * @return {?}
         */
        TranslateService.prototype.getBrowserCultureLang = /**
         * Returns the culture language code name from the browser, e.g. "de-DE"
         * @return {?}
         */
            function () {
                if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
                    return undefined;
                }
                /** @type {?} */
                var browserCultureLang = window.navigator.languages ? window.navigator.languages[0] : null;
                browserCultureLang = browserCultureLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
                return browserCultureLang;
            };
        /**
         * @return {?}
         */
        TranslateService.prototype.triggerChange = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._isActive = true;
                setTimeout(function () {
                    _this._isActive = false;
                }, 1000);
            };
        TranslateService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TranslateService.ctorParameters = function () {
            return [
                { type: TranslateStore },
                { type: TranslateLoader },
                { type: TranslateCompiler },
                { type: TranslateParser },
                { type: MissingTranslationHandler },
                { type: Boolean, decorators: [{ type: core.Inject, args: [USE_DEFAULT_LANG,] }] },
                { type: Boolean, decorators: [{ type: core.Inject, args: [USE_STORE,] }] }
            ];
        };
        return TranslateService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslateDirective = /** @class */ (function () {
        function TranslateDirective(translateService, element, _ref) {
            var _this = this;
            this.translateService = translateService;
            this.element = element;
            this._ref = _ref;
            // subscribe to onTranslationChange event, in case the translations of the current lang change
            if (!this.onTranslationChangeSub) {
                this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe(function (event) {
                    if (event.lang === _this.translateService.currentLang) {
                        _this.checkNodes(true, event.translations);
                    }
                });
            }
            // subscribe to onLangChange event, in case the language changes
            if (!this.onLangChangeSub) {
                this.onLangChangeSub = this.translateService.onLangChange.subscribe(function (event) {
                    _this.checkNodes(true, event.translations);
                });
            }
            // subscribe to onDefaultLangChange event, in case the default language changes
            if (!this.onDefaultLangChangeSub) {
                this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe(function (event) {
                    _this.checkNodes(true);
                });
            }
        }
        Object.defineProperty(TranslateDirective.prototype, "translate", {
            set: /**
             * @param {?} key
             * @return {?}
             */ function (key) {
                if (key) {
                    this.key = key;
                    this.checkNodes();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateDirective.prototype, "translateParams", {
            set: /**
             * @param {?} params
             * @return {?}
             */ function (params) {
                if (!equals(this.currentParams, params)) {
                    this.currentParams = params;
                    this.checkNodes(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TranslateDirective.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
            function () {
                if (this.translateService._isActive) {
                    this.checkNodes();
                }
            };
        /**
         * @param {?=} forceUpdate
         * @param {?=} translations
         * @return {?}
         */
        TranslateDirective.prototype.checkNodes = /**
         * @param {?=} forceUpdate
         * @param {?=} translations
         * @return {?}
         */
            function (forceUpdate, translations) {
                if (forceUpdate === void 0) {
                    forceUpdate = false;
                }
                /** @type {?} */
                var nodes = this.element.nativeElement.childNodes;
                // if the element is empty
                if (!nodes.length) {
                    // we add the key as content
                    this.setContent(this.element.nativeElement, this.key);
                    nodes = this.element.nativeElement.childNodes;
                }
                for (var i = 0; i < nodes.length; ++i) {
                    /** @type {?} */
                    var node = nodes[i];
                    if (node.nodeType === 3) { // node type 3 is a text node
                        // node type 3 is a text node
                        /** @type {?} */
                        var key = void 0;
                        if (this.key) {
                            key = this.key;
                            if (forceUpdate) {
                                node.lastKey = null;
                            }
                        }
                        else {
                            /** @type {?} */
                            var content = this.getContent(node);
                            /** @type {?} */
                            var trimmedContent = content.trim();
                            if (trimmedContent.length) {
                                // we want to use the content as a key, not the translation value
                                if (content !== node.currentValue) {
                                    key = trimmedContent;
                                    // the content was changed from the user, we'll use it as a reference if needed
                                    node.originalContent = this.getContent(node);
                                }
                                else if (node.originalContent && forceUpdate) { // the content seems ok, but the lang has changed
                                    node.lastKey = null;
                                    // the current content is the translation, not the key, use the last real content as key
                                    key = node.originalContent.trim();
                                }
                            }
                        }
                        this.updateValue(key, node, translations);
                    }
                }
            };
        /**
         * @param {?} key
         * @param {?} node
         * @param {?} translations
         * @return {?}
         */
        TranslateDirective.prototype.updateValue = /**
         * @param {?} key
         * @param {?} node
         * @param {?} translations
         * @return {?}
         */
            function (key, node, translations) {
                var _this = this;
                if (key) {
                    if (node.lastKey === key && this.lastParams === this.currentParams) {
                        return;
                    }
                    this.lastParams = this.currentParams;
                    /** @type {?} */
                    var onTranslation = function (res) {
                        if (res !== key) {
                            node.lastKey = key;
                        }
                        if (!node.originalContent) {
                            node.originalContent = _this.getContent(node);
                        }
                        node.currentValue = isDefined(res) ? res : (node.originalContent || key);
                        // we replace in the original content to preserve spaces that we might have trimmed
                        _this.setContent(node, _this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
                        _this._ref.markForCheck();
                    };
                    if (isDefined(translations)) {
                        /** @type {?} */
                        var res = this.translateService.getParsedResult(translations, key, this.currentParams);
                        if (typeof res.subscribe === "function") {
                            res.subscribe(onTranslation);
                        }
                        else {
                            onTranslation(res);
                        }
                    }
                    else {
                        this.translateService.get(key, this.currentParams).subscribe(onTranslation);
                    }
                }
            };
        /**
         * @param {?} node
         * @return {?}
         */
        TranslateDirective.prototype.getContent = /**
         * @param {?} node
         * @return {?}
         */
            function (node) {
                return isDefined(node.textContent) ? node.textContent : node.data;
            };
        /**
         * @param {?} node
         * @param {?} content
         * @return {?}
         */
        TranslateDirective.prototype.setContent = /**
         * @param {?} node
         * @param {?} content
         * @return {?}
         */
            function (node, content) {
                if (isDefined(node.textContent)) {
                    node.textContent = content;
                }
                else {
                    node.data = content;
                }
            };
        /**
         * @return {?}
         */
        TranslateDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this.onLangChangeSub) {
                    this.onLangChangeSub.unsubscribe();
                }
                if (this.onDefaultLangChangeSub) {
                    this.onDefaultLangChangeSub.unsubscribe();
                }
                if (this.onTranslationChangeSub) {
                    this.onTranslationChangeSub.unsubscribe();
                }
            };
        TranslateDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[translate],[ngx-translate]'
                    },] }
        ];
        /** @nocollapse */
        TranslateDirective.ctorParameters = function () {
            return [
                { type: TranslateService },
                { type: core.ElementRef },
                { type: core.ChangeDetectorRef }
            ];
        };
        TranslateDirective.propDecorators = {
            translate: [{ type: core.Input }],
            translateParams: [{ type: core.Input }]
        };
        return TranslateDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslatePipe = /** @class */ (function () {
        function TranslatePipe(translate, _ref) {
            this.translate = translate;
            this._ref = _ref;
            this.value = '';
        }
        /**
         * @param {?} key
         * @param {?=} interpolateParams
         * @param {?=} translations
         * @return {?}
         */
        TranslatePipe.prototype.updateValue = /**
         * @param {?} key
         * @param {?=} interpolateParams
         * @param {?=} translations
         * @return {?}
         */
            function (key, interpolateParams, translations) {
                var _this = this;
                /** @type {?} */
                var onTranslation = function (res) {
                    _this.value = res !== undefined ? res : key;
                    _this.lastKey = key;
                    _this._ref.markForCheck();
                };
                if (translations) {
                    /** @type {?} */
                    var res = this.translate.getParsedResult(translations, key, interpolateParams);
                    if (typeof res.subscribe === 'function') {
                        res.subscribe(onTranslation);
                    }
                    else {
                        onTranslation(res);
                    }
                }
                this.translate.get(key, interpolateParams).subscribe(onTranslation);
            };
        /**
         * @param {?} query
         * @param {...?} args
         * @return {?}
         */
        TranslatePipe.prototype.transform = /**
         * @param {?} query
         * @param {...?} args
         * @return {?}
         */
            function (query) {
                var _this = this;
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (!query || query.length === 0) {
                    return query;
                }
                // if we ask another time for the same key, return the last value
                if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
                    return this.value;
                }
                /** @type {?} */
                var interpolateParams;
                if (isDefined(args[0]) && args.length) {
                    if (typeof args[0] === 'string' && args[0].length) {
                        // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                        // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                        /** @type {?} */
                        var validArgs = args[0]
                            .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                            .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                        try {
                            interpolateParams = JSON.parse(validArgs);
                        }
                        catch (e) {
                            throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                        }
                    }
                    else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                        interpolateParams = args[0];
                    }
                }
                // store the query, in case it changes
                this.lastKey = query;
                // store the params, in case they change
                this.lastParams = args;
                // set the value
                this.updateValue(query, interpolateParams);
                // if there is a subscription to onLangChange, clean it
                this._dispose();
                // subscribe to onTranslationChange event, in case the translations change
                if (!this.onTranslationChange) {
                    this.onTranslationChange = this.translate.onTranslationChange.subscribe(function (event) {
                        if (_this.lastKey && event.lang === _this.translate.currentLang) {
                            _this.lastKey = null;
                            _this.updateValue(query, interpolateParams, event.translations);
                        }
                    });
                }
                // subscribe to onLangChange event, in case the language changes
                if (!this.onLangChange) {
                    this.onLangChange = this.translate.onLangChange.subscribe(function (event) {
                        if (_this.lastKey) {
                            _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                            _this.updateValue(query, interpolateParams, event.translations);
                        }
                    });
                }
                // subscribe to onDefaultLangChange event, in case the default language changes
                if (!this.onDefaultLangChange) {
                    this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(function () {
                        if (_this.lastKey) {
                            _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                            _this.updateValue(query, interpolateParams);
                        }
                    });
                }
                return this.value;
            };
        /**
         * Clean any existing subscription to change events
         */
        /**
         * Clean any existing subscription to change events
         * @return {?}
         */
        TranslatePipe.prototype._dispose = /**
         * Clean any existing subscription to change events
         * @return {?}
         */
            function () {
                if (typeof this.onTranslationChange !== 'undefined') {
                    this.onTranslationChange.unsubscribe();
                    this.onTranslationChange = undefined;
                }
                if (typeof this.onLangChange !== 'undefined') {
                    this.onLangChange.unsubscribe();
                    this.onLangChange = undefined;
                }
                if (typeof this.onDefaultLangChange !== 'undefined') {
                    this.onDefaultLangChange.unsubscribe();
                    this.onDefaultLangChange = undefined;
                }
            };
        /**
         * @return {?}
         */
        TranslatePipe.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this._dispose();
            };
        TranslatePipe.decorators = [
            { type: core.Injectable },
            { type: core.Pipe, args: [{
                        name: 'translate',
                        pure: false // required to update the value when the promise is resolved
                    },] }
        ];
        /** @nocollapse */
        TranslatePipe.ctorParameters = function () {
            return [
                { type: TranslateService },
                { type: core.ChangeDetectorRef }
            ];
        };
        return TranslatePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslateModule = /** @class */ (function () {
        function TranslateModule() {
        }
        /**
         * Use this method in your root module to provide the TranslateService
         */
        /**
         * Use this method in your root module to provide the TranslateService
         * @param {?=} config
         * @return {?}
         */
        TranslateModule.forRoot = /**
         * Use this method in your root module to provide the TranslateService
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                if (config === void 0) {
                    config = {};
                }
                return {
                    ngModule: TranslateModule,
                    providers: [
                        config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                        config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                        config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                        config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                        TranslateStore,
                        { provide: USE_STORE, useValue: config.isolate },
                        { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                        TranslateService
                    ]
                };
            };
        /**
         * Use this method in your other (non root) modules to import the directive/pipe
         */
        /**
         * Use this method in your other (non root) modules to import the directive/pipe
         * @param {?=} config
         * @return {?}
         */
        TranslateModule.forChild = /**
         * Use this method in your other (non root) modules to import the directive/pipe
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                if (config === void 0) {
                    config = {};
                }
                return {
                    ngModule: TranslateModule,
                    providers: [
                        config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                        config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                        config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                        config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                        { provide: USE_STORE, useValue: config.isolate },
                        { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                        TranslateService
                    ]
                };
            };
        TranslateModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            TranslatePipe,
                            TranslateDirective
                        ],
                        exports: [
                            TranslatePipe,
                            TranslateDirective
                        ]
                    },] }
        ];
        return TranslateModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.TranslateModule = TranslateModule;
    exports.TranslateLoader = TranslateLoader;
    exports.TranslateFakeLoader = TranslateFakeLoader;
    exports.USE_STORE = USE_STORE;
    exports.USE_DEFAULT_LANG = USE_DEFAULT_LANG;
    exports.TranslateService = TranslateService;
    exports.MissingTranslationHandler = MissingTranslationHandler;
    exports.FakeMissingTranslationHandler = FakeMissingTranslationHandler;
    exports.TranslateParser = TranslateParser;
    exports.TranslateDefaultParser = TranslateDefaultParser;
    exports.TranslateCompiler = TranslateCompiler;
    exports.TranslateFakeCompiler = TranslateFakeCompiler;
    exports.TranslateDirective = TranslateDirective;
    exports.TranslatePipe = TranslatePipe;
    exports.TranslateStore = TranslateStore;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyYW5zbGF0ZS1jb3JlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvbGliL3RyYW5zbGF0ZS5sb2FkZXIudHMiLCJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvbGliL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlci50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLmNvbXBpbGVyLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi91dGlsLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi90cmFuc2xhdGUucGFyc2VyLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi90cmFuc2xhdGUuc3RvcmUudHMiLCJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvbGliL3RyYW5zbGF0ZS5zZXJ2aWNlLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi90cmFuc2xhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi90cmFuc2xhdGUucGlwZS50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9wdWJsaWNfYXBpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZn0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRyYW5zbGF0ZUxvYWRlciB7XG4gIGFic3RyYWN0IGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55Pjtcbn1cblxuLyoqXG4gKiBUaGlzIGxvYWRlciBpcyBqdXN0IGEgcGxhY2Vob2xkZXIgdGhhdCBkb2VzIG5vdGhpbmcsIGluIGNhc2UgeW91IGRvbid0IG5lZWQgYSBsb2FkZXIgYXQgYWxsXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVGYWtlTG9hZGVyIGV4dGVuZHMgVHJhbnNsYXRlTG9hZGVyIHtcbiAgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gb2Yoe30pO1xuICB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCIuL3RyYW5zbGF0ZS5zZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclBhcmFtcyB7XG4gIC8qKlxuICAgKiB0aGUga2V5IHRoYXQncyBtaXNzaW5nIGluIHRyYW5zbGF0aW9uIGZpbGVzXG4gICAqL1xuICBrZXk6IHN0cmluZztcblxuICAvKipcbiAgICogYW4gaW5zdGFuY2Ugb2YgdGhlIHNlcnZpY2UgdGhhdCB3YXMgdW5hYmxlIHRvIHRyYW5zbGF0ZSB0aGUga2V5LlxuICAgKi9cbiAgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZTtcblxuICAvKipcbiAgICogaW50ZXJwb2xhdGlvbiBwYXJhbXMgdGhhdCB3ZXJlIHBhc3NlZCBhbG9uZyBmb3IgdHJhbnNsYXRpbmcgdGhlIGdpdmVuIGtleS5cbiAgICovXG4gIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciB7XG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgaGFuZGxlcyBtaXNzaW5nIHRyYW5zbGF0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyBjb250ZXh0IGZvciByZXNvbHZpbmcgYSBtaXNzaW5nIHRyYW5zbGF0aW9uXG4gICAqIEByZXR1cm5zIGEgdmFsdWUgb3IgYW4gb2JzZXJ2YWJsZVxuICAgKiBJZiBpdCByZXR1cm5zIGEgdmFsdWUsIHRoZW4gdGhpcyB2YWx1ZSBpcyB1c2VkLlxuICAgKiBJZiBpdCByZXR1cm4gYW4gb2JzZXJ2YWJsZSwgdGhlIHZhbHVlIHJldHVybmVkIGJ5IHRoaXMgb2JzZXJ2YWJsZSB3aWxsIGJlIHVzZWQgKGV4Y2VwdCBpZiB0aGUgbWV0aG9kIHdhcyBcImluc3RhbnRcIikuXG4gICAqIElmIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZW4gdGhlIGtleSB3aWxsIGJlIHVzZWQgYXMgYSB2YWx1ZVxuICAgKi9cbiAgYWJzdHJhY3QgaGFuZGxlKHBhcmFtczogTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclBhcmFtcyk6IGFueTtcbn1cblxuLyoqXG4gKiBUaGlzIGhhbmRsZXIgaXMganVzdCBhIHBsYWNlaG9sZGVyIHRoYXQgZG9lcyBub3RoaW5nLCBpbiBjYXNlIHlvdSBkb24ndCBuZWVkIGEgbWlzc2luZyB0cmFuc2xhdGlvbiBoYW5kbGVyIGF0IGFsbFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmFrZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHtcbiAgaGFuZGxlKHBhcmFtczogTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHBhcmFtcy5rZXk7XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRyYW5zbGF0ZUNvbXBpbGVyIHtcbiAgYWJzdHJhY3QgY29tcGlsZSh2YWx1ZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcpOiBzdHJpbmcgfCBGdW5jdGlvbjtcblxuICBhYnN0cmFjdCBjb21waWxlVHJhbnNsYXRpb25zKHRyYW5zbGF0aW9uczogYW55LCBsYW5nOiBzdHJpbmcpOiBhbnk7XG59XG5cbi8qKlxuICogVGhpcyBjb21waWxlciBpcyBqdXN0IGEgcGxhY2Vob2xkZXIgdGhhdCBkb2VzIG5vdGhpbmcsIGluIGNhc2UgeW91IGRvbid0IG5lZWQgYSBjb21waWxlciBhdCBhbGxcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZUZha2VDb21waWxlciBleHRlbmRzIFRyYW5zbGF0ZUNvbXBpbGVyIHtcbiAgY29tcGlsZSh2YWx1ZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcpOiBzdHJpbmcgfCBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgY29tcGlsZVRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnM6IGFueSwgbGFuZzogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdHJhbnNsYXRpb25zO1xuICB9XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHR3byBvYmplY3RzIG9yIHR3byB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogVHdvIG9iamVjdHMgb3IgdmFsdWVzIGFyZSBjb25zaWRlcmVkIGVxdWl2YWxlbnQgaWYgYXQgbGVhc3Qgb25lIG9mIHRoZSBmb2xsb3dpbmcgaXMgdHJ1ZTpcbiAqXG4gKiAqIEJvdGggb2JqZWN0cyBvciB2YWx1ZXMgcGFzcyBgPT09YCBjb21wYXJpc29uLlxuICogKiBCb3RoIG9iamVjdHMgb3IgdmFsdWVzIGFyZSBvZiB0aGUgc2FtZSB0eXBlIGFuZCBhbGwgb2YgdGhlaXIgcHJvcGVydGllcyBhcmUgZXF1YWwgYnlcbiAqICAgY29tcGFyaW5nIHRoZW0gd2l0aCBgZXF1YWxzYC5cbiAqXG4gKiBAcGFyYW0gbzEgT2JqZWN0IG9yIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0gbzIgT2JqZWN0IG9yIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB0cnVlIGlmIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMobzE6IGFueSwgbzI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAobzEgPT09IG8yKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKG8xID09PSBudWxsIHx8IG8yID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGlmIChvMSAhPT0gbzEgJiYgbzIgIT09IG8yKSByZXR1cm4gdHJ1ZTsgLy8gTmFOID09PSBOYU5cbiAgbGV0IHQxID0gdHlwZW9mIG8xLCB0MiA9IHR5cGVvZiBvMiwgbGVuZ3RoOiBudW1iZXIsIGtleTogYW55LCBrZXlTZXQ6IGFueTtcbiAgaWYgKHQxID09IHQyICYmIHQxID09ICdvYmplY3QnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobzEpKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkobzIpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoKGxlbmd0aCA9IG8xLmxlbmd0aCkgPT0gbzIubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoa2V5ID0gMDsga2V5IDwgbGVuZ3RoOyBrZXkrKykge1xuICAgICAgICAgIGlmICghZXF1YWxzKG8xW2tleV0sIG8yW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG8yKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBrZXlTZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChrZXkgaW4gbzEpIHtcbiAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAga2V5U2V0W2tleV0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yIChrZXkgaW4gbzIpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIGtleVNldCkgJiYgdHlwZW9mIG8yW2tleV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLyogdHNsaW50OmVuYWJsZSAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShpdGVtKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXAodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KTogYW55IHtcbiAgbGV0IG91dHB1dCA9IE9iamVjdC5hc3NpZ24oe30sIHRhcmdldCk7XG4gIGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICBpZiAoaXNPYmplY3Qoc291cmNlW2tleV0pKSB7XG4gICAgICAgIGlmICghKGtleSBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIHtba2V5XTogc291cmNlW2tleV19KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXRwdXRba2V5XSA9IG1lcmdlRGVlcCh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwge1trZXldOiBzb3VyY2Vba2V5XX0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJhbnNsYXRlUGFyc2VyIHtcbiAgLyoqXG4gICAqIEludGVycG9sYXRlcyBhIHN0cmluZyB0byByZXBsYWNlIHBhcmFtZXRlcnNcbiAgICogXCJUaGlzIGlzIGEge3sga2V5IH19XCIgPT0+IFwiVGhpcyBpcyBhIHZhbHVlXCIsIHdpdGggcGFyYW1zID0geyBrZXk6IFwidmFsdWVcIiB9XG4gICAqIEBwYXJhbSBleHByXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICovXG4gIGFic3RyYWN0IGludGVycG9sYXRlKGV4cHI6IHN0cmluZyB8IEZ1bmN0aW9uLCBwYXJhbXM/OiBhbnkpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdCBieSBjb21wb3NlZCBrZXlcbiAgICogcGFyc2VyLmdldFZhbHVlKHsga2V5MTogeyBrZXlBOiAndmFsdWVJJyB9fSwgJ2tleTEua2V5QScpID09PiAndmFsdWVJJ1xuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBrZXlcbiAgICovXG4gIGFic3RyYWN0IGdldFZhbHVlKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyk6IGFueVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlRGVmYXVsdFBhcnNlciBleHRlbmRzIFRyYW5zbGF0ZVBhcnNlciB7XG4gIHRlbXBsYXRlTWF0Y2hlcjogUmVnRXhwID0gL3t7XFxzPyhbXnt9XFxzXSopXFxzP319L2c7XG5cbiAgcHVibGljIGludGVycG9sYXRlKGV4cHI6IHN0cmluZyB8IEZ1bmN0aW9uLCBwYXJhbXM/OiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQ6IHN0cmluZztcblxuICAgIGlmICh0eXBlb2YgZXhwciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuaW50ZXJwb2xhdGVTdHJpbmcoZXhwciwgcGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHByID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmludGVycG9sYXRlRnVuY3Rpb24oZXhwciwgcGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcyBzaG91bGQgbm90IGhhcHBlbiwgYnV0IGFuIHVucmVsYXRlZCBUcmFuc2xhdGVTZXJ2aWNlIHRlc3QgZGVwZW5kcyBvbiBpdFxuICAgICAgcmVzdWx0ID0gZXhwciBhcyBzdHJpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldFZhbHVlKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IGtleXMgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICBrZXkgPSAnJztcbiAgICBkbyB7XG4gICAgICBrZXkgKz0ga2V5cy5zaGlmdCgpO1xuICAgICAgaWYgKGlzRGVmaW5lZCh0YXJnZXQpICYmIGlzRGVmaW5lZCh0YXJnZXRba2V5XSkgJiYgKHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gJ29iamVjdCcgfHwgIWtleXMubGVuZ3RoKSkge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXRba2V5XTtcbiAgICAgICAga2V5ID0gJyc7XG4gICAgICB9IGVsc2UgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgKz0gJy4nO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKGtleXMubGVuZ3RoKTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwcml2YXRlIGludGVycG9sYXRlRnVuY3Rpb24oZm46IEZ1bmN0aW9uLCBwYXJhbXM/OiBhbnkpIHtcbiAgICByZXR1cm4gZm4ocGFyYW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgaW50ZXJwb2xhdGVTdHJpbmcoZXhwcjogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cHIucmVwbGFjZSh0aGlzLnRlbXBsYXRlTWF0Y2hlciwgKHN1YnN0cmluZzogc3RyaW5nLCBiOiBzdHJpbmcpID0+IHtcbiAgICAgIGxldCByID0gdGhpcy5nZXRWYWx1ZShwYXJhbXMsIGIpO1xuICAgICAgcmV0dXJuIGlzRGVmaW5lZChyKSA/IHIgOiBzdWJzdHJpbmc7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50LCBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnR9IGZyb20gXCIuL3RyYW5zbGF0ZS5zZXJ2aWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVTdG9yZSB7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBsYW5nIHRvIGZhbGxiYWNrIHdoZW4gdHJhbnNsYXRpb25zIGFyZSBtaXNzaW5nIG9uIHRoZSBjdXJyZW50IGxhbmdcbiAgICovXG4gIHB1YmxpYyBkZWZhdWx0TGFuZzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFuZyBjdXJyZW50bHkgdXNlZFxuICAgKi9cbiAgcHVibGljIGN1cnJlbnRMYW5nOiBzdHJpbmcgPSB0aGlzLmRlZmF1bHRMYW5nO1xuXG4gIC8qKlxuICAgKiBhIGxpc3Qgb2YgdHJhbnNsYXRpb25zIHBlciBsYW5nXG4gICAqL1xuICBwdWJsaWMgdHJhbnNsYXRpb25zOiBhbnkgPSB7fTtcblxuICAvKipcbiAgICogYW4gYXJyYXkgb2YgbGFuZ3NcbiAgICovXG4gIHB1YmxpYyBsYW5nczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIHRyYW5zbGF0aW9uIGNoYW5nZSBldmVudHNcbiAgICogb25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKHBhcmFtczogVHJhbnNsYXRpb25DaGFuZ2VFdmVudCkgPT4ge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgKiB9KTtcbiAgICovXG4gIHB1YmxpYyBvblRyYW5zbGF0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gbGFuZyBjaGFuZ2UgZXZlbnRzXG4gICAqIG9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKHBhcmFtczogTGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgKi9cbiAgcHVibGljIG9uTGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byBkZWZhdWx0IGxhbmcgY2hhbmdlIGV2ZW50c1xuICAgKiBvbkRlZmF1bHRMYW5nQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgKi9cbiAgcHVibGljIG9uRGVmYXVsdExhbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RGVmYXVsdExhbmdDaGFuZ2VFdmVudD4oKTtcbn1cbiIsImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtjb25jYXQsIG1lcmdlLCBPYnNlcnZhYmxlLCBPYnNlcnZlciwgb2Z9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge21hcCwgc2hhcmUsIHN3aXRjaE1hcCwgdGFrZSwgdG9BcnJheX0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge01pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJQYXJhbXN9IGZyb20gXCIuL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVDb21waWxlcn0gZnJvbSBcIi4vdHJhbnNsYXRlLmNvbXBpbGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZUxvYWRlcn0gZnJvbSBcIi4vdHJhbnNsYXRlLmxvYWRlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVQYXJzZXJ9IGZyb20gXCIuL3RyYW5zbGF0ZS5wYXJzZXJcIjtcblxuaW1wb3J0IHtUcmFuc2xhdGVTdG9yZX0gZnJvbSBcIi4vdHJhbnNsYXRlLnN0b3JlXCI7XG5pbXBvcnQge2lzRGVmaW5lZCwgbWVyZ2VEZWVwfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjb25zdCBVU0VfU1RPUkUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignVVNFX1NUT1JFJyk7XG5leHBvcnQgY29uc3QgVVNFX0RFRkFVTFRfTEFORyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdVU0VfREVGQVVMVF9MQU5HJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRpb25DaGFuZ2VFdmVudCB7XG4gIHRyYW5zbGF0aW9uczogYW55O1xuICBsYW5nOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGFuZ0NoYW5nZUV2ZW50IHtcbiAgbGFuZzogc3RyaW5nO1xuICB0cmFuc2xhdGlvbnM6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50IHtcbiAgbGFuZzogc3RyaW5nO1xuICB0cmFuc2xhdGlvbnM6IGFueTtcbn1cblxuZGVjbGFyZSBpbnRlcmZhY2UgV2luZG93IHtcbiAgbmF2aWdhdG9yOiBhbnk7XG59XG5cbmRlY2xhcmUgY29uc3Qgd2luZG93OiBXaW5kb3c7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVTZXJ2aWNlIHtcbiAgcHVibGljIF9pc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGxvYWRpbmdUcmFuc2xhdGlvbnM6IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSBwZW5kaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX29uVHJhbnNsYXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD4oKTtcbiAgcHJpdmF0ZSBfb25MYW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PigpO1xuICBwcml2YXRlIF9vbkRlZmF1bHRMYW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGVmYXVsdExhbmdDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+KCk7XG4gIHByaXZhdGUgX2RlZmF1bHRMYW5nOiBzdHJpbmc7XG4gIHByaXZhdGUgX2N1cnJlbnRMYW5nOiBzdHJpbmc7XG4gIHByaXZhdGUgX2xhbmdzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIHByaXZhdGUgX3RyYW5zbGF0aW9uczogYW55ID0ge307XG4gIHByaXZhdGUgX3RyYW5zbGF0aW9uUmVxdWVzdHM6IGFueSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIHRyYW5zbGF0aW9uIGNoYW5nZSBldmVudHNcbiAgICogb25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKHBhcmFtczogVHJhbnNsYXRpb25DaGFuZ2VFdmVudCkgPT4ge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgKiB9KTtcbiAgICovXG4gIGdldCBvblRyYW5zbGF0aW9uQ2hhbmdlKCk6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX29uVHJhbnNsYXRpb25DaGFuZ2UgOiB0aGlzLnN0b3JlLm9uVHJhbnNsYXRpb25DaGFuZ2U7XG4gIH1cblxuICAvKipcbiAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byBsYW5nIGNoYW5nZSBldmVudHNcbiAgICogb25MYW5nQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAqL1xuICBnZXQgb25MYW5nQ2hhbmdlKCk6IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fb25MYW5nQ2hhbmdlIDogdGhpcy5zdG9yZS5vbkxhbmdDaGFuZ2U7XG4gIH1cblxuICAvKipcbiAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byBkZWZhdWx0IGxhbmcgY2hhbmdlIGV2ZW50c1xuICAgKiBvbkRlZmF1bHRMYW5nQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgKi9cbiAgZ2V0IG9uRGVmYXVsdExhbmdDaGFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX29uRGVmYXVsdExhbmdDaGFuZ2UgOiB0aGlzLnN0b3JlLm9uRGVmYXVsdExhbmdDaGFuZ2U7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgbGFuZyB0byBmYWxsYmFjayB3aGVuIHRyYW5zbGF0aW9ucyBhcmUgbWlzc2luZyBvbiB0aGUgY3VycmVudCBsYW5nXG4gICAqL1xuICBnZXQgZGVmYXVsdExhbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fZGVmYXVsdExhbmcgOiB0aGlzLnN0b3JlLmRlZmF1bHRMYW5nO1xuICB9XG5cbiAgc2V0IGRlZmF1bHRMYW5nKGRlZmF1bHRMYW5nOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5pc29sYXRlKSB7XG4gICAgICB0aGlzLl9kZWZhdWx0TGFuZyA9IGRlZmF1bHRMYW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLmRlZmF1bHRMYW5nID0gZGVmYXVsdExhbmc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBsYW5nIGN1cnJlbnRseSB1c2VkXG4gICAqL1xuICBnZXQgY3VycmVudExhbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fY3VycmVudExhbmcgOiB0aGlzLnN0b3JlLmN1cnJlbnRMYW5nO1xuICB9XG5cbiAgc2V0IGN1cnJlbnRMYW5nKGN1cnJlbnRMYW5nOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5pc29sYXRlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50TGFuZyA9IGN1cnJlbnRMYW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLmN1cnJlbnRMYW5nID0gY3VycmVudExhbmc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFuIGFycmF5IG9mIGxhbmdzXG4gICAqL1xuICBnZXQgbGFuZ3MoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9sYW5ncyA6IHRoaXMuc3RvcmUubGFuZ3M7XG4gIH1cblxuICBzZXQgbGFuZ3MobGFuZ3M6IHN0cmluZ1tdKSB7XG4gICAgaWYgKHRoaXMuaXNvbGF0ZSkge1xuICAgICAgdGhpcy5fbGFuZ3MgPSBsYW5ncztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9yZS5sYW5ncyA9IGxhbmdzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhIGxpc3Qgb2YgdHJhbnNsYXRpb25zIHBlciBsYW5nXG4gICAqL1xuICBnZXQgdHJhbnNsYXRpb25zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX3RyYW5zbGF0aW9ucyA6IHRoaXMuc3RvcmUudHJhbnNsYXRpb25zO1xuICB9XG5cbiAgc2V0IHRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnM6IGFueSkge1xuICAgIGlmICh0aGlzLmlzb2xhdGUpIHtcbiAgICAgIHRoaXMuX3RyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9yZS50cmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBzdG9yZSBhbiBpbnN0YW5jZSBvZiB0aGUgc3RvcmUgKHRoYXQgaXMgc3VwcG9zZWQgdG8gYmUgdW5pcXVlKVxuICAgKiBAcGFyYW0gY3VycmVudExvYWRlciBBbiBpbnN0YW5jZSBvZiB0aGUgbG9hZGVyIGN1cnJlbnRseSB1c2VkXG4gICAqIEBwYXJhbSBjb21waWxlciBBbiBpbnN0YW5jZSBvZiB0aGUgY29tcGlsZXIgY3VycmVudGx5IHVzZWRcbiAgICogQHBhcmFtIHBhcnNlciBBbiBpbnN0YW5jZSBvZiB0aGUgcGFyc2VyIGN1cnJlbnRseSB1c2VkXG4gICAqIEBwYXJhbSBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIEEgaGFuZGxlciBmb3IgbWlzc2luZyB0cmFuc2xhdGlvbnMuXG4gICAqIEBwYXJhbSBpc29sYXRlIHdoZXRoZXIgdGhpcyBzZXJ2aWNlIHNob3VsZCB1c2UgdGhlIHN0b3JlIG9yIG5vdFxuICAgKiBAcGFyYW0gdXNlRGVmYXVsdExhbmcgd2hldGhlciB3ZSBzaG91bGQgdXNlIGRlZmF1bHQgbGFuZ3VhZ2UgdHJhbnNsYXRpb24gd2hlbiBjdXJyZW50IGxhbmd1YWdlIHRyYW5zbGF0aW9uIGlzIG1pc3NpbmcuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RvcmU6IFRyYW5zbGF0ZVN0b3JlLFxuICAgICAgICAgICAgICBwdWJsaWMgY3VycmVudExvYWRlcjogVHJhbnNsYXRlTG9hZGVyLFxuICAgICAgICAgICAgICBwdWJsaWMgY29tcGlsZXI6IFRyYW5zbGF0ZUNvbXBpbGVyLFxuICAgICAgICAgICAgICBwdWJsaWMgcGFyc2VyOiBUcmFuc2xhdGVQYXJzZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLFxuICAgICAgICAgICAgICBASW5qZWN0KFVTRV9ERUZBVUxUX0xBTkcpIHByaXZhdGUgdXNlRGVmYXVsdExhbmc6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICAgICAgICBASW5qZWN0KFVTRV9TVE9SRSkgcHJpdmF0ZSBpc29sYXRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkZWZhdWx0IGxhbmd1YWdlIHRvIHVzZSBhcyBhIGZhbGxiYWNrXG4gICAqL1xuICBwdWJsaWMgc2V0RGVmYXVsdExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGxhbmcgPT09IHRoaXMuZGVmYXVsdExhbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcGVuZGluZzogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5yZXRyaWV2ZVRyYW5zbGF0aW9ucyhsYW5nKTtcblxuICAgIGlmICh0eXBlb2YgcGVuZGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgLy8gb24gaW5pdCBzZXQgdGhlIGRlZmF1bHRMYW5nIGltbWVkaWF0ZWx5XG4gICAgICBpZiAoIXRoaXMuZGVmYXVsdExhbmcpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0TGFuZyA9IGxhbmc7XG4gICAgICB9XG5cbiAgICAgIHBlbmRpbmcucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGVmYXVsdExhbmcobGFuZyk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7IC8vIHdlIGFscmVhZHkgaGF2ZSB0aGlzIGxhbmd1YWdlXG4gICAgICB0aGlzLmNoYW5nZURlZmF1bHRMYW5nKGxhbmcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkZWZhdWx0IGxhbmd1YWdlIHVzZWRcbiAgICovXG4gIHB1YmxpYyBnZXREZWZhdWx0TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRMYW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGxhbmcgY3VycmVudGx5IHVzZWRcbiAgICovXG4gIHB1YmxpYyB1c2UobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyBkb24ndCBjaGFuZ2UgdGhlIGxhbmd1YWdlIGlmIHRoZSBsYW5ndWFnZSBnaXZlbiBpcyBhbHJlYWR5IHNlbGVjdGVkXG4gICAgaWYgKGxhbmcgPT09IHRoaXMuY3VycmVudExhbmcpIHtcbiAgICAgIHJldHVybiBvZih0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSk7XG4gICAgfVxuXG4gICAgbGV0IHBlbmRpbmc6IE9ic2VydmFibGU8YW55PiA9IHRoaXMucmV0cmlldmVUcmFuc2xhdGlvbnMobGFuZyk7XG5cbiAgICBpZiAodHlwZW9mIHBlbmRpbmcgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIC8vIG9uIGluaXQgc2V0IHRoZSBjdXJyZW50TGFuZyBpbW1lZGlhdGVseVxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgIHRoaXMuY3VycmVudExhbmcgPSBsYW5nO1xuICAgICAgfVxuXG4gICAgICBwZW5kaW5nLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmNoYW5nZUxhbmcobGFuZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcGVuZGluZztcbiAgICB9IGVsc2UgeyAvLyB3ZSBoYXZlIHRoaXMgbGFuZ3VhZ2UsIHJldHVybiBhbiBPYnNlcnZhYmxlXG4gICAgICB0aGlzLmNoYW5nZUxhbmcobGFuZyk7XG5cbiAgICAgIHJldHVybiBvZih0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgZ2l2ZW4gdHJhbnNsYXRpb25zXG4gICAqL1xuICBwcml2YXRlIHJldHJpZXZlVHJhbnNsYXRpb25zKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHBlbmRpbmc6IE9ic2VydmFibGU8YW55PjtcblxuICAgIC8vIGlmIHRoaXMgbGFuZ3VhZ2UgaXMgdW5hdmFpbGFibGUsIGFzayBmb3IgaXRcbiAgICBpZiAodHlwZW9mIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLl90cmFuc2xhdGlvblJlcXVlc3RzW2xhbmddID0gdGhpcy5fdHJhbnNsYXRpb25SZXF1ZXN0c1tsYW5nXSB8fCB0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmcpO1xuICAgICAgcGVuZGluZyA9IHRoaXMuX3RyYW5zbGF0aW9uUmVxdWVzdHNbbGFuZ107XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlbmRpbmc7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBvYmplY3Qgb2YgdHJhbnNsYXRpb25zIGZvciBhIGdpdmVuIGxhbmd1YWdlIHdpdGggdGhlIGN1cnJlbnQgbG9hZGVyXG4gICAqIGFuZCBwYXNzZXMgaXQgdGhyb3VnaCB0aGUgY29tcGlsZXJcbiAgICovXG4gIHB1YmxpYyBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMucGVuZGluZyA9IHRydWU7XG4gICAgY29uc3QgbG9hZGluZ1RyYW5zbGF0aW9ucyA9IHRoaXMuY3VycmVudExvYWRlci5nZXRUcmFuc2xhdGlvbihsYW5nKS5waXBlKHNoYXJlKCkpO1xuICAgIHRoaXMubG9hZGluZ1RyYW5zbGF0aW9ucyA9IGxvYWRpbmdUcmFuc2xhdGlvbnMucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBtYXAoKHJlczogT2JqZWN0KSA9PiB0aGlzLmNvbXBpbGVyLmNvbXBpbGVUcmFuc2xhdGlvbnMocmVzLCBsYW5nKSksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMubG9hZGluZ1RyYW5zbGF0aW9uc1xuICAgICAgLnN1YnNjcmliZSgocmVzOiBPYmplY3QpID0+IHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPSByZXM7XG4gICAgICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICB9LCAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBsb2FkaW5nVHJhbnNsYXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IHNldHMgYW4gb2JqZWN0IG9mIHRyYW5zbGF0aW9ucyBmb3IgYSBnaXZlbiBsYW5ndWFnZVxuICAgKiBhZnRlciBwYXNzaW5nIGl0IHRocm91Z2ggdGhlIGNvbXBpbGVyXG4gICAqL1xuICBwdWJsaWMgc2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nLCB0cmFuc2xhdGlvbnM6IE9iamVjdCwgc2hvdWxkTWVyZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRyYW5zbGF0aW9ucyA9IHRoaXMuY29tcGlsZXIuY29tcGlsZVRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnMsIGxhbmcpO1xuICAgIGlmIChzaG91bGRNZXJnZSAmJiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSkge1xuICAgICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPSBtZXJnZURlZXAodGhpcy50cmFuc2xhdGlvbnNbbGFuZ10sIHRyYW5zbGF0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID0gdHJhbnNsYXRpb25zO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUxhbmdzKCk7XG4gICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlLmVtaXQoe2xhbmc6IGxhbmcsIHRyYW5zbGF0aW9uczogdGhpcy50cmFuc2xhdGlvbnNbbGFuZ119KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGN1cnJlbnRseSBhdmFpbGFibGUgbGFuZ3NcbiAgICovXG4gIHB1YmxpYyBnZXRMYW5ncygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5sYW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYXZhaWxhYmxlIGxhbmdzXG4gICAqL1xuICBwdWJsaWMgYWRkTGFuZ3MobGFuZ3M6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcbiAgICBsYW5ncy5mb3JFYWNoKChsYW5nOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh0aGlzLmxhbmdzLmluZGV4T2YobGFuZykgPT09IC0xKSB7XG4gICAgICAgIHRoaXMubGFuZ3MucHVzaChsYW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgb2YgYXZhaWxhYmxlIGxhbmdzXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUxhbmdzKCk6IHZvaWQge1xuICAgIHRoaXMuYWRkTGFuZ3MoT2JqZWN0LmtleXModGhpcy50cmFuc2xhdGlvbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXJzZWQgcmVzdWx0IG9mIHRoZSB0cmFuc2xhdGlvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zOiBhbnksIGtleTogYW55LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IGFueSB7XG4gICAgbGV0IHJlczogc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fSxcbiAgICAgICAgb2JzZXJ2YWJsZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGsgb2Yga2V5KSB7XG4gICAgICAgIHJlc3VsdFtrXSA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KHRyYW5zbGF0aW9ucywgaywgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdFtrXS5zdWJzY3JpYmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG9ic2VydmFibGVzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9ic2VydmFibGVzKSB7XG4gICAgICAgIGxldCBtZXJnZWRPYnM6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgICAgICAgZm9yIChsZXQgayBvZiBrZXkpIHtcbiAgICAgICAgICBsZXQgb2JzID0gdHlwZW9mIHJlc3VsdFtrXS5zdWJzY3JpYmUgPT09IFwiZnVuY3Rpb25cIiA/IHJlc3VsdFtrXSA6IG9mKHJlc3VsdFtrXSBhcyBzdHJpbmcpO1xuICAgICAgICAgIGlmICh0eXBlb2YgbWVyZ2VkT2JzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBtZXJnZWRPYnMgPSBvYnM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lcmdlZE9icyA9IG1lcmdlKG1lcmdlZE9icywgb2JzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lcmdlZE9icy5waXBlKFxuICAgICAgICAgIHRvQXJyYXkoKSxcbiAgICAgICAgICBtYXAoKGFycjogQXJyYXk8c3RyaW5nPikgPT4ge1xuICAgICAgICAgICAgbGV0IG9iajogYW55ID0ge307XG4gICAgICAgICAgICBhcnIuZm9yRWFjaCgodmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICBvYmpba2V5W2luZGV4XV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNsYXRpb25zKSB7XG4gICAgICByZXMgPSB0aGlzLnBhcnNlci5pbnRlcnBvbGF0ZSh0aGlzLnBhcnNlci5nZXRWYWx1ZSh0cmFuc2xhdGlvbnMsIGtleSksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlcyA9PT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLmRlZmF1bHRMYW5nICYmIHRoaXMuZGVmYXVsdExhbmcgIT09IHRoaXMuY3VycmVudExhbmcgJiYgdGhpcy51c2VEZWZhdWx0TGFuZykge1xuICAgICAgcmVzID0gdGhpcy5wYXJzZXIuaW50ZXJwb2xhdGUodGhpcy5wYXJzZXIuZ2V0VmFsdWUodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5kZWZhdWx0TGFuZ10sIGtleSksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlcyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbGV0IHBhcmFtczogTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclBhcmFtcyA9IHtrZXksIHRyYW5zbGF0ZVNlcnZpY2U6IHRoaXN9O1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcnBvbGF0ZVBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLmludGVycG9sYXRlUGFyYW1zID0gaW50ZXJwb2xhdGVQYXJhbXM7XG4gICAgICB9XG4gICAgICByZXMgPSB0aGlzLm1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIuaGFuZGxlKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGVvZiByZXMgIT09IFwidW5kZWZpbmVkXCIgPyByZXMgOiBrZXk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdHJhbnNsYXRlZCB2YWx1ZSBvZiBhIGtleSAob3IgYW4gYXJyYXkgb2Yga2V5cylcbiAgICogQHJldHVybnMgdGhlIHRyYW5zbGF0ZWQga2V5LCBvciBhbiBvYmplY3Qgb2YgdHJhbnNsYXRlZCBrZXlzXG4gICAqL1xuICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4ge1xuICAgIGlmICghaXNEZWZpbmVkKGtleSkgfHwgIWtleS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwia2V5XCIgcmVxdWlyZWRgKTtcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgd2UgYXJlIGxvYWRpbmcgYSBuZXcgdHJhbnNsYXRpb24gdG8gdXNlXG4gICAgaWYgKHRoaXMucGVuZGluZykge1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgICBsZXQgb25Db21wbGV0ZSA9IChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgb25FcnJvciA9IChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubG9hZGluZ1RyYW5zbGF0aW9ucy5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQocmVzLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmVzLnN1YnNjcmliZShvbkNvbXBsZXRlLCBvbkVycm9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25Db21wbGV0ZShyZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgb25FcnJvcik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KHRoaXMudHJhbnNsYXRpb25zW3RoaXMuY3VycmVudExhbmddLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICAgIGlmICh0eXBlb2YgcmVzLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2YocmVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmVhbSBvZiB0cmFuc2xhdGVkIHZhbHVlcyBvZiBhIGtleSAob3IgYW4gYXJyYXkgb2Yga2V5cykgd2hpY2ggdXBkYXRlc1xuICAgKiB3aGVuZXZlciB0aGUgbGFuZ3VhZ2UgY2hhbmdlcy5cbiAgICogQHJldHVybnMgQSBzdHJlYW0gb2YgdGhlIHRyYW5zbGF0ZWQga2V5LCBvciBhbiBvYmplY3Qgb2YgdHJhbnNsYXRlZCBrZXlzXG4gICAqL1xuICBwdWJsaWMgc3RyZWFtKGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4ge1xuICAgIGlmICghaXNEZWZpbmVkKGtleSkgfHwgIWtleS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwia2V5XCIgcmVxdWlyZWRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uY2F0KFxuICAgICAgdGhpcy5nZXQoa2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyksXG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCByZXMgPSB0aGlzLmdldFBhcnNlZFJlc3VsdChldmVudC50cmFuc2xhdGlvbnMsIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJhbnNsYXRpb24gaW5zdGFudGx5IGZyb20gdGhlIGludGVybmFsIHN0YXRlIG9mIGxvYWRlZCB0cmFuc2xhdGlvbi5cbiAgICogQWxsIHJ1bGVzIHJlZ2FyZGluZyB0aGUgY3VycmVudCBsYW5ndWFnZSwgdGhlIHByZWZlcnJlZCBsYW5ndWFnZSBvZiBldmVuIGZhbGxiYWNrIGxhbmd1YWdlcyB3aWxsIGJlIHVzZWQgZXhjZXB0IGFueSBwcm9taXNlIGhhbmRsaW5nLlxuICAgKi9cbiAgcHVibGljIGluc3RhbnQoa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IHN0cmluZyB8IGFueSB7XG4gICAgaWYgKCFpc0RlZmluZWQoa2V5KSB8fCAha2V5Lmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJrZXlcIiByZXF1aXJlZGApO1xuICAgIH1cblxuICAgIGxldCByZXMgPSB0aGlzLmdldFBhcnNlZFJlc3VsdCh0aGlzLnRyYW5zbGF0aW9uc1t0aGlzLmN1cnJlbnRMYW5nXSwga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgaWYgKHR5cGVvZiByZXMuc3Vic2NyaWJlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgbGV0IG9iajogYW55ID0ge307XG4gICAgICAgIGtleS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgb2JqW2tleVtpbmRleF1dID0ga2V5W2luZGV4XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5LCBhZnRlciBjb21waWxpbmcgaXRcbiAgICovXG4gIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGxhbmc6IHN0cmluZyA9IHRoaXMuY3VycmVudExhbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXVtrZXldID0gdGhpcy5jb21waWxlci5jb21waWxlKHZhbHVlLCBsYW5nKTtcbiAgICB0aGlzLnVwZGF0ZUxhbmdzKCk7XG4gICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlLmVtaXQoe2xhbmc6IGxhbmcsIHRyYW5zbGF0aW9uczogdGhpcy50cmFuc2xhdGlvbnNbbGFuZ119KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IGxhbmdcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlTGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRMYW5nID0gbGFuZztcbiAgICB0aGlzLm9uTGFuZ0NoYW5nZS5lbWl0KHtsYW5nOiBsYW5nLCB0cmFuc2xhdGlvbnM6IHRoaXMudHJhbnNsYXRpb25zW2xhbmddfSk7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBkZWZhdWx0IGxhbmcsIHVzZSB0aGUgb25lIHRoYXQgd2UganVzdCBzZXRcbiAgICBpZiAoIXRoaXMuZGVmYXVsdExhbmcpIHtcbiAgICAgIHRoaXMuY2hhbmdlRGVmYXVsdExhbmcobGFuZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGRlZmF1bHQgbGFuZ1xuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VEZWZhdWx0TGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRMYW5nID0gbGFuZztcbiAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UuZW1pdCh7bGFuZzogbGFuZywgdHJhbnNsYXRpb25zOiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyB0byByZWxvYWQgdGhlIGxhbmcgZmlsZSBmcm9tIHRoZSBmaWxlXG4gICAqL1xuICBwdWJsaWMgcmVsb2FkTGFuZyhsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMucmVzZXRMYW5nKGxhbmcpO1xuICAgIHJldHVybiB0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgaW5uZXIgdHJhbnNsYXRpb25cbiAgICovXG4gIHB1YmxpYyByZXNldExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fdHJhbnNsYXRpb25SZXF1ZXN0c1tsYW5nXSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsYW5ndWFnZSBjb2RlIG5hbWUgZnJvbSB0aGUgYnJvd3NlciwgZS5nLiBcImRlXCJcbiAgICovXG4gIHB1YmxpYyBnZXRCcm93c2VyTGFuZygpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93Lm5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbGV0IGJyb3dzZXJMYW5nOiBhbnkgPSB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlcyA/IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdIDogbnVsbDtcbiAgICBicm93c2VyTGFuZyA9IGJyb3dzZXJMYW5nIHx8IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyTGFuZ3VhZ2U7XG5cbiAgICBpZiAoYnJvd3NlckxhbmcuaW5kZXhPZignLScpICE9PSAtMSkge1xuICAgICAgYnJvd3NlckxhbmcgPSBicm93c2VyTGFuZy5zcGxpdCgnLScpWzBdO1xuICAgIH1cblxuICAgIGlmIChicm93c2VyTGFuZy5pbmRleE9mKCdfJykgIT09IC0xKSB7XG4gICAgICBicm93c2VyTGFuZyA9IGJyb3dzZXJMYW5nLnNwbGl0KCdfJylbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJyb3dzZXJMYW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1bHR1cmUgbGFuZ3VhZ2UgY29kZSBuYW1lIGZyb20gdGhlIGJyb3dzZXIsIGUuZy4gXCJkZS1ERVwiXG4gICAqL1xuICBwdWJsaWMgZ2V0QnJvd3NlckN1bHR1cmVMYW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgYnJvd3NlckN1bHR1cmVMYW5nOiBhbnkgPSB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlcyA/IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdIDogbnVsbDtcbiAgICBicm93c2VyQ3VsdHVyZUxhbmcgPSBicm93c2VyQ3VsdHVyZUxhbmcgfHwgd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLmJyb3dzZXJMYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLnVzZXJMYW5ndWFnZTtcblxuICAgIHJldHVybiBicm93c2VyQ3VsdHVyZUxhbmc7XG4gIH1cblxuICBwdWJsaWMgdHJpZ2dlckNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgfSwxMDAwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVmYXVsdExhbmdDaGFuZ2VFdmVudCwgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlLCBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50fSBmcm9tICcuL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7ZXF1YWxzLCBpc0RlZmluZWR9IGZyb20gJy4vdXRpbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0cmFuc2xhdGVdLFtuZ3gtdHJhbnNsYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAga2V5OiBzdHJpbmc7XG4gIGxhc3RQYXJhbXM6IGFueTtcbiAgY3VycmVudFBhcmFtczogYW55O1xuICBvbkxhbmdDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbjtcbiAgb25EZWZhdWx0TGFuZ0NoYW5nZVN1YjogU3Vic2NyaXB0aW9uO1xuICBvblRyYW5zbGF0aW9uQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgc2V0IHRyYW5zbGF0ZShrZXk6IHN0cmluZykge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgdGhpcy5jaGVja05vZGVzKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgc2V0IHRyYW5zbGF0ZVBhcmFtcyhwYXJhbXM6IGFueSkge1xuICAgIGlmICghZXF1YWxzKHRoaXMuY3VycmVudFBhcmFtcywgcGFyYW1zKSkge1xuICAgICAgdGhpcy5jdXJyZW50UGFyYW1zID0gcGFyYW1zO1xuICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBvZiB0aGUgY3VycmVudCBsYW5nIGNoYW5nZVxuICAgIGlmICghdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2VTdWIgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uub25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5sYW5nID09PSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmcpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrTm9kZXModHJ1ZSwgZXZlbnQudHJhbnNsYXRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uTGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgbGFuZ3VhZ2UgY2hhbmdlc1xuICAgIGlmICghdGhpcy5vbkxhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlU3ViID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUsIGV2ZW50LnRyYW5zbGF0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25EZWZhdWx0TGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgZGVmYXVsdCBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZVN1YiA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5vbkRlZmF1bHRMYW5nQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLmNoZWNrTm9kZXMoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja05vZGVzKGZvcmNlVXBkYXRlID0gZmFsc2UsIHRyYW5zbGF0aW9ucz86IGFueSkge1xuICAgIGxldCBub2RlczogTm9kZUxpc3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIC8vIGlmIHRoZSBlbGVtZW50IGlzIGVtcHR5XG4gICAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICAgIC8vIHdlIGFkZCB0aGUga2V5IGFzIGNvbnRlbnRcbiAgICAgIHRoaXMuc2V0Q29udGVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5rZXkpO1xuICAgICAgbm9kZXMgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgbm9kZTogYW55ID0gbm9kZXNbaV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykgeyAvLyBub2RlIHR5cGUgMyBpcyBhIHRleHQgbm9kZVxuICAgICAgICBsZXQga2V5OiBzdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgICAgIGtleSA9IHRoaXMua2V5O1xuICAgICAgICAgIGlmIChmb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgbm9kZS5sYXN0S2V5ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQobm9kZSk7XG4gICAgICAgICAgbGV0IHRyaW1tZWRDb250ZW50ID0gY29udGVudC50cmltKCk7XG4gICAgICAgICAgaWYgKHRyaW1tZWRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gd2Ugd2FudCB0byB1c2UgdGhlIGNvbnRlbnQgYXMgYSBrZXksIG5vdCB0aGUgdHJhbnNsYXRpb24gdmFsdWVcbiAgICAgICAgICAgIGlmIChjb250ZW50ICE9PSBub2RlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICBrZXkgPSB0cmltbWVkQ29udGVudDtcbiAgICAgICAgICAgICAgLy8gdGhlIGNvbnRlbnQgd2FzIGNoYW5nZWQgZnJvbSB0aGUgdXNlciwgd2UnbGwgdXNlIGl0IGFzIGEgcmVmZXJlbmNlIGlmIG5lZWRlZFxuICAgICAgICAgICAgICBub2RlLm9yaWdpbmFsQ29udGVudCA9IHRoaXMuZ2V0Q29udGVudChub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5vcmlnaW5hbENvbnRlbnQgJiYgZm9yY2VVcGRhdGUpIHsgLy8gdGhlIGNvbnRlbnQgc2VlbXMgb2ssIGJ1dCB0aGUgbGFuZyBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgICBub2RlLmxhc3RLZXkgPSBudWxsO1xuICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBjb250ZW50IGlzIHRoZSB0cmFuc2xhdGlvbiwgbm90IHRoZSBrZXksIHVzZSB0aGUgbGFzdCByZWFsIGNvbnRlbnQgYXMga2V5XG4gICAgICAgICAgICAgIGtleSA9IG5vZGUub3JpZ2luYWxDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShrZXksIG5vZGUsIHRyYW5zbGF0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoa2V5OiBzdHJpbmcsIG5vZGU6IGFueSwgdHJhbnNsYXRpb25zOiBhbnkpIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAobm9kZS5sYXN0S2V5ID09PSBrZXkgJiYgdGhpcy5sYXN0UGFyYW1zID09PSB0aGlzLmN1cnJlbnRQYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RQYXJhbXMgPSB0aGlzLmN1cnJlbnRQYXJhbXM7XG5cbiAgICAgIGxldCBvblRyYW5zbGF0aW9uID0gKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChyZXMgIT09IGtleSkge1xuICAgICAgICAgIG5vZGUubGFzdEtleSA9IGtleTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5vZGUub3JpZ2luYWxDb250ZW50KSB7XG4gICAgICAgICAgbm9kZS5vcmlnaW5hbENvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5jdXJyZW50VmFsdWUgPSBpc0RlZmluZWQocmVzKSA/IHJlcyA6IChub2RlLm9yaWdpbmFsQ29udGVudCB8fCBrZXkpO1xuICAgICAgICAvLyB3ZSByZXBsYWNlIGluIHRoZSBvcmlnaW5hbCBjb250ZW50IHRvIHByZXNlcnZlIHNwYWNlcyB0aGF0IHdlIG1pZ2h0IGhhdmUgdHJpbW1lZFxuICAgICAgICB0aGlzLnNldENvbnRlbnQobm9kZSwgdGhpcy5rZXkgPyBub2RlLmN1cnJlbnRWYWx1ZSA6IG5vZGUub3JpZ2luYWxDb250ZW50LnJlcGxhY2Uoa2V5LCBub2RlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoaXNEZWZpbmVkKHRyYW5zbGF0aW9ucykpIHtcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrZXksIHRoaXMuY3VycmVudFBhcmFtcyk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmVzLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvblRyYW5zbGF0aW9uKHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoa2V5LCB0aGlzLmN1cnJlbnRQYXJhbXMpLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRDb250ZW50KG5vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzRGVmaW5lZChub2RlLnRleHRDb250ZW50KSA/IG5vZGUudGV4dENvbnRlbnQgOiBub2RlLmRhdGE7XG4gIH1cblxuICBzZXRDb250ZW50KG5vZGU6IGFueSwgY29udGVudDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzRGVmaW5lZChub2RlLnRleHRDb250ZW50KSkge1xuICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUuZGF0YSA9IGNvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMub25MYW5nQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFBpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50LCBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UsIFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnR9IGZyb20gJy4vdHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHtlcXVhbHMsIGlzRGVmaW5lZH0gZnJvbSAnLi91dGlsJztcblxuQEluamVjdGFibGUoKVxuQFBpcGUoe1xuICBuYW1lOiAndHJhbnNsYXRlJyxcbiAgcHVyZTogZmFsc2UgLy8gcmVxdWlyZWQgdG8gdXBkYXRlIHRoZSB2YWx1ZSB3aGVuIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIGxhc3RLZXk6IHN0cmluZztcbiAgbGFzdFBhcmFtczogYW55W107XG4gIG9uVHJhbnNsYXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PjtcbiAgb25MYW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PjtcbiAgb25EZWZhdWx0TGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICB1cGRhdGVWYWx1ZShrZXk6IHN0cmluZywgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QsIHRyYW5zbGF0aW9ucz86IGFueSk6IHZvaWQge1xuICAgIGxldCBvblRyYW5zbGF0aW9uID0gKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnZhbHVlID0gcmVzICE9PSB1bmRlZmluZWQgPyByZXMgOiBrZXk7XG4gICAgICB0aGlzLmxhc3RLZXkgPSBrZXk7XG4gICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfTtcbiAgICBpZiAodHJhbnNsYXRpb25zKSB7XG4gICAgICBsZXQgcmVzID0gdGhpcy50cmFuc2xhdGUuZ2V0UGFyc2VkUmVzdWx0KHRyYW5zbGF0aW9ucywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVHJhbnNsYXRpb24ocmVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmFuc2xhdGUuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgfVxuXG4gIHRyYW5zZm9ybShxdWVyeTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKCFxdWVyeSB8fCBxdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSBhc2sgYW5vdGhlciB0aW1lIGZvciB0aGUgc2FtZSBrZXksIHJldHVybiB0aGUgbGFzdCB2YWx1ZVxuICAgIGlmIChlcXVhbHMocXVlcnksIHRoaXMubGFzdEtleSkgJiYgZXF1YWxzKGFyZ3MsIHRoaXMubGFzdFBhcmFtcykpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGxldCBpbnRlcnBvbGF0ZVBhcmFtczogT2JqZWN0O1xuICAgIGlmIChpc0RlZmluZWQoYXJnc1swXSkgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgJiYgYXJnc1swXS5sZW5ndGgpIHtcbiAgICAgICAgLy8gd2UgYWNjZXB0IG9iamVjdHMgd3JpdHRlbiBpbiB0aGUgdGVtcGxhdGUgc3VjaCBhcyB7bjoxfSwgeyduJzoxfSwge246J3YnfVxuICAgICAgICAvLyB3aGljaCBpcyB3aHkgd2UgbWlnaHQgbmVlZCB0byBjaGFuZ2UgaXQgdG8gcmVhbCBKU09OIG9iamVjdHMgc3VjaCBhcyB7XCJuXCI6MX0gb3Ige1wiblwiOlwidlwifVxuICAgICAgICBsZXQgdmFsaWRBcmdzOiBzdHJpbmcgPSBhcmdzWzBdXG4gICAgICAgICAgLnJlcGxhY2UoLyhcXCcpPyhbYS16QS1aMC05X10rKShcXCcpPyhcXHMpPzovZywgJ1wiJDJcIjonKVxuICAgICAgICAgIC5yZXBsYWNlKC86KFxccyk/KFxcJykoLio/KShcXCcpL2csICc6XCIkM1wiJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBKU09OLnBhcnNlKHZhbGlkQXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFdyb25nIHBhcmFtZXRlciBpbiBUcmFuc2xhdGVQaXBlLiBFeHBlY3RlZCBhIHZhbGlkIE9iamVjdCwgcmVjZWl2ZWQ6ICR7YXJnc1swXX1gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBhcmdzWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN0b3JlIHRoZSBxdWVyeSwgaW4gY2FzZSBpdCBjaGFuZ2VzXG4gICAgdGhpcy5sYXN0S2V5ID0gcXVlcnk7XG5cbiAgICAvLyBzdG9yZSB0aGUgcGFyYW1zLCBpbiBjYXNlIHRoZXkgY2hhbmdlXG4gICAgdGhpcy5sYXN0UGFyYW1zID0gYXJncztcblxuICAgIC8vIHNldCB0aGUgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKHF1ZXJ5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIHN1YnNjcmlwdGlvbiB0byBvbkxhbmdDaGFuZ2UsIGNsZWFuIGl0XG4gICAgdGhpcy5fZGlzcG9zZSgpO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBjaGFuZ2VcbiAgICBpZiAoIXRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSkge1xuICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlID0gdGhpcy50cmFuc2xhdGUub25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RLZXkgJiYgZXZlbnQubGFuZyA9PT0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpIHtcbiAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsO1xuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25MYW5nQ2hhbmdlIGV2ZW50LCBpbiBjYXNlIHRoZSBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uTGFuZ0NoYW5nZSkge1xuICAgICAgdGhpcy5vbkxhbmdDaGFuZ2UgPSB0aGlzLnRyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RLZXkpIHtcbiAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsOyAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSB1bnRpbCBpdCdzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25EZWZhdWx0TGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgZGVmYXVsdCBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHRoaXMudHJhbnNsYXRlLm9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGFzdEtleSkge1xuICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7IC8vIHdlIHdhbnQgdG8gbWFrZSBzdXJlIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIHVudGlsIGl0J3MgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShxdWVyeSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiBhbnkgZXhpc3Rpbmcgc3Vic2NyaXB0aW9uIHRvIGNoYW5nZSBldmVudHNcbiAgICovXG4gIHByaXZhdGUgX2Rpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uTGFuZ0NoYW5nZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNwb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZUZha2VMb2FkZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUubG9hZGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuc2VydmljZVwiO1xuaW1wb3J0IHtNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCBGYWtlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcn0gZnJvbSBcIi4vbGliL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVQYXJzZXIsIFRyYW5zbGF0ZURlZmF1bHRQYXJzZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUucGFyc2VyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZUNvbXBpbGVyLCBUcmFuc2xhdGVGYWtlQ29tcGlsZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuY29tcGlsZXJcIjtcbmltcG9ydCB7VHJhbnNsYXRlRGlyZWN0aXZlfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVQaXBlfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnBpcGVcIjtcbmltcG9ydCB7VHJhbnNsYXRlU3RvcmV9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuc3RvcmVcIjtcbmltcG9ydCB7VVNFX1NUT1JFfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnNlcnZpY2VcIjtcbmltcG9ydCB7VVNFX0RFRkFVTFRfTEFOR30gZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5zZXJ2aWNlXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL2xpYi90cmFuc2xhdGUubG9hZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnNlcnZpY2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi9taXNzaW5nLXRyYW5zbGF0aW9uLWhhbmRsZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi90cmFuc2xhdGUucGFyc2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmNvbXBpbGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmRpcmVjdGl2ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5waXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnN0b3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRlTW9kdWxlQ29uZmlnIHtcbiAgbG9hZGVyPzogUHJvdmlkZXI7XG4gIGNvbXBpbGVyPzogUHJvdmlkZXI7XG4gIHBhcnNlcj86IFByb3ZpZGVyO1xuICBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyPzogUHJvdmlkZXI7XG4gIC8vIGlzb2xhdGUgdGhlIHNlcnZpY2UgaW5zdGFuY2UsIG9ubHkgd29ya3MgZm9yIGxhenkgbG9hZGVkIG1vZHVsZXMgb3IgY29tcG9uZW50cyB3aXRoIHRoZSBcInByb3ZpZGVyc1wiIHByb3BlcnR5XG4gIGlzb2xhdGU/OiBib29sZWFuO1xuICB1c2VEZWZhdWx0TGFuZz86IGJvb2xlYW47XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRyYW5zbGF0ZVBpcGUsXG4gICAgVHJhbnNsYXRlRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUcmFuc2xhdGVQaXBlLFxuICAgIFRyYW5zbGF0ZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZU1vZHVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgaW4geW91ciByb290IG1vZHVsZSB0byBwcm92aWRlIHRoZSBUcmFuc2xhdGVTZXJ2aWNlXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFRyYW5zbGF0ZU1vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUcmFuc2xhdGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgY29uZmlnLmxvYWRlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLCB1c2VDbGFzczogVHJhbnNsYXRlRmFrZUxvYWRlcn0sXG4gICAgICAgIGNvbmZpZy5jb21waWxlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlQ29tcGlsZXIsIHVzZUNsYXNzOiBUcmFuc2xhdGVGYWtlQ29tcGlsZXJ9LFxuICAgICAgICBjb25maWcucGFyc2VyIHx8IHtwcm92aWRlOiBUcmFuc2xhdGVQYXJzZXIsIHVzZUNsYXNzOiBUcmFuc2xhdGVEZWZhdWx0UGFyc2VyfSxcbiAgICAgICAgY29uZmlnLm1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgfHwge3Byb3ZpZGU6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIHVzZUNsYXNzOiBGYWtlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcn0sXG4gICAgICAgIFRyYW5zbGF0ZVN0b3JlLFxuICAgICAgICB7cHJvdmlkZTogVVNFX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLmlzb2xhdGV9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX0RFRkFVTFRfTEFORywgdXNlVmFsdWU6IGNvbmZpZy51c2VEZWZhdWx0TGFuZ30sXG4gICAgICAgIFRyYW5zbGF0ZVNlcnZpY2VcbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpbiB5b3VyIG90aGVyIChub24gcm9vdCkgbW9kdWxlcyB0byBpbXBvcnQgdGhlIGRpcmVjdGl2ZS9waXBlXG4gICAqL1xuICBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnOiBUcmFuc2xhdGVNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVHJhbnNsYXRlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIGNvbmZpZy5sb2FkZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlciwgdXNlQ2xhc3M6IFRyYW5zbGF0ZUZha2VMb2FkZXJ9LFxuICAgICAgICBjb25maWcuY29tcGlsZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZUNvbXBpbGVyLCB1c2VDbGFzczogVHJhbnNsYXRlRmFrZUNvbXBpbGVyfSxcbiAgICAgICAgY29uZmlnLnBhcnNlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlUGFyc2VyLCB1c2VDbGFzczogVHJhbnNsYXRlRGVmYXVsdFBhcnNlcn0sXG4gICAgICAgIGNvbmZpZy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHx8IHtwcm92aWRlOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCB1c2VDbGFzczogRmFrZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJ9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLmlzb2xhdGV9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX0RFRkFVTFRfTEFORywgdXNlVmFsdWU6IGNvbmZpZy51c2VEZWZhdWx0TGFuZ30sXG4gICAgICAgIFRyYW5zbGF0ZVNlcnZpY2VcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJvZiIsIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJJbmplY3Rpb25Ub2tlbiIsInRha2UiLCJzaGFyZSIsIm1hcCIsInRzbGliXzEuX192YWx1ZXMiLCJtZXJnZSIsInRvQXJyYXkiLCJPYnNlcnZhYmxlIiwiY29uY2F0Iiwic3dpdGNoTWFwIiwiSW5qZWN0IiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIkNoYW5nZURldGVjdG9yUmVmIiwiSW5wdXQiLCJQaXBlIiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9FLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFFRixhQUFnQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixTQUFTLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUks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