import { __extends, __values } from 'tslib';
import { Injectable, EventEmitter, Inject, InjectionToken, ChangeDetectorRef, Directive, ElementRef, Input, Pipe, NgModule } from '@angular/core';
import { of, concat, merge, Observable } from 'rxjs';
import { map, share, switchMap, take, toArray } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
TranslateLoader = /** @class */ (function () {
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
        return of({});
    };
    TranslateFakeLoader.decorators = [
        { type: Injectable }
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
var  /**
 * @abstract
 */
MissingTranslationHandler = /** @class */ (function () {
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
        { type: Injectable }
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
var  /**
 * @abstract
 */
TranslateCompiler = /** @class */ (function () {
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
        { type: Injectable }
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
var  /**
 * @abstract
 */
TranslateParser = /** @class */ (function () {
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
            result = (/** @type {?} */ (expr));
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
        { type: Injectable }
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
        this.onTranslationChange = new EventEmitter();
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         */
        this.onLangChange = new EventEmitter();
        /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
         *     // do something
         * });
         */
        this.onDefaultLangChange = new EventEmitter();
    }
    return TranslateStore;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var USE_STORE = new InjectionToken('USE_STORE');
/** @type {?} */
var USE_DEFAULT_LANG = new InjectionToken('USE_DEFAULT_LANG');
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
        if (useDefaultLang === void 0) { useDefaultLang = true; }
        if (isolate === void 0) { isolate = false; }
        this.store = store;
        this.currentLoader = currentLoader;
        this.compiler = compiler;
        this.parser = parser;
        this.missingTranslationHandler = missingTranslationHandler;
        this.useDefaultLang = useDefaultLang;
        this.isolate = isolate;
        this._isActive = false;
        this._subTimer = null;
        this.pending = false;
        this._onTranslationChange = new EventEmitter();
        this._onLangChange = new EventEmitter();
        this._onDefaultLangChange = new EventEmitter();
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
         */
        function () {
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
         */
        function () {
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
         */
        function () {
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
         */
        function () {
            return this.isolate ? this._defaultLang : this.store.defaultLang;
        },
        set: /**
         * @param {?} defaultLang
         * @return {?}
         */
        function (defaultLang) {
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
         */
        function () {
            return this.isolate ? this._currentLang : this.store.currentLang;
        },
        set: /**
         * @param {?} currentLang
         * @return {?}
         */
        function (currentLang) {
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
         */
        function () {
            return this.isolate ? this._langs : this.store.langs;
        },
        set: /**
         * @param {?} langs
         * @return {?}
         */
        function (langs) {
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
         */
        function () {
            return this.isolate ? this._translations : this.store.translations;
        },
        set: /**
         * @param {?} translations
         * @return {?}
         */
        function (translations) {
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
            pending.pipe(take(1))
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
            return of(this.translations[lang]);
        }
        /** @type {?} */
        var pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the currentLang immediately
            if (!this.currentLang) {
                this.currentLang = lang;
            }
            pending.pipe(take(1))
                .subscribe(function (res) {
                _this.changeLang(lang);
            });
            return pending;
        }
        else { // we have this language, return an Observable
            this.changeLang(lang);
            return of(this.translations[lang]);
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
        var loadingTranslations = this.currentLoader.getTranslation(lang).pipe(share());
        this.loadingTranslations = loadingTranslations.pipe(take(1), map(function (res) { return _this.compiler.compileTranslations(res, lang); }), share());
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
        if (shouldMerge === void 0) { shouldMerge = false; }
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (key_1_1 && !key_1_1.done && (_a = key_1.return)) _a.call(key_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (observables) {
                /** @type {?} */
                var mergedObs = void 0;
                try {
                    for (var key_2 = __values(key), key_2_1 = key_2.next(); !key_2_1.done; key_2_1 = key_2.next()) {
                        var k = key_2_1.value;
                        /** @type {?} */
                        var obs = typeof result[k].subscribe === "function" ? result[k] : of((/** @type {?} */ (result[k])));
                        if (typeof mergedObs === "undefined") {
                            mergedObs = obs;
                        }
                        else {
                            mergedObs = merge(mergedObs, obs);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (key_2_1 && !key_2_1.done && (_b = key_2.return)) _b.call(key_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return mergedObs.pipe(toArray(), map(function (arr) {
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
            return Observable.create(function (observer) {
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
                return of(res);
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
        return concat(this.get(key, interpolateParams), this.onLangChange.pipe(switchMap(function (event) {
            /** @type {?} */
            var res = _this.getParsedResult(event.translations, key, interpolateParams);
            if (typeof res.subscribe === "function") {
                return res;
            }
            else {
                return of(res);
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
        if (lang === void 0) { lang = this.currentLang; }
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
        if (this._subTimer) {
            clearTimeout(this._subTimer);
        }
        this._isActive = true;
        this._subTimer = setTimeout(function () {
            _this._isActive = false;
        }, 1000);
    };
    TranslateService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TranslateService.ctorParameters = function () { return [
        { type: TranslateStore },
        { type: TranslateLoader },
        { type: TranslateCompiler },
        { type: TranslateParser },
        { type: MissingTranslationHandler },
        { type: Boolean, decorators: [{ type: Inject, args: [USE_DEFAULT_LANG,] }] },
        { type: Boolean, decorators: [{ type: Inject, args: [USE_STORE,] }] }
    ]; };
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
         */
        function (key) {
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
         */
        function (params) {
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
        if (forceUpdate === void 0) { forceUpdate = false; }
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
        { type: Directive, args: [{
                    selector: '[translate],[ngx-translate]'
                },] }
    ];
    /** @nocollapse */
    TranslateDirective.ctorParameters = function () { return [
        { type: TranslateService },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    TranslateDirective.propDecorators = {
        translate: [{ type: Input }],
        translateParams: [{ type: Input }]
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
        { type: Injectable },
        { type: Pipe, args: [{
                    name: 'translate',
                    pure: false // required to update the value when the promise is resolved
                },] }
    ];
    /** @nocollapse */
    TranslatePipe.ctorParameters = function () { return [
        { type: TranslateService },
        { type: ChangeDetectorRef }
    ]; };
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
        if (config === void 0) { config = {}; }
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
        if (config === void 0) { config = {}; }
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
        { type: NgModule, args: [{
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

export { TranslateModule, TranslateLoader, TranslateFakeLoader, USE_STORE, USE_DEFAULT_LANG, TranslateService, MissingTranslationHandler, FakeMissingTranslationHandler, TranslateParser, TranslateDefaultParser, TranslateCompiler, TranslateFakeCompiler, TranslateDirective, TranslatePipe, TranslateStore };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyYW5zbGF0ZS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi90cmFuc2xhdGUubG9hZGVyLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi9taXNzaW5nLXRyYW5zbGF0aW9uLWhhbmRsZXIudHMiLCJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvbGliL3RyYW5zbGF0ZS5jb21waWxlci50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdXRpbC50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLnBhcnNlci50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLnN0b3JlLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi90cmFuc2xhdGUuc2VydmljZS50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLnBpcGUudHMiLCJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvcHVibGljX2FwaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJhbnNsYXRlTG9hZGVyIHtcbiAgYWJzdHJhY3QgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+O1xufVxuXG4vKipcbiAqIFRoaXMgbG9hZGVyIGlzIGp1c3QgYSBwbGFjZWhvbGRlciB0aGF0IGRvZXMgbm90aGluZywgaW4gY2FzZSB5b3UgZG9uJ3QgbmVlZCBhIGxvYWRlciBhdCBhbGxcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZUZha2VMb2FkZXIgZXh0ZW5kcyBUcmFuc2xhdGVMb2FkZXIge1xuICBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBvZih7fSk7XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIi4vdHJhbnNsYXRlLnNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zIHtcbiAgLyoqXG4gICAqIHRoZSBrZXkgdGhhdCdzIG1pc3NpbmcgaW4gdHJhbnNsYXRpb24gZmlsZXNcbiAgICovXG4gIGtleTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBhbiBpbnN0YW5jZSBvZiB0aGUgc2VydmljZSB0aGF0IHdhcyB1bmFibGUgdG8gdHJhbnNsYXRlIHRoZSBrZXkuXG4gICAqL1xuICB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlO1xuXG4gIC8qKlxuICAgKiBpbnRlcnBvbGF0aW9uIHBhcmFtcyB0aGF0IHdlcmUgcGFzc2VkIGFsb25nIGZvciB0cmFuc2xhdGluZyB0aGUgZ2l2ZW4ga2V5LlxuICAgKi9cbiAgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3Q7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIG1pc3NpbmcgdHJhbnNsYXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIGNvbnRleHQgZm9yIHJlc29sdmluZyBhIG1pc3NpbmcgdHJhbnNsYXRpb25cbiAgICogQHJldHVybnMgYSB2YWx1ZSBvciBhbiBvYnNlcnZhYmxlXG4gICAqIElmIGl0IHJldHVybnMgYSB2YWx1ZSwgdGhlbiB0aGlzIHZhbHVlIGlzIHVzZWQuXG4gICAqIElmIGl0IHJldHVybiBhbiBvYnNlcnZhYmxlLCB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhpcyBvYnNlcnZhYmxlIHdpbGwgYmUgdXNlZCAoZXhjZXB0IGlmIHRoZSBtZXRob2Qgd2FzIFwiaW5zdGFudFwiKS5cbiAgICogSWYgaXQgZG9lc24ndCByZXR1cm4gdGhlbiB0aGUga2V5IHdpbGwgYmUgdXNlZCBhcyBhIHZhbHVlXG4gICAqL1xuICBhYnN0cmFjdCBoYW5kbGUocGFyYW1zOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zKTogYW55O1xufVxuXG4vKipcbiAqIFRoaXMgaGFuZGxlciBpcyBqdXN0IGEgcGxhY2Vob2xkZXIgdGhhdCBkb2VzIG5vdGhpbmcsIGluIGNhc2UgeW91IGRvbid0IG5lZWQgYSBtaXNzaW5nIHRyYW5zbGF0aW9uIGhhbmRsZXIgYXQgYWxsXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGYWtlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciBpbXBsZW1lbnRzIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIge1xuICBoYW5kbGUocGFyYW1zOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcGFyYW1zLmtleTtcbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJhbnNsYXRlQ29tcGlsZXIge1xuICBhYnN0cmFjdCBjb21waWxlKHZhbHVlOiBzdHJpbmcsIGxhbmc6IHN0cmluZyk6IHN0cmluZyB8IEZ1bmN0aW9uO1xuXG4gIGFic3RyYWN0IGNvbXBpbGVUcmFuc2xhdGlvbnModHJhbnNsYXRpb25zOiBhbnksIGxhbmc6IHN0cmluZyk6IGFueTtcbn1cblxuLyoqXG4gKiBUaGlzIGNvbXBpbGVyIGlzIGp1c3QgYSBwbGFjZWhvbGRlciB0aGF0IGRvZXMgbm90aGluZywgaW4gY2FzZSB5b3UgZG9uJ3QgbmVlZCBhIGNvbXBpbGVyIGF0IGFsbFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlRmFrZUNvbXBpbGVyIGV4dGVuZHMgVHJhbnNsYXRlQ29tcGlsZXIge1xuICBjb21waWxlKHZhbHVlOiBzdHJpbmcsIGxhbmc6IHN0cmluZyk6IHN0cmluZyB8IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBjb21waWxlVHJhbnNsYXRpb25zKHRyYW5zbGF0aW9uczogYW55LCBsYW5nOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0cmFuc2xhdGlvbnM7XG4gIH1cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIERldGVybWluZXMgaWYgdHdvIG9iamVjdHMgb3IgdHdvIHZhbHVlcyBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBUd28gb2JqZWN0cyBvciB2YWx1ZXMgYXJlIGNvbnNpZGVyZWQgZXF1aXZhbGVudCBpZiBhdCBsZWFzdCBvbmUgb2YgdGhlIGZvbGxvd2luZyBpcyB0cnVlOlxuICpcbiAqICogQm90aCBvYmplY3RzIG9yIHZhbHVlcyBwYXNzIGA9PT1gIGNvbXBhcmlzb24uXG4gKiAqIEJvdGggb2JqZWN0cyBvciB2YWx1ZXMgYXJlIG9mIHRoZSBzYW1lIHR5cGUgYW5kIGFsbCBvZiB0aGVpciBwcm9wZXJ0aWVzIGFyZSBlcXVhbCBieVxuICogICBjb21wYXJpbmcgdGhlbSB3aXRoIGBlcXVhbHNgLlxuICpcbiAqIEBwYXJhbSBvMSBPYmplY3Qgb3IgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSBvMiBPYmplY3Qgb3IgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHRydWUgaWYgYXJndW1lbnRzIGFyZSBlcXVhbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhvMTogYW55LCBvMjogYW55KTogYm9vbGVhbiB7XG4gIGlmIChvMSA9PT0gbzIpIHJldHVybiB0cnVlO1xuICBpZiAobzEgPT09IG51bGwgfHwgbzIgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKG8xICE9PSBvMSAmJiBvMiAhPT0gbzIpIHJldHVybiB0cnVlOyAvLyBOYU4gPT09IE5hTlxuICBsZXQgdDEgPSB0eXBlb2YgbzEsIHQyID0gdHlwZW9mIG8yLCBsZW5ndGg6IG51bWJlciwga2V5OiBhbnksIGtleVNldDogYW55O1xuICBpZiAodDEgPT0gdDIgJiYgdDEgPT0gJ29iamVjdCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvMSkpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShvMikpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICgobGVuZ3RoID0gbzEubGVuZ3RoKSA9PSBvMi5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChrZXkgPSAwOyBrZXkgPCBsZW5ndGg7IGtleSsrKSB7XG4gICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobzIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGtleVNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBmb3IgKGtleSBpbiBvMSkge1xuICAgICAgICBpZiAoIWVxdWFscyhvMVtrZXldLCBvMltrZXldKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBrZXlTZXRba2V5XSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3IgKGtleSBpbiBvMikge1xuICAgICAgICBpZiAoIShrZXkgaW4ga2V5U2V0KSAmJiB0eXBlb2YgbzJba2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vKiB0c2xpbnQ6ZW5hYmxlICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGl0ZW0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpOiBhbnkge1xuICBsZXQgb3V0cHV0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0KTtcbiAgaWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaCgoa2V5OiBhbnkpID0+IHtcbiAgICAgIGlmIChpc09iamVjdChzb3VyY2Vba2V5XSkpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHRhcmdldCkpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwge1trZXldOiBzb3VyY2Vba2V5XX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG91dHB1dFtrZXldID0gbWVyZ2VEZWVwKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCB7W2tleV06IHNvdXJjZVtrZXldfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7aXNEZWZpbmVkfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmFuc2xhdGVQYXJzZXIge1xuICAvKipcbiAgICogSW50ZXJwb2xhdGVzIGEgc3RyaW5nIHRvIHJlcGxhY2UgcGFyYW1ldGVyc1xuICAgKiBcIlRoaXMgaXMgYSB7eyBrZXkgfX1cIiA9PT4gXCJUaGlzIGlzIGEgdmFsdWVcIiwgd2l0aCBwYXJhbXMgPSB7IGtleTogXCJ2YWx1ZVwiIH1cbiAgICogQHBhcmFtIGV4cHJcbiAgICogQHBhcmFtIHBhcmFtc1xuICAgKi9cbiAgYWJzdHJhY3QgaW50ZXJwb2xhdGUoZXhwcjogc3RyaW5nIHwgRnVuY3Rpb24sIHBhcmFtcz86IGFueSk6IHN0cmluZztcblxuICAvKipcbiAgICogR2V0cyBhIHZhbHVlIGZyb20gYW4gb2JqZWN0IGJ5IGNvbXBvc2VkIGtleVxuICAgKiBwYXJzZXIuZ2V0VmFsdWUoeyBrZXkxOiB7IGtleUE6ICd2YWx1ZUknIH19LCAna2V5MS5rZXlBJykgPT0+ICd2YWx1ZUknXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIGtleVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0VmFsdWUodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nKTogYW55XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVEZWZhdWx0UGFyc2VyIGV4dGVuZHMgVHJhbnNsYXRlUGFyc2VyIHtcbiAgdGVtcGxhdGVNYXRjaGVyOiBSZWdFeHAgPSAve3tcXHM/KFtee31cXHNdKilcXHM/fX0vZztcblxuICBwdWJsaWMgaW50ZXJwb2xhdGUoZXhwcjogc3RyaW5nIHwgRnVuY3Rpb24sIHBhcmFtcz86IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdDogc3RyaW5nO1xuXG4gICAgaWYgKHR5cGVvZiBleHByID09PSAnc3RyaW5nJykge1xuICAgICAgcmVzdWx0ID0gdGhpcy5pbnRlcnBvbGF0ZVN0cmluZyhleHByLCBwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cHIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuaW50ZXJwb2xhdGVGdW5jdGlvbihleHByLCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzIHNob3VsZCBub3QgaGFwcGVuLCBidXQgYW4gdW5yZWxhdGVkIFRyYW5zbGF0ZVNlcnZpY2UgdGVzdCBkZXBlbmRzIG9uIGl0XG4gICAgICByZXN1bHQgPSBleHByIGFzIHN0cmluZztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0VmFsdWUodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nKTogYW55IHtcbiAgICBsZXQga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICAgIGtleSA9ICcnO1xuICAgIGRvIHtcbiAgICAgIGtleSArPSBrZXlzLnNoaWZ0KCk7XG4gICAgICBpZiAoaXNEZWZpbmVkKHRhcmdldCkgJiYgaXNEZWZpbmVkKHRhcmdldFtrZXldKSAmJiAodHlwZW9mIHRhcmdldFtrZXldID09PSAnb2JqZWN0JyB8fCAha2V5cy5sZW5ndGgpKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldFtrZXldO1xuICAgICAgICBrZXkgPSAnJztcbiAgICAgIH0gZWxzZSBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSArPSAnLic7XG4gICAgICB9XG4gICAgfSB3aGlsZSAoa2V5cy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHByaXZhdGUgaW50ZXJwb2xhdGVGdW5jdGlvbihmbjogRnVuY3Rpb24sIHBhcmFtcz86IGFueSkge1xuICAgIHJldHVybiBmbihwYXJhbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnRlcnBvbGF0ZVN0cmluZyhleHByOiBzdHJpbmcsIHBhcmFtcz86IGFueSkge1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwci5yZXBsYWNlKHRoaXMudGVtcGxhdGVNYXRjaGVyLCAoc3Vic3RyaW5nOiBzdHJpbmcsIGI6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IHIgPSB0aGlzLmdldFZhbHVlKHBhcmFtcywgYik7XG4gICAgICByZXR1cm4gaXNEZWZpbmVkKHIpID8gciA6IHN1YnN0cmluZztcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0RlZmF1bHRMYW5nQ2hhbmdlRXZlbnQsIExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRpb25DaGFuZ2VFdmVudH0gZnJvbSBcIi4vdHJhbnNsYXRlLnNlcnZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVN0b3JlIHtcbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGxhbmcgdG8gZmFsbGJhY2sgd2hlbiB0cmFuc2xhdGlvbnMgYXJlIG1pc3Npbmcgb24gdGhlIGN1cnJlbnQgbGFuZ1xuICAgKi9cbiAgcHVibGljIGRlZmF1bHRMYW5nOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBsYW5nIGN1cnJlbnRseSB1c2VkXG4gICAqL1xuICBwdWJsaWMgY3VycmVudExhbmc6IHN0cmluZyA9IHRoaXMuZGVmYXVsdExhbmc7XG5cbiAgLyoqXG4gICAqIGEgbGlzdCBvZiB0cmFuc2xhdGlvbnMgcGVyIGxhbmdcbiAgICovXG4gIHB1YmxpYyB0cmFuc2xhdGlvbnM6IGFueSA9IHt9O1xuXG4gIC8qKlxuICAgKiBhbiBhcnJheSBvZiBsYW5nc1xuICAgKi9cbiAgcHVibGljIGxhbmdzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgLyoqXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gdHJhbnNsYXRpb24gY2hhbmdlIGV2ZW50c1xuICAgKiBvblRyYW5zbGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgKi9cbiAgcHVibGljIG9uVHJhbnNsYXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byBsYW5nIGNoYW5nZSBldmVudHNcbiAgICogb25MYW5nQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAqL1xuICBwdWJsaWMgb25MYW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGRlZmF1bHQgbGFuZyBjaGFuZ2UgZXZlbnRzXG4gICAqIG9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAqL1xuICBwdWJsaWMgb25EZWZhdWx0TGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50PigpO1xufVxuIiwiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge2NvbmNhdCwgbWVyZ2UsIE9ic2VydmFibGUsIE9ic2VydmVyLCBvZn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7bWFwLCBzaGFyZSwgc3dpdGNoTWFwLCB0YWtlLCB0b0FycmF5fSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7TWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciwgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclBhcmFtc30gZnJvbSBcIi4vbWlzc2luZy10cmFuc2xhdGlvbi1oYW5kbGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZUNvbXBpbGVyfSBmcm9tIFwiLi90cmFuc2xhdGUuY29tcGlsZXJcIjtcbmltcG9ydCB7VHJhbnNsYXRlTG9hZGVyfSBmcm9tIFwiLi90cmFuc2xhdGUubG9hZGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVBhcnNlcn0gZnJvbSBcIi4vdHJhbnNsYXRlLnBhcnNlclwiO1xuXG5pbXBvcnQge1RyYW5zbGF0ZVN0b3JlfSBmcm9tIFwiLi90cmFuc2xhdGUuc3RvcmVcIjtcbmltcG9ydCB7aXNEZWZpbmVkLCBtZXJnZURlZXB9IGZyb20gXCIuL3V0aWxcIjtcblxuZXhwb3J0IGNvbnN0IFVTRV9TVE9SRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdVU0VfU1RPUkUnKTtcbmV4cG9ydCBjb25zdCBVU0VfREVGQVVMVF9MQU5HID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1VTRV9ERUZBVUxUX0xBTkcnKTtcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50IHtcbiAgdHJhbnNsYXRpb25zOiBhbnk7XG4gIGxhbmc6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYW5nQ2hhbmdlRXZlbnQge1xuICBsYW5nOiBzdHJpbmc7XG4gIHRyYW5zbGF0aW9uczogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQge1xuICBsYW5nOiBzdHJpbmc7XG4gIHRyYW5zbGF0aW9uczogYW55O1xufVxuXG5kZWNsYXJlIGludGVyZmFjZSBXaW5kb3cge1xuICBuYXZpZ2F0b3I6IGFueTtcbn1cblxuZGVjbGFyZSBjb25zdCB3aW5kb3c6IFdpbmRvdztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVNlcnZpY2Uge1xuICBwdWJsaWMgX2lzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBfc3ViVGltZXI6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgbG9hZGluZ1RyYW5zbGF0aW9uczogT2JzZXJ2YWJsZTxhbnk+O1xuICBwcml2YXRlIHBlbmRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfb25UcmFuc2xhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PigpO1xuICBwcml2YXRlIF9vbkxhbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+KCk7XG4gIHByaXZhdGUgX29uRGVmYXVsdExhbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RGVmYXVsdExhbmdDaGFuZ2VFdmVudD4oKTtcbiAgcHJpdmF0ZSBfZGVmYXVsdExhbmc6IHN0cmluZztcbiAgcHJpdmF0ZSBfY3VycmVudExhbmc6IHN0cmluZztcbiAgcHJpdmF0ZSBfbGFuZ3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgcHJpdmF0ZSBfdHJhbnNsYXRpb25zOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfdHJhbnNsYXRpb25SZXF1ZXN0czogYW55ID0ge307XG5cbiAgLyoqXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gdHJhbnNsYXRpb24gY2hhbmdlIGV2ZW50c1xuICAgKiBvblRyYW5zbGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgKi9cbiAgZ2V0IG9uVHJhbnNsYXRpb25DaGFuZ2UoKTogRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fb25UcmFuc2xhdGlvbkNoYW5nZSA6IHRoaXMuc3RvcmUub25UcmFuc2xhdGlvbkNoYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGxhbmcgY2hhbmdlIGV2ZW50c1xuICAgKiBvbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgKiB9KTtcbiAgICovXG4gIGdldCBvbkxhbmdDaGFuZ2UoKTogRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9vbkxhbmdDaGFuZ2UgOiB0aGlzLnN0b3JlLm9uTGFuZ0NoYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGRlZmF1bHQgbGFuZyBjaGFuZ2UgZXZlbnRzXG4gICAqIG9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAqL1xuICBnZXQgb25EZWZhdWx0TGFuZ0NoYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fb25EZWZhdWx0TGFuZ0NoYW5nZSA6IHRoaXMuc3RvcmUub25EZWZhdWx0TGFuZ0NoYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBsYW5nIHRvIGZhbGxiYWNrIHdoZW4gdHJhbnNsYXRpb25zIGFyZSBtaXNzaW5nIG9uIHRoZSBjdXJyZW50IGxhbmdcbiAgICovXG4gIGdldCBkZWZhdWx0TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9kZWZhdWx0TGFuZyA6IHRoaXMuc3RvcmUuZGVmYXVsdExhbmc7XG4gIH1cblxuICBzZXQgZGVmYXVsdExhbmcoZGVmYXVsdExhbmc6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzb2xhdGUpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRMYW5nID0gZGVmYXVsdExhbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmUuZGVmYXVsdExhbmcgPSBkZWZhdWx0TGFuZztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGxhbmcgY3VycmVudGx5IHVzZWRcbiAgICovXG4gIGdldCBjdXJyZW50TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9jdXJyZW50TGFuZyA6IHRoaXMuc3RvcmUuY3VycmVudExhbmc7XG4gIH1cblxuICBzZXQgY3VycmVudExhbmcoY3VycmVudExhbmc6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzb2xhdGUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRMYW5nID0gY3VycmVudExhbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmUuY3VycmVudExhbmcgPSBjdXJyZW50TGFuZztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYW4gYXJyYXkgb2YgbGFuZ3NcbiAgICovXG4gIGdldCBsYW5ncygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX2xhbmdzIDogdGhpcy5zdG9yZS5sYW5ncztcbiAgfVxuXG4gIHNldCBsYW5ncyhsYW5nczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5pc29sYXRlKSB7XG4gICAgICB0aGlzLl9sYW5ncyA9IGxhbmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLmxhbmdzID0gbGFuZ3M7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGEgbGlzdCBvZiB0cmFuc2xhdGlvbnMgcGVyIGxhbmdcbiAgICovXG4gIGdldCB0cmFuc2xhdGlvbnMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fdHJhbnNsYXRpb25zIDogdGhpcy5zdG9yZS50cmFuc2xhdGlvbnM7XG4gIH1cblxuICBzZXQgdHJhbnNsYXRpb25zKHRyYW5zbGF0aW9uczogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNvbGF0ZSkge1xuICAgICAgdGhpcy5fdHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLnRyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9ucztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHN0b3JlIGFuIGluc3RhbmNlIG9mIHRoZSBzdG9yZSAodGhhdCBpcyBzdXBwb3NlZCB0byBiZSB1bmlxdWUpXG4gICAqIEBwYXJhbSBjdXJyZW50TG9hZGVyIEFuIGluc3RhbmNlIG9mIHRoZSBsb2FkZXIgY3VycmVudGx5IHVzZWRcbiAgICogQHBhcmFtIGNvbXBpbGVyIEFuIGluc3RhbmNlIG9mIHRoZSBjb21waWxlciBjdXJyZW50bHkgdXNlZFxuICAgKiBAcGFyYW0gcGFyc2VyIEFuIGluc3RhbmNlIG9mIHRoZSBwYXJzZXIgY3VycmVudGx5IHVzZWRcbiAgICogQHBhcmFtIG1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgQSBoYW5kbGVyIGZvciBtaXNzaW5nIHRyYW5zbGF0aW9ucy5cbiAgICogQHBhcmFtIGlzb2xhdGUgd2hldGhlciB0aGlzIHNlcnZpY2Ugc2hvdWxkIHVzZSB0aGUgc3RvcmUgb3Igbm90XG4gICAqIEBwYXJhbSB1c2VEZWZhdWx0TGFuZyB3aGV0aGVyIHdlIHNob3VsZCB1c2UgZGVmYXVsdCBsYW5ndWFnZSB0cmFuc2xhdGlvbiB3aGVuIGN1cnJlbnQgbGFuZ3VhZ2UgdHJhbnNsYXRpb24gaXMgbWlzc2luZy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdG9yZTogVHJhbnNsYXRlU3RvcmUsXG4gICAgICAgICAgICAgIHB1YmxpYyBjdXJyZW50TG9hZGVyOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBjb21waWxlcjogVHJhbnNsYXRlQ29tcGlsZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJzZXI6IFRyYW5zbGF0ZVBhcnNlcixcbiAgICAgICAgICAgICAgcHVibGljIG1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXI6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgICAgICAgIEBJbmplY3QoVVNFX0RFRkFVTFRfTEFORykgcHJpdmF0ZSB1c2VEZWZhdWx0TGFuZzogYm9vbGVhbiA9IHRydWUsXG4gICAgICAgICAgICAgIEBJbmplY3QoVVNFX1NUT1JFKSBwcml2YXRlIGlzb2xhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgdG8gdXNlIGFzIGEgZmFsbGJhY2tcbiAgICovXG4gIHB1YmxpYyBzZXREZWZhdWx0TGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobGFuZyA9PT0gdGhpcy5kZWZhdWx0TGFuZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBwZW5kaW5nOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnJldHJpZXZlVHJhbnNsYXRpb25zKGxhbmcpO1xuXG4gICAgaWYgKHR5cGVvZiBwZW5kaW5nICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAvLyBvbiBpbml0IHNldCB0aGUgZGVmYXVsdExhbmcgaW1tZWRpYXRlbHlcbiAgICAgIGlmICghdGhpcy5kZWZhdWx0TGFuZykge1xuICAgICAgICB0aGlzLmRlZmF1bHRMYW5nID0gbGFuZztcbiAgICAgIH1cblxuICAgICAgcGVuZGluZy5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZWZhdWx0TGFuZyhsYW5nKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHsgLy8gd2UgYWxyZWFkeSBoYXZlIHRoaXMgbGFuZ3VhZ2VcbiAgICAgIHRoaXMuY2hhbmdlRGVmYXVsdExhbmcobGFuZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgdXNlZFxuICAgKi9cbiAgcHVibGljIGdldERlZmF1bHRMYW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdExhbmc7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgbGFuZyBjdXJyZW50bHkgdXNlZFxuICAgKi9cbiAgcHVibGljIHVzZShsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIGRvbid0IGNoYW5nZSB0aGUgbGFuZ3VhZ2UgaWYgdGhlIGxhbmd1YWdlIGdpdmVuIGlzIGFscmVhZHkgc2VsZWN0ZWRcbiAgICBpZiAobGFuZyA9PT0gdGhpcy5jdXJyZW50TGFuZykge1xuICAgICAgcmV0dXJuIG9mKHRoaXMudHJhbnNsYXRpb25zW2xhbmddKTtcbiAgICB9XG5cbiAgICBsZXQgcGVuZGluZzogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5yZXRyaWV2ZVRyYW5zbGF0aW9ucyhsYW5nKTtcblxuICAgIGlmICh0eXBlb2YgcGVuZGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgLy8gb24gaW5pdCBzZXQgdGhlIGN1cnJlbnRMYW5nIGltbWVkaWF0ZWx5XG4gICAgICBpZiAoIXRoaXMuY3VycmVudExhbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IGxhbmc7XG4gICAgICB9XG5cbiAgICAgIHBlbmRpbmcucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBwZW5kaW5nO1xuICAgIH0gZWxzZSB7IC8vIHdlIGhhdmUgdGhpcyBsYW5ndWFnZSwgcmV0dXJuIGFuIE9ic2VydmFibGVcbiAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcblxuICAgICAgcmV0dXJuIG9mKHRoaXMudHJhbnNsYXRpb25zW2xhbmddKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBnaXZlbiB0cmFuc2xhdGlvbnNcbiAgICovXG4gIHByaXZhdGUgcmV0cmlldmVUcmFuc2xhdGlvbnMobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgcGVuZGluZzogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgLy8gaWYgdGhpcyBsYW5ndWFnZSBpcyB1bmF2YWlsYWJsZSwgYXNrIGZvciBpdFxuICAgIGlmICh0eXBlb2YgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuX3RyYW5zbGF0aW9uUmVxdWVzdHNbbGFuZ10gPSB0aGlzLl90cmFuc2xhdGlvblJlcXVlc3RzW2xhbmddIHx8IHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZyk7XG4gICAgICBwZW5kaW5nID0gdGhpcy5fdHJhbnNsYXRpb25SZXF1ZXN0c1tsYW5nXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGVuZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2Ugd2l0aCB0aGUgY3VycmVudCBsb2FkZXJcbiAgICogYW5kIHBhc3NlcyBpdCB0aHJvdWdoIHRoZSBjb21waWxlclxuICAgKi9cbiAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICBjb25zdCBsb2FkaW5nVHJhbnNsYXRpb25zID0gdGhpcy5jdXJyZW50TG9hZGVyLmdldFRyYW5zbGF0aW9uKGxhbmcpLnBpcGUoc2hhcmUoKSk7XG4gICAgdGhpcy5sb2FkaW5nVHJhbnNsYXRpb25zID0gbG9hZGluZ1RyYW5zbGF0aW9ucy5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIG1hcCgocmVzOiBPYmplY3QpID0+IHRoaXMuY29tcGlsZXIuY29tcGlsZVRyYW5zbGF0aW9ucyhyZXMsIGxhbmcpKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5sb2FkaW5nVHJhbnNsYXRpb25zXG4gICAgICAuc3Vic2NyaWJlKChyZXM6IE9iamVjdCkgPT4ge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IHJlcztcbiAgICAgICAgdGhpcy51cGRhdGVMYW5ncygpO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgIH0sIChlcnI6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGxvYWRpbmdUcmFuc2xhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgc2V0cyBhbiBvYmplY3Qgb2YgdHJhbnNsYXRpb25zIGZvciBhIGdpdmVuIGxhbmd1YWdlXG4gICAqIGFmdGVyIHBhc3NpbmcgaXQgdGhyb3VnaCB0aGUgY29tcGlsZXJcbiAgICovXG4gIHB1YmxpYyBzZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcsIHRyYW5zbGF0aW9uczogT2JqZWN0LCBzaG91bGRNZXJnZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdHJhbnNsYXRpb25zID0gdGhpcy5jb21waWxlci5jb21waWxlVHJhbnNsYXRpb25zKHRyYW5zbGF0aW9ucywgbGFuZyk7XG4gICAgaWYgKHNob3VsZE1lcmdlICYmIHRoaXMudHJhbnNsYXRpb25zW2xhbmddKSB7XG4gICAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IG1lcmdlRGVlcCh0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSwgdHJhbnNsYXRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPSB0cmFuc2xhdGlvbnM7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UuZW1pdCh7bGFuZzogbGFuZywgdHJhbnNsYXRpb25zOiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgY3VycmVudGx5IGF2YWlsYWJsZSBsYW5nc1xuICAgKi9cbiAgcHVibGljIGdldExhbmdzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmxhbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmFpbGFibGUgbGFuZ3NcbiAgICovXG4gIHB1YmxpYyBhZGRMYW5ncyhsYW5nczogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgIGxhbmdzLmZvckVhY2goKGxhbmc6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMubGFuZ3MuaW5kZXhPZihsYW5nKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5sYW5ncy5wdXNoKGxhbmcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCBvZiBhdmFpbGFibGUgbGFuZ3NcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlTGFuZ3MoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRMYW5ncyhPYmplY3Qua2V5cyh0aGlzLnRyYW5zbGF0aW9ucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBhcnNlZCByZXN1bHQgb2YgdGhlIHRyYW5zbGF0aW9uc1xuICAgKi9cbiAgcHVibGljIGdldFBhcnNlZFJlc3VsdCh0cmFuc2xhdGlvbnM6IGFueSwga2V5OiBhbnksIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogYW55IHtcbiAgICBsZXQgcmVzOiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9LFxuICAgICAgICBvYnNlcnZhYmxlczogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgayBvZiBrZXkpIHtcbiAgICAgICAgcmVzdWx0W2tdID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrLCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0W2tdLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb2JzZXJ2YWJsZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob2JzZXJ2YWJsZXMpIHtcbiAgICAgICAgbGV0IG1lcmdlZE9iczogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgICAgICBmb3IgKGxldCBrIG9mIGtleSkge1xuICAgICAgICAgIGxldCBvYnMgPSB0eXBlb2YgcmVzdWx0W2tdLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiID8gcmVzdWx0W2tdIDogb2YocmVzdWx0W2tdIGFzIHN0cmluZyk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBtZXJnZWRPYnMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIG1lcmdlZE9icyA9IG9icztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVyZ2VkT2JzID0gbWVyZ2UobWVyZ2VkT2JzLCBvYnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkT2JzLnBpcGUoXG4gICAgICAgICAgdG9BcnJheSgpLFxuICAgICAgICAgIG1hcCgoYXJyOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIG9ialtrZXlbaW5kZXhdXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmICh0cmFuc2xhdGlvbnMpIHtcbiAgICAgIHJlcyA9IHRoaXMucGFyc2VyLmludGVycG9sYXRlKHRoaXMucGFyc2VyLmdldFZhbHVlKHRyYW5zbGF0aW9ucywga2V5KSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzID09PSBcInVuZGVmaW5lZFwiICYmIHRoaXMuZGVmYXVsdExhbmcgJiYgdGhpcy5kZWZhdWx0TGFuZyAhPT0gdGhpcy5jdXJyZW50TGFuZyAmJiB0aGlzLnVzZURlZmF1bHRMYW5nKSB7XG4gICAgICByZXMgPSB0aGlzLnBhcnNlci5pbnRlcnBvbGF0ZSh0aGlzLnBhcnNlci5nZXRWYWx1ZSh0aGlzLnRyYW5zbGF0aW9uc1t0aGlzLmRlZmF1bHRMYW5nXSwga2V5KSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBsZXQgcGFyYW1zOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zID0ge2tleSwgdHJhbnNsYXRlU2VydmljZTogdGhpc307XG4gICAgICBpZiAodHlwZW9mIGludGVycG9sYXRlUGFyYW1zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMuaW50ZXJwb2xhdGVQYXJhbXMgPSBpbnRlcnBvbGF0ZVBhcmFtcztcbiAgICAgIH1cbiAgICAgIHJlcyA9IHRoaXMubWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlci5oYW5kbGUocGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZW9mIHJlcyAhPT0gXCJ1bmRlZmluZWRcIiA/IHJlcyA6IGtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5IChvciBhbiBhcnJheSBvZiBrZXlzKVxuICAgKiBAcmV0dXJucyB0aGUgdHJhbnNsYXRlZCBrZXksIG9yIGFuIG9iamVjdCBvZiB0cmFuc2xhdGVkIGtleXNcbiAgICovXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiB7XG4gICAgaWYgKCFpc0RlZmluZWQoa2V5KSB8fCAha2V5Lmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJrZXlcIiByZXF1aXJlZGApO1xuICAgIH1cbiAgICAvLyBjaGVjayBpZiB3ZSBhcmUgbG9hZGluZyBhIG5ldyB0cmFuc2xhdGlvbiB0byB1c2VcbiAgICBpZiAodGhpcy5wZW5kaW5nKSB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICAgIGxldCBvbkNvbXBsZXRlID0gKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXMpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBvbkVycm9yID0gKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5sb2FkaW5nVHJhbnNsYXRpb25zLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICByZXMgPSB0aGlzLmdldFBhcnNlZFJlc3VsdChyZXMsIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXMuc3Vic2NyaWJlKG9uQ29tcGxldGUsIG9uRXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlKHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBvbkVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5jdXJyZW50TGFuZ10sIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgaWYgKHR5cGVvZiByZXMuc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvZihyZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyZWFtIG9mIHRyYW5zbGF0ZWQgdmFsdWVzIG9mIGEga2V5IChvciBhbiBhcnJheSBvZiBrZXlzKSB3aGljaCB1cGRhdGVzXG4gICAqIHdoZW5ldmVyIHRoZSBsYW5ndWFnZSBjaGFuZ2VzLlxuICAgKiBAcmV0dXJucyBBIHN0cmVhbSBvZiB0aGUgdHJhbnNsYXRlZCBrZXksIG9yIGFuIG9iamVjdCBvZiB0cmFuc2xhdGVkIGtleXNcbiAgICovXG4gIHB1YmxpYyBzdHJlYW0oa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiB7XG4gICAgaWYgKCFpc0RlZmluZWQoa2V5KSB8fCAha2V5Lmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJrZXlcIiByZXF1aXJlZGApO1xuICAgIH1cblxuICAgIHJldHVybiBjb25jYXQoXG4gICAgICB0aGlzLmdldChrZXksIGludGVycG9sYXRlUGFyYW1zKSxcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KGV2ZW50LnRyYW5zbGF0aW9ucywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmFuc2xhdGlvbiBpbnN0YW50bHkgZnJvbSB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgbG9hZGVkIHRyYW5zbGF0aW9uLlxuICAgKiBBbGwgcnVsZXMgcmVnYXJkaW5nIHRoZSBjdXJyZW50IGxhbmd1YWdlLCB0aGUgcHJlZmVycmVkIGxhbmd1YWdlIG9mIGV2ZW4gZmFsbGJhY2sgbGFuZ3VhZ2VzIHdpbGwgYmUgdXNlZCBleGNlcHQgYW55IHByb21pc2UgaGFuZGxpbmcuXG4gICAqL1xuICBwdWJsaWMgaW5zdGFudChrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogc3RyaW5nIHwgYW55IHtcbiAgICBpZiAoIWlzRGVmaW5lZChrZXkpIHx8ICFrZXkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KHRoaXMudHJhbnNsYXRpb25zW3RoaXMuY3VycmVudExhbmddLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAga2V5LmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBvYmpba2V5W2luZGV4XV0gPSBrZXlbaW5kZXhdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRyYW5zbGF0ZWQgdmFsdWUgb2YgYSBrZXksIGFmdGVyIGNvbXBpbGluZyBpdFxuICAgKi9cbiAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbGFuZzogc3RyaW5nID0gdGhpcy5jdXJyZW50TGFuZyk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddW2tleV0gPSB0aGlzLmNvbXBpbGVyLmNvbXBpbGUodmFsdWUsIGxhbmcpO1xuICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UuZW1pdCh7bGFuZzogbGFuZywgdHJhbnNsYXRpb25zOiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgbGFuZ1xuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VMYW5nKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudExhbmcgPSBsYW5nO1xuICAgIHRoaXMub25MYW5nQ2hhbmdlLmVtaXQoe2xhbmc6IGxhbmcsIHRyYW5zbGF0aW9uczogdGhpcy50cmFuc2xhdGlvbnNbbGFuZ119KTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGRlZmF1bHQgbGFuZywgdXNlIHRoZSBvbmUgdGhhdCB3ZSBqdXN0IHNldFxuICAgIGlmICghdGhpcy5kZWZhdWx0TGFuZykge1xuICAgICAgdGhpcy5jaGFuZ2VEZWZhdWx0TGFuZyhsYW5nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgZGVmYXVsdCBsYW5nXG4gICAqL1xuICBwcml2YXRlIGNoYW5nZURlZmF1bHRMYW5nKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVmYXVsdExhbmcgPSBsYW5nO1xuICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZS5lbWl0KHtsYW5nOiBsYW5nLCB0cmFuc2xhdGlvbnM6IHRoaXMudHJhbnNsYXRpb25zW2xhbmddfSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIHRvIHJlbG9hZCB0aGUgbGFuZyBmaWxlIGZyb20gdGhlIGZpbGVcbiAgICovXG4gIHB1YmxpYyByZWxvYWRMYW5nKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5yZXNldExhbmcobGFuZyk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZyk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBpbm5lciB0cmFuc2xhdGlvblxuICAgKi9cbiAgcHVibGljIHJlc2V0TGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl90cmFuc2xhdGlvblJlcXVlc3RzW2xhbmddID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxhbmd1YWdlIGNvZGUgbmFtZSBmcm9tIHRoZSBicm93c2VyLCBlLmcuIFwiZGVcIlxuICAgKi9cbiAgcHVibGljIGdldEJyb3dzZXJMYW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgYnJvd3Nlckxhbmc6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzID8gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBudWxsO1xuICAgIGJyb3dzZXJMYW5nID0gYnJvd3NlckxhbmcgfHwgd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLmJyb3dzZXJMYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLnVzZXJMYW5ndWFnZTtcblxuICAgIGlmIChicm93c2VyTGFuZy5pbmRleE9mKCctJykgIT09IC0xKSB7XG4gICAgICBicm93c2VyTGFuZyA9IGJyb3dzZXJMYW5nLnNwbGl0KCctJylbMF07XG4gICAgfVxuXG4gICAgaWYgKGJyb3dzZXJMYW5nLmluZGV4T2YoJ18nKSAhPT0gLTEpIHtcbiAgICAgIGJyb3dzZXJMYW5nID0gYnJvd3Nlckxhbmcuc3BsaXQoJ18nKVswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnJvd3Nlckxhbmc7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VsdHVyZSBsYW5ndWFnZSBjb2RlIG5hbWUgZnJvbSB0aGUgYnJvd3NlciwgZS5nLiBcImRlLURFXCJcbiAgICovXG4gIHB1YmxpYyBnZXRCcm93c2VyQ3VsdHVyZUxhbmcoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGxldCBicm93c2VyQ3VsdHVyZUxhbmc6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzID8gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBudWxsO1xuICAgIGJyb3dzZXJDdWx0dXJlTGFuZyA9IGJyb3dzZXJDdWx0dXJlTGFuZyB8fCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckxhbmd1YWdlO1xuXG4gICAgcmV0dXJuIGJyb3dzZXJDdWx0dXJlTGFuZztcbiAgfVxuXG4gIHB1YmxpYyB0cmlnZ2VyQ2hhbmdlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdWJUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3N1YlRpbWVyKTtcbiAgICB9XG4gICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuX3N1YlRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgfSwxMDAwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVmYXVsdExhbmdDaGFuZ2VFdmVudCwgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlLCBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50fSBmcm9tICcuL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7ZXF1YWxzLCBpc0RlZmluZWR9IGZyb20gJy4vdXRpbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0cmFuc2xhdGVdLFtuZ3gtdHJhbnNsYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAga2V5OiBzdHJpbmc7XG4gIGxhc3RQYXJhbXM6IGFueTtcbiAgY3VycmVudFBhcmFtczogYW55O1xuICBvbkxhbmdDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbjtcbiAgb25EZWZhdWx0TGFuZ0NoYW5nZVN1YjogU3Vic2NyaXB0aW9uO1xuICBvblRyYW5zbGF0aW9uQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgc2V0IHRyYW5zbGF0ZShrZXk6IHN0cmluZykge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgdGhpcy5jaGVja05vZGVzKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgc2V0IHRyYW5zbGF0ZVBhcmFtcyhwYXJhbXM6IGFueSkge1xuICAgIGlmICghZXF1YWxzKHRoaXMuY3VycmVudFBhcmFtcywgcGFyYW1zKSkge1xuICAgICAgdGhpcy5jdXJyZW50UGFyYW1zID0gcGFyYW1zO1xuICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBvZiB0aGUgY3VycmVudCBsYW5nIGNoYW5nZVxuICAgIGlmICghdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2VTdWIgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uub25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5sYW5nID09PSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmcpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrTm9kZXModHJ1ZSwgZXZlbnQudHJhbnNsYXRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uTGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgbGFuZ3VhZ2UgY2hhbmdlc1xuICAgIGlmICghdGhpcy5vbkxhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlU3ViID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUsIGV2ZW50LnRyYW5zbGF0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25EZWZhdWx0TGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgZGVmYXVsdCBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZVN1YiA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5vbkRlZmF1bHRMYW5nQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLmNoZWNrTm9kZXMoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja05vZGVzKGZvcmNlVXBkYXRlID0gZmFsc2UsIHRyYW5zbGF0aW9ucz86IGFueSkge1xuICAgIGxldCBub2RlczogTm9kZUxpc3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIC8vIGlmIHRoZSBlbGVtZW50IGlzIGVtcHR5XG4gICAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICAgIC8vIHdlIGFkZCB0aGUga2V5IGFzIGNvbnRlbnRcbiAgICAgIHRoaXMuc2V0Q29udGVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5rZXkpO1xuICAgICAgbm9kZXMgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgbm9kZTogYW55ID0gbm9kZXNbaV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykgeyAvLyBub2RlIHR5cGUgMyBpcyBhIHRleHQgbm9kZVxuICAgICAgICBsZXQga2V5OiBzdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgICAgIGtleSA9IHRoaXMua2V5O1xuICAgICAgICAgIGlmIChmb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgbm9kZS5sYXN0S2V5ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQobm9kZSk7XG4gICAgICAgICAgbGV0IHRyaW1tZWRDb250ZW50ID0gY29udGVudC50cmltKCk7XG4gICAgICAgICAgaWYgKHRyaW1tZWRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gd2Ugd2FudCB0byB1c2UgdGhlIGNvbnRlbnQgYXMgYSBrZXksIG5vdCB0aGUgdHJhbnNsYXRpb24gdmFsdWVcbiAgICAgICAgICAgIGlmIChjb250ZW50ICE9PSBub2RlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICBrZXkgPSB0cmltbWVkQ29udGVudDtcbiAgICAgICAgICAgICAgLy8gdGhlIGNvbnRlbnQgd2FzIGNoYW5nZWQgZnJvbSB0aGUgdXNlciwgd2UnbGwgdXNlIGl0IGFzIGEgcmVmZXJlbmNlIGlmIG5lZWRlZFxuICAgICAgICAgICAgICBub2RlLm9yaWdpbmFsQ29udGVudCA9IHRoaXMuZ2V0Q29udGVudChub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5vcmlnaW5hbENvbnRlbnQgJiYgZm9yY2VVcGRhdGUpIHsgLy8gdGhlIGNvbnRlbnQgc2VlbXMgb2ssIGJ1dCB0aGUgbGFuZyBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgICBub2RlLmxhc3RLZXkgPSBudWxsO1xuICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBjb250ZW50IGlzIHRoZSB0cmFuc2xhdGlvbiwgbm90IHRoZSBrZXksIHVzZSB0aGUgbGFzdCByZWFsIGNvbnRlbnQgYXMga2V5XG4gICAgICAgICAgICAgIGtleSA9IG5vZGUub3JpZ2luYWxDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShrZXksIG5vZGUsIHRyYW5zbGF0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoa2V5OiBzdHJpbmcsIG5vZGU6IGFueSwgdHJhbnNsYXRpb25zOiBhbnkpIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAobm9kZS5sYXN0S2V5ID09PSBrZXkgJiYgdGhpcy5sYXN0UGFyYW1zID09PSB0aGlzLmN1cnJlbnRQYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RQYXJhbXMgPSB0aGlzLmN1cnJlbnRQYXJhbXM7XG5cbiAgICAgIGxldCBvblRyYW5zbGF0aW9uID0gKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChyZXMgIT09IGtleSkge1xuICAgICAgICAgIG5vZGUubGFzdEtleSA9IGtleTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5vZGUub3JpZ2luYWxDb250ZW50KSB7XG4gICAgICAgICAgbm9kZS5vcmlnaW5hbENvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5jdXJyZW50VmFsdWUgPSBpc0RlZmluZWQocmVzKSA/IHJlcyA6IChub2RlLm9yaWdpbmFsQ29udGVudCB8fCBrZXkpO1xuICAgICAgICAvLyB3ZSByZXBsYWNlIGluIHRoZSBvcmlnaW5hbCBjb250ZW50IHRvIHByZXNlcnZlIHNwYWNlcyB0aGF0IHdlIG1pZ2h0IGhhdmUgdHJpbW1lZFxuICAgICAgICB0aGlzLnNldENvbnRlbnQobm9kZSwgdGhpcy5rZXkgPyBub2RlLmN1cnJlbnRWYWx1ZSA6IG5vZGUub3JpZ2luYWxDb250ZW50LnJlcGxhY2Uoa2V5LCBub2RlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoaXNEZWZpbmVkKHRyYW5zbGF0aW9ucykpIHtcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrZXksIHRoaXMuY3VycmVudFBhcmFtcyk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmVzLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvblRyYW5zbGF0aW9uKHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoa2V5LCB0aGlzLmN1cnJlbnRQYXJhbXMpLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRDb250ZW50KG5vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzRGVmaW5lZChub2RlLnRleHRDb250ZW50KSA/IG5vZGUudGV4dENvbnRlbnQgOiBub2RlLmRhdGE7XG4gIH1cblxuICBzZXRDb250ZW50KG5vZGU6IGFueSwgY29udGVudDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzRGVmaW5lZChub2RlLnRleHRDb250ZW50KSkge1xuICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUuZGF0YSA9IGNvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMub25MYW5nQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFBpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50LCBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UsIFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnR9IGZyb20gJy4vdHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHtlcXVhbHMsIGlzRGVmaW5lZH0gZnJvbSAnLi91dGlsJztcblxuQEluamVjdGFibGUoKVxuQFBpcGUoe1xuICBuYW1lOiAndHJhbnNsYXRlJyxcbiAgcHVyZTogZmFsc2UgLy8gcmVxdWlyZWQgdG8gdXBkYXRlIHRoZSB2YWx1ZSB3aGVuIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIGxhc3RLZXk6IHN0cmluZztcbiAgbGFzdFBhcmFtczogYW55W107XG4gIG9uVHJhbnNsYXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PjtcbiAgb25MYW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PjtcbiAgb25EZWZhdWx0TGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICB1cGRhdGVWYWx1ZShrZXk6IHN0cmluZywgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QsIHRyYW5zbGF0aW9ucz86IGFueSk6IHZvaWQge1xuICAgIGxldCBvblRyYW5zbGF0aW9uID0gKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnZhbHVlID0gcmVzICE9PSB1bmRlZmluZWQgPyByZXMgOiBrZXk7XG4gICAgICB0aGlzLmxhc3RLZXkgPSBrZXk7XG4gICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfTtcbiAgICBpZiAodHJhbnNsYXRpb25zKSB7XG4gICAgICBsZXQgcmVzID0gdGhpcy50cmFuc2xhdGUuZ2V0UGFyc2VkUmVzdWx0KHRyYW5zbGF0aW9ucywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVHJhbnNsYXRpb24ocmVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmFuc2xhdGUuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgfVxuXG4gIHRyYW5zZm9ybShxdWVyeTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKCFxdWVyeSB8fCBxdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSBhc2sgYW5vdGhlciB0aW1lIGZvciB0aGUgc2FtZSBrZXksIHJldHVybiB0aGUgbGFzdCB2YWx1ZVxuICAgIGlmIChlcXVhbHMocXVlcnksIHRoaXMubGFzdEtleSkgJiYgZXF1YWxzKGFyZ3MsIHRoaXMubGFzdFBhcmFtcykpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGxldCBpbnRlcnBvbGF0ZVBhcmFtczogT2JqZWN0O1xuICAgIGlmIChpc0RlZmluZWQoYXJnc1swXSkgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgJiYgYXJnc1swXS5sZW5ndGgpIHtcbiAgICAgICAgLy8gd2UgYWNjZXB0IG9iamVjdHMgd3JpdHRlbiBpbiB0aGUgdGVtcGxhdGUgc3VjaCBhcyB7bjoxfSwgeyduJzoxfSwge246J3YnfVxuICAgICAgICAvLyB3aGljaCBpcyB3aHkgd2UgbWlnaHQgbmVlZCB0byBjaGFuZ2UgaXQgdG8gcmVhbCBKU09OIG9iamVjdHMgc3VjaCBhcyB7XCJuXCI6MX0gb3Ige1wiblwiOlwidlwifVxuICAgICAgICBsZXQgdmFsaWRBcmdzOiBzdHJpbmcgPSBhcmdzWzBdXG4gICAgICAgICAgLnJlcGxhY2UoLyhcXCcpPyhbYS16QS1aMC05X10rKShcXCcpPyhcXHMpPzovZywgJ1wiJDJcIjonKVxuICAgICAgICAgIC5yZXBsYWNlKC86KFxccyk/KFxcJykoLio/KShcXCcpL2csICc6XCIkM1wiJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBKU09OLnBhcnNlKHZhbGlkQXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFdyb25nIHBhcmFtZXRlciBpbiBUcmFuc2xhdGVQaXBlLiBFeHBlY3RlZCBhIHZhbGlkIE9iamVjdCwgcmVjZWl2ZWQ6ICR7YXJnc1swXX1gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBhcmdzWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN0b3JlIHRoZSBxdWVyeSwgaW4gY2FzZSBpdCBjaGFuZ2VzXG4gICAgdGhpcy5sYXN0S2V5ID0gcXVlcnk7XG5cbiAgICAvLyBzdG9yZSB0aGUgcGFyYW1zLCBpbiBjYXNlIHRoZXkgY2hhbmdlXG4gICAgdGhpcy5sYXN0UGFyYW1zID0gYXJncztcblxuICAgIC8vIHNldCB0aGUgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKHF1ZXJ5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIHN1YnNjcmlwdGlvbiB0byBvbkxhbmdDaGFuZ2UsIGNsZWFuIGl0XG4gICAgdGhpcy5fZGlzcG9zZSgpO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBjaGFuZ2VcbiAgICBpZiAoIXRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSkge1xuICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlID0gdGhpcy50cmFuc2xhdGUub25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RLZXkgJiYgZXZlbnQubGFuZyA9PT0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpIHtcbiAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsO1xuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25MYW5nQ2hhbmdlIGV2ZW50LCBpbiBjYXNlIHRoZSBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uTGFuZ0NoYW5nZSkge1xuICAgICAgdGhpcy5vbkxhbmdDaGFuZ2UgPSB0aGlzLnRyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RLZXkpIHtcbiAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsOyAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSB1bnRpbCBpdCdzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25EZWZhdWx0TGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgZGVmYXVsdCBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHRoaXMudHJhbnNsYXRlLm9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGFzdEtleSkge1xuICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7IC8vIHdlIHdhbnQgdG8gbWFrZSBzdXJlIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIHVudGlsIGl0J3MgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShxdWVyeSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiBhbnkgZXhpc3Rpbmcgc3Vic2NyaXB0aW9uIHRvIGNoYW5nZSBldmVudHNcbiAgICovXG4gIHByaXZhdGUgX2Rpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uTGFuZ0NoYW5nZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNwb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZUZha2VMb2FkZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUubG9hZGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuc2VydmljZVwiO1xuaW1wb3J0IHtNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCBGYWtlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcn0gZnJvbSBcIi4vbGliL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVQYXJzZXIsIFRyYW5zbGF0ZURlZmF1bHRQYXJzZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUucGFyc2VyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZUNvbXBpbGVyLCBUcmFuc2xhdGVGYWtlQ29tcGlsZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuY29tcGlsZXJcIjtcbmltcG9ydCB7VHJhbnNsYXRlRGlyZWN0aXZlfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVQaXBlfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnBpcGVcIjtcbmltcG9ydCB7VHJhbnNsYXRlU3RvcmV9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuc3RvcmVcIjtcbmltcG9ydCB7VVNFX1NUT1JFfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnNlcnZpY2VcIjtcbmltcG9ydCB7VVNFX0RFRkFVTFRfTEFOR30gZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5zZXJ2aWNlXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL2xpYi90cmFuc2xhdGUubG9hZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnNlcnZpY2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi9taXNzaW5nLXRyYW5zbGF0aW9uLWhhbmRsZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi90cmFuc2xhdGUucGFyc2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmNvbXBpbGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmRpcmVjdGl2ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5waXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnN0b3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRlTW9kdWxlQ29uZmlnIHtcbiAgbG9hZGVyPzogUHJvdmlkZXI7XG4gIGNvbXBpbGVyPzogUHJvdmlkZXI7XG4gIHBhcnNlcj86IFByb3ZpZGVyO1xuICBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyPzogUHJvdmlkZXI7XG4gIC8vIGlzb2xhdGUgdGhlIHNlcnZpY2UgaW5zdGFuY2UsIG9ubHkgd29ya3MgZm9yIGxhenkgbG9hZGVkIG1vZHVsZXMgb3IgY29tcG9uZW50cyB3aXRoIHRoZSBcInByb3ZpZGVyc1wiIHByb3BlcnR5XG4gIGlzb2xhdGU/OiBib29sZWFuO1xuICB1c2VEZWZhdWx0TGFuZz86IGJvb2xlYW47XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRyYW5zbGF0ZVBpcGUsXG4gICAgVHJhbnNsYXRlRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUcmFuc2xhdGVQaXBlLFxuICAgIFRyYW5zbGF0ZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZU1vZHVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgaW4geW91ciByb290IG1vZHVsZSB0byBwcm92aWRlIHRoZSBUcmFuc2xhdGVTZXJ2aWNlXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFRyYW5zbGF0ZU1vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUcmFuc2xhdGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgY29uZmlnLmxvYWRlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLCB1c2VDbGFzczogVHJhbnNsYXRlRmFrZUxvYWRlcn0sXG4gICAgICAgIGNvbmZpZy5jb21waWxlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlQ29tcGlsZXIsIHVzZUNsYXNzOiBUcmFuc2xhdGVGYWtlQ29tcGlsZXJ9LFxuICAgICAgICBjb25maWcucGFyc2VyIHx8IHtwcm92aWRlOiBUcmFuc2xhdGVQYXJzZXIsIHVzZUNsYXNzOiBUcmFuc2xhdGVEZWZhdWx0UGFyc2VyfSxcbiAgICAgICAgY29uZmlnLm1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgfHwge3Byb3ZpZGU6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIHVzZUNsYXNzOiBGYWtlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcn0sXG4gICAgICAgIFRyYW5zbGF0ZVN0b3JlLFxuICAgICAgICB7cHJvdmlkZTogVVNFX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLmlzb2xhdGV9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX0RFRkFVTFRfTEFORywgdXNlVmFsdWU6IGNvbmZpZy51c2VEZWZhdWx0TGFuZ30sXG4gICAgICAgIFRyYW5zbGF0ZVNlcnZpY2VcbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpbiB5b3VyIG90aGVyIChub24gcm9vdCkgbW9kdWxlcyB0byBpbXBvcnQgdGhlIGRpcmVjdGl2ZS9waXBlXG4gICAqL1xuICBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnOiBUcmFuc2xhdGVNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVHJhbnNsYXRlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIGNvbmZpZy5sb2FkZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlciwgdXNlQ2xhc3M6IFRyYW5zbGF0ZUZha2VMb2FkZXJ9LFxuICAgICAgICBjb25maWcuY29tcGlsZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZUNvbXBpbGVyLCB1c2VDbGFzczogVHJhbnNsYXRlRmFrZUNvbXBpbGVyfSxcbiAgICAgICAgY29uZmlnLnBhcnNlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlUGFyc2VyLCB1c2VDbGFzczogVHJhbnNsYXRlRGVmYXVsdFBhcnNlcn0sXG4gICAgICAgIGNvbmZpZy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHx8IHtwcm92aWRlOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCB1c2VDbGFzczogRmFrZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJ9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLmlzb2xhdGV9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX0RFRkFVTFRfTEFORywgdXNlVmFsdWU6IGNvbmZpZy51c2VEZWZhdWx0TGFuZ30sXG4gICAgICAgIFRyYW5zbGF0ZVNlcnZpY2VcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQTs7OztJQUFBO0tBRUM7SUFBRCxzQkFBQztDQUFBLElBQUE7Ozs7QUFLRDtJQUN5Q0EsdUNBQWU7SUFEeEQ7O0tBS0M7Ozs7O0lBSEMsNENBQWM7Ozs7SUFBZCxVQUFlLElBQVk7UUFDekIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDZjs7Z0JBSkYsVUFBVTs7SUFLWCwwQkFBQztDQUFBLENBSndDLGVBQWU7Ozs7OztBQ1h4RDs7O0FBb0JBOzs7O0lBQUE7S0FXQztJQUFELGdDQUFDO0NBQUEsSUFBQTs7OztBQUtEO0lBQUE7S0FLQzs7Ozs7SUFIQyw4Q0FBTTs7OztJQUFOLFVBQU8sTUFBdUM7UUFDNUMsT0FBTyxNQUFN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