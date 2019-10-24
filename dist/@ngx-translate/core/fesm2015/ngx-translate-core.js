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
class TranslateLoader {
}
/**
 * This loader is just a placeholder that does nothing, in case you don't need a loader at all
 */
class TranslateFakeLoader extends TranslateLoader {
    /**
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        return of({});
    }
}
TranslateFakeLoader.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class MissingTranslationHandler {
}
/**
 * This handler is just a placeholder that does nothing, in case you don't need a missing translation handler at all
 */
class FakeMissingTranslationHandler {
    /**
     * @param {?} params
     * @return {?}
     */
    handle(params) {
        return params.key;
    }
}
FakeMissingTranslationHandler.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class TranslateCompiler {
}
/**
 * This compiler is just a placeholder that does nothing, in case you don't need a compiler at all
 */
class TranslateFakeCompiler extends TranslateCompiler {
    /**
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    compile(value, lang) {
        return value;
    }
    /**
     * @param {?} translations
     * @param {?} lang
     * @return {?}
     */
    compileTranslations(translations, lang) {
        return translations;
    }
}
TranslateFakeCompiler.decorators = [
    { type: Injectable }
];

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
    let t1 = typeof o1;
    /** @type {?} */
    let t2 = typeof o2;
    /** @type {?} */
    let length;
    /** @type {?} */
    let key;
    /** @type {?} */
    let keySet;
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
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                }
                else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            }
            else {
                Object.assign(output, { [key]: source[key] });
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
class TranslateParser {
}
class TranslateDefaultParser extends TranslateParser {
    constructor() {
        super(...arguments);
        this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    }
    /**
     * @param {?} expr
     * @param {?=} params
     * @return {?}
     */
    interpolate(expr, params) {
        /** @type {?} */
        let result;
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
    }
    /**
     * @param {?} target
     * @param {?} key
     * @return {?}
     */
    getValue(target, key) {
        /** @type {?} */
        let keys = key.split('.');
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
    }
    /**
     * @param {?} fn
     * @param {?=} params
     * @return {?}
     */
    interpolateFunction(fn, params) {
        return fn(params);
    }
    /**
     * @param {?} expr
     * @param {?=} params
     * @return {?}
     */
    interpolateString(expr, params) {
        if (!params) {
            return expr;
        }
        return expr.replace(this.templateMatcher, (substring, b) => {
            /** @type {?} */
            let r = this.getValue(params, b);
            return isDefined(r) ? r : substring;
        });
    }
}
TranslateDefaultParser.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TranslateStore {
    constructor() {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const USE_STORE = new InjectionToken('USE_STORE');
/** @type {?} */
const USE_DEFAULT_LANG = new InjectionToken('USE_DEFAULT_LANG');
class TranslateService {
    /**
     *
     * @param {?} store an instance of the store (that is supposed to be unique)
     * @param {?} currentLoader An instance of the loader currently used
     * @param {?} compiler An instance of the compiler currently used
     * @param {?} parser An instance of the parser currently used
     * @param {?} missingTranslationHandler A handler for missing translations.
     * @param {?=} useDefaultLang whether we should use default language translation when current language translation is missing.
     * @param {?=} isolate whether this service should use the store or not
     */
    constructor(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang = true, isolate = false) {
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
    /**
     * An EventEmitter to listen to translation change events
     * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
     *     // do something
     * });
     * @return {?}
     */
    get onTranslationChange() {
        return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
    }
    /**
     * An EventEmitter to listen to lang change events
     * onLangChange.subscribe((params: LangChangeEvent) => {
     *     // do something
     * });
     * @return {?}
     */
    get onLangChange() {
        return this.isolate ? this._onLangChange : this.store.onLangChange;
    }
    /**
     * An EventEmitter to listen to default lang change events
     * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
     *     // do something
     * });
     * @return {?}
     */
    get onDefaultLangChange() {
        return this.isolate ? this._onDefaultLangChange : this.store.onDefaultLangChange;
    }
    /**
     * The default lang to fallback when translations are missing on the current lang
     * @return {?}
     */
    get defaultLang() {
        return this.isolate ? this._defaultLang : this.store.defaultLang;
    }
    /**
     * @param {?} defaultLang
     * @return {?}
     */
    set defaultLang(defaultLang) {
        if (this.isolate) {
            this._defaultLang = defaultLang;
        }
        else {
            this.store.defaultLang = defaultLang;
        }
    }
    /**
     * The lang currently used
     * @return {?}
     */
    get currentLang() {
        return this.isolate ? this._currentLang : this.store.currentLang;
    }
    /**
     * @param {?} currentLang
     * @return {?}
     */
    set currentLang(currentLang) {
        if (this.isolate) {
            this._currentLang = currentLang;
        }
        else {
            this.store.currentLang = currentLang;
        }
    }
    /**
     * an array of langs
     * @return {?}
     */
    get langs() {
        return this.isolate ? this._langs : this.store.langs;
    }
    /**
     * @param {?} langs
     * @return {?}
     */
    set langs(langs) {
        if (this.isolate) {
            this._langs = langs;
        }
        else {
            this.store.langs = langs;
        }
    }
    /**
     * a list of translations per lang
     * @return {?}
     */
    get translations() {
        return this.isolate ? this._translations : this.store.translations;
    }
    /**
     * @param {?} translations
     * @return {?}
     */
    set translations(translations) {
        if (this.isolate) {
            this._translations = translations;
        }
        else {
            this.store.translations = translations;
        }
    }
    /**
     * Sets the default language to use as a fallback
     * @param {?} lang
     * @return {?}
     */
    setDefaultLang(lang) {
        if (lang === this.defaultLang) {
            return;
        }
        /** @type {?} */
        let pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the defaultLang immediately
            if (!this.defaultLang) {
                this.defaultLang = lang;
            }
            pending.pipe(take(1))
                .subscribe((res) => {
                this.changeDefaultLang(lang);
            });
        }
        else { // we already have this language
            this.changeDefaultLang(lang);
        }
    }
    /**
     * Gets the default language used
     * @return {?}
     */
    getDefaultLang() {
        return this.defaultLang;
    }
    /**
     * Changes the lang currently used
     * @param {?} lang
     * @return {?}
     */
    use(lang) {
        // don't change the language if the language given is already selected
        if (lang === this.currentLang) {
            return of(this.translations[lang]);
        }
        /** @type {?} */
        let pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the currentLang immediately
            if (!this.currentLang) {
                this.currentLang = lang;
            }
            pending.pipe(take(1))
                .subscribe((res) => {
                this.changeLang(lang);
            });
            return pending;
        }
        else { // we have this language, return an Observable
            this.changeLang(lang);
            return of(this.translations[lang]);
        }
    }
    /**
     * Retrieves the given translations
     * @param {?} lang
     * @return {?}
     */
    retrieveTranslations(lang) {
        /** @type {?} */
        let pending;
        // if this language is unavailable, ask for it
        if (typeof this.translations[lang] === "undefined") {
            this._translationRequests[lang] = this._translationRequests[lang] || this.getTranslation(lang);
            pending = this._translationRequests[lang];
        }
        return pending;
    }
    /**
     * Gets an object of translations for a given language with the current loader
     * and passes it through the compiler
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        this.pending = true;
        /** @type {?} */
        const loadingTranslations = this.currentLoader.getTranslation(lang).pipe(share());
        this.loadingTranslations = loadingTranslations.pipe(take(1), map((res) => this.compiler.compileTranslations(res, lang)), share());
        this.loadingTranslations
            .subscribe((res) => {
            this.translations[lang] = res;
            this.updateLangs();
            this.pending = false;
        }, (err) => {
            this.pending = false;
        });
        return loadingTranslations;
    }
    /**
     * Manually sets an object of translations for a given language
     * after passing it through the compiler
     * @param {?} lang
     * @param {?} translations
     * @param {?=} shouldMerge
     * @return {?}
     */
    setTranslation(lang, translations, shouldMerge = false) {
        translations = this.compiler.compileTranslations(translations, lang);
        if (shouldMerge && this.translations[lang]) {
            this.translations[lang] = mergeDeep(this.translations[lang], translations);
        }
        else {
            this.translations[lang] = translations;
        }
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    }
    /**
     * Returns an array of currently available langs
     * @return {?}
     */
    getLangs() {
        return this.langs;
    }
    /**
     * Add available langs
     * @param {?} langs
     * @return {?}
     */
    addLangs(langs) {
        langs.forEach((lang) => {
            if (this.langs.indexOf(lang) === -1) {
                this.langs.push(lang);
            }
        });
    }
    /**
     * Update the list of available langs
     * @return {?}
     */
    updateLangs() {
        this.addLangs(Object.keys(this.translations));
    }
    /**
     * Returns the parsed result of the translations
     * @param {?} translations
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    getParsedResult(translations, key, interpolateParams) {
        /** @type {?} */
        let res;
        if (key instanceof Array) {
            /** @type {?} */
            let result = {};
            /** @type {?} */
            let observables = false;
            for (let k of key) {
                result[k] = this.getParsedResult(translations, k, interpolateParams);
                if (typeof result[k].subscribe === "function") {
                    observables = true;
                }
            }
            if (observables) {
                /** @type {?} */
                let mergedObs;
                for (let k of key) {
                    /** @type {?} */
                    let obs = typeof result[k].subscribe === "function" ? result[k] : of((/** @type {?} */ (result[k])));
                    if (typeof mergedObs === "undefined") {
                        mergedObs = obs;
                    }
                    else {
                        mergedObs = merge(mergedObs, obs);
                    }
                }
                return mergedObs.pipe(toArray(), map((arr) => {
                    /** @type {?} */
                    let obj = {};
                    arr.forEach((value, index) => {
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
            let params = { key, translateService: this };
            if (typeof interpolateParams !== 'undefined') {
                params.interpolateParams = interpolateParams;
            }
            res = this.missingTranslationHandler.handle(params);
        }
        return typeof res !== "undefined" ? res : key;
    }
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} the translated key, or an object of translated keys
     */
    get(key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error(`Parameter "key" required`);
        }
        // check if we are loading a new translation to use
        if (this.pending) {
            return Observable.create((observer) => {
                /** @type {?} */
                let onComplete = (res) => {
                    observer.next(res);
                    observer.complete();
                };
                /** @type {?} */
                let onError = (err) => {
                    observer.error(err);
                };
                this.loadingTranslations.subscribe((res) => {
                    res = this.getParsedResult(res, key, interpolateParams);
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
            let res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            if (typeof res.subscribe === "function") {
                return res;
            }
            else {
                return of(res);
            }
        }
    }
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the language changes.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} A stream of the translated key, or an object of translated keys
     */
    stream(key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error(`Parameter "key" required`);
        }
        return concat(this.get(key, interpolateParams), this.onLangChange.pipe(switchMap((event) => {
            /** @type {?} */
            const res = this.getParsedResult(event.translations, key, interpolateParams);
            if (typeof res.subscribe === "function") {
                return res;
            }
            else {
                return of(res);
            }
        })));
    }
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    instant(key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error(`Parameter "key" required`);
        }
        /** @type {?} */
        let res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
        if (typeof res.subscribe !== "undefined") {
            if (key instanceof Array) {
                /** @type {?} */
                let obj = {};
                key.forEach((value, index) => {
                    obj[key[index]] = key[index];
                });
                return obj;
            }
            return key;
        }
        else {
            return res;
        }
    }
    /**
     * Sets the translated value of a key, after compiling it
     * @param {?} key
     * @param {?} value
     * @param {?=} lang
     * @return {?}
     */
    set(key, value, lang = this.currentLang) {
        this.translations[lang][key] = this.compiler.compile(value, lang);
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    }
    /**
     * Changes the current lang
     * @param {?} lang
     * @return {?}
     */
    changeLang(lang) {
        this.currentLang = lang;
        this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
        // if there is no default lang, use the one that we just set
        if (!this.defaultLang) {
            this.changeDefaultLang(lang);
        }
    }
    /**
     * Changes the default lang
     * @param {?} lang
     * @return {?}
     */
    changeDefaultLang(lang) {
        this.defaultLang = lang;
        this.onDefaultLangChange.emit({ lang: lang, translations: this.translations[lang] });
    }
    /**
     * Allows to reload the lang file from the file
     * @param {?} lang
     * @return {?}
     */
    reloadLang(lang) {
        this.resetLang(lang);
        return this.getTranslation(lang);
    }
    /**
     * Deletes inner translation
     * @param {?} lang
     * @return {?}
     */
    resetLang(lang) {
        this._translationRequests[lang] = undefined;
        this.translations[lang] = undefined;
    }
    /**
     * Returns the language code name from the browser, e.g. "de"
     * @return {?}
     */
    getBrowserLang() {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        /** @type {?} */
        let browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }
        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }
        return browserLang;
    }
    /**
     * Returns the culture language code name from the browser, e.g. "de-DE"
     * @return {?}
     */
    getBrowserCultureLang() {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        /** @type {?} */
        let browserCultureLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserCultureLang = browserCultureLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        return browserCultureLang;
    }
    /**
     * @return {?}
     */
    triggerChange() {
        if (this._subTimer) {
            clearTimeout(this._subTimer);
        }
        this._isActive = true;
        this._subTimer = setTimeout(() => {
            this._isActive = false;
        }, 1000);
    }
}
TranslateService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TranslateService.ctorParameters = () => [
    { type: TranslateStore },
    { type: TranslateLoader },
    { type: TranslateCompiler },
    { type: TranslateParser },
    { type: MissingTranslationHandler },
    { type: Boolean, decorators: [{ type: Inject, args: [USE_DEFAULT_LANG,] }] },
    { type: Boolean, decorators: [{ type: Inject, args: [USE_STORE,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TranslateDirective {
    /**
     * @param {?} translateService
     * @param {?} element
     * @param {?} _ref
     */
    constructor(translateService, element, _ref) {
        this.translateService = translateService;
        this.element = element;
        this._ref = _ref;
        // subscribe to onTranslationChange event, in case the translations of the current lang change
        if (!this.onTranslationChangeSub) {
            this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe((event) => {
                if (event.lang === this.translateService.currentLang) {
                    this.checkNodes(true, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChangeSub) {
            this.onLangChangeSub = this.translateService.onLangChange.subscribe((event) => {
                this.checkNodes(true, event.translations);
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe((event) => {
                this.checkNodes(true);
            });
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    set translate(key) {
        if (key) {
            this.key = key;
            this.checkNodes();
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    set translateParams(params) {
        if (!equals(this.currentParams, params)) {
            this.currentParams = params;
            this.checkNodes(true);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.translateService._isActive) {
            this.checkNodes();
        }
    }
    /**
     * @param {?=} forceUpdate
     * @param {?=} translations
     * @return {?}
     */
    checkNodes(forceUpdate = false, translations) {
        /** @type {?} */
        let nodes = this.element.nativeElement.childNodes;
        // if the element is empty
        if (!nodes.length) {
            // we add the key as content
            this.setContent(this.element.nativeElement, this.key);
            nodes = this.element.nativeElement.childNodes;
        }
        for (let i = 0; i < nodes.length; ++i) {
            /** @type {?} */
            let node = nodes[i];
            if (node.nodeType === 3) { // node type 3 is a text node
                // node type 3 is a text node
                /** @type {?} */
                let key;
                if (this.key) {
                    key = this.key;
                    if (forceUpdate) {
                        node.lastKey = null;
                    }
                }
                else {
                    /** @type {?} */
                    let content = this.getContent(node);
                    /** @type {?} */
                    let trimmedContent = content.trim();
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
    }
    /**
     * @param {?} key
     * @param {?} node
     * @param {?} translations
     * @return {?}
     */
    updateValue(key, node, translations) {
        if (key) {
            if (node.lastKey === key && this.lastParams === this.currentParams) {
                return;
            }
            this.lastParams = this.currentParams;
            /** @type {?} */
            let onTranslation = (res) => {
                if (res !== key) {
                    node.lastKey = key;
                }
                if (!node.originalContent) {
                    node.originalContent = this.getContent(node);
                }
                node.currentValue = isDefined(res) ? res : (node.originalContent || key);
                // we replace in the original content to preserve spaces that we might have trimmed
                this.setContent(node, this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
                this._ref.markForCheck();
            };
            if (isDefined(translations)) {
                /** @type {?} */
                let res = this.translateService.getParsedResult(translations, key, this.currentParams);
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
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getContent(node) {
        return isDefined(node.textContent) ? node.textContent : node.data;
    }
    /**
     * @param {?} node
     * @param {?} content
     * @return {?}
     */
    setContent(node, content) {
        if (isDefined(node.textContent)) {
            node.textContent = content;
        }
        else {
            node.data = content;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.onLangChangeSub) {
            this.onLangChangeSub.unsubscribe();
        }
        if (this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub.unsubscribe();
        }
        if (this.onTranslationChangeSub) {
            this.onTranslationChangeSub.unsubscribe();
        }
    }
}
TranslateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[translate],[ngx-translate]'
            },] }
];
/** @nocollapse */
TranslateDirective.ctorParameters = () => [
    { type: TranslateService },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
TranslateDirective.propDecorators = {
    translate: [{ type: Input }],
    translateParams: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TranslatePipe {
    /**
     * @param {?} translate
     * @param {?} _ref
     */
    constructor(translate, _ref) {
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
    updateValue(key, interpolateParams, translations) {
        /** @type {?} */
        let onTranslation = (res) => {
            this.value = res !== undefined ? res : key;
            this.lastKey = key;
            this._ref.markForCheck();
        };
        if (translations) {
            /** @type {?} */
            let res = this.translate.getParsedResult(translations, key, interpolateParams);
            if (typeof res.subscribe === 'function') {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this.translate.get(key, interpolateParams).subscribe(onTranslation);
    }
    /**
     * @param {?} query
     * @param {...?} args
     * @return {?}
     */
    transform(query, ...args) {
        if (!query || query.length === 0) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
            return this.value;
        }
        /** @type {?} */
        let interpolateParams;
        if (isDefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                /** @type {?} */
                let validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
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
            this.onTranslationChange = this.translate.onTranslationChange.subscribe((event) => {
                if (this.lastKey && event.lang === this.translate.currentLang) {
                    this.lastKey = null;
                    this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe((event) => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(() => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams);
                }
            });
        }
        return this.value;
    }
    /**
     * Clean any existing subscription to change events
     * @return {?}
     */
    _dispose() {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dispose();
    }
}
TranslatePipe.decorators = [
    { type: Injectable },
    { type: Pipe, args: [{
                name: 'translate',
                pure: false // required to update the value when the promise is resolved
            },] }
];
/** @nocollapse */
TranslatePipe.ctorParameters = () => [
    { type: TranslateService },
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TranslateModule {
    /**
     * Use this method in your root module to provide the TranslateService
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
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
    }
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     * @param {?=} config
     * @return {?}
     */
    static forChild(config = {}) {
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
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { TranslateModule, TranslateLoader, TranslateFakeLoader, USE_STORE, USE_DEFAULT_LANG, TranslateService, MissingTranslationHandler, FakeMissingTranslationHandler, TranslateParser, TranslateDefaultParser, TranslateCompiler, TranslateFakeCompiler, TranslateDirective, TranslatePipe, TranslateStore };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyYW5zbGF0ZS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi90cmFuc2xhdGUubG9hZGVyLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi9taXNzaW5nLXRyYW5zbGF0aW9uLWhhbmRsZXIudHMiLCJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvbGliL3RyYW5zbGF0ZS5jb21waWxlci50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdXRpbC50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLnBhcnNlci50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLnN0b3JlLnRzIiwibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlL2xpYi90cmFuc2xhdGUuc2VydmljZS50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQG5neC10cmFuc2xhdGUvY29yZS9saWIvdHJhbnNsYXRlLnBpcGUudHMiLCJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvcHVibGljX2FwaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJhbnNsYXRlTG9hZGVyIHtcbiAgYWJzdHJhY3QgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+O1xufVxuXG4vKipcbiAqIFRoaXMgbG9hZGVyIGlzIGp1c3QgYSBwbGFjZWhvbGRlciB0aGF0IGRvZXMgbm90aGluZywgaW4gY2FzZSB5b3UgZG9uJ3QgbmVlZCBhIGxvYWRlciBhdCBhbGxcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZUZha2VMb2FkZXIgZXh0ZW5kcyBUcmFuc2xhdGVMb2FkZXIge1xuICBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBvZih7fSk7XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIi4vdHJhbnNsYXRlLnNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zIHtcbiAgLyoqXG4gICAqIHRoZSBrZXkgdGhhdCdzIG1pc3NpbmcgaW4gdHJhbnNsYXRpb24gZmlsZXNcbiAgICovXG4gIGtleTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBhbiBpbnN0YW5jZSBvZiB0aGUgc2VydmljZSB0aGF0IHdhcyB1bmFibGUgdG8gdHJhbnNsYXRlIHRoZSBrZXkuXG4gICAqL1xuICB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlO1xuXG4gIC8qKlxuICAgKiBpbnRlcnBvbGF0aW9uIHBhcmFtcyB0aGF0IHdlcmUgcGFzc2VkIGFsb25nIGZvciB0cmFuc2xhdGluZyB0aGUgZ2l2ZW4ga2V5LlxuICAgKi9cbiAgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3Q7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIG1pc3NpbmcgdHJhbnNsYXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIGNvbnRleHQgZm9yIHJlc29sdmluZyBhIG1pc3NpbmcgdHJhbnNsYXRpb25cbiAgICogQHJldHVybnMgYSB2YWx1ZSBvciBhbiBvYnNlcnZhYmxlXG4gICAqIElmIGl0IHJldHVybnMgYSB2YWx1ZSwgdGhlbiB0aGlzIHZhbHVlIGlzIHVzZWQuXG4gICAqIElmIGl0IHJldHVybiBhbiBvYnNlcnZhYmxlLCB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhpcyBvYnNlcnZhYmxlIHdpbGwgYmUgdXNlZCAoZXhjZXB0IGlmIHRoZSBtZXRob2Qgd2FzIFwiaW5zdGFudFwiKS5cbiAgICogSWYgaXQgZG9lc24ndCByZXR1cm4gdGhlbiB0aGUga2V5IHdpbGwgYmUgdXNlZCBhcyBhIHZhbHVlXG4gICAqL1xuICBhYnN0cmFjdCBoYW5kbGUocGFyYW1zOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zKTogYW55O1xufVxuXG4vKipcbiAqIFRoaXMgaGFuZGxlciBpcyBqdXN0IGEgcGxhY2Vob2xkZXIgdGhhdCBkb2VzIG5vdGhpbmcsIGluIGNhc2UgeW91IGRvbid0IG5lZWQgYSBtaXNzaW5nIHRyYW5zbGF0aW9uIGhhbmRsZXIgYXQgYWxsXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGYWtlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciBpbXBsZW1lbnRzIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIge1xuICBoYW5kbGUocGFyYW1zOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcGFyYW1zLmtleTtcbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJhbnNsYXRlQ29tcGlsZXIge1xuICBhYnN0cmFjdCBjb21waWxlKHZhbHVlOiBzdHJpbmcsIGxhbmc6IHN0cmluZyk6IHN0cmluZyB8IEZ1bmN0aW9uO1xuXG4gIGFic3RyYWN0IGNvbXBpbGVUcmFuc2xhdGlvbnModHJhbnNsYXRpb25zOiBhbnksIGxhbmc6IHN0cmluZyk6IGFueTtcbn1cblxuLyoqXG4gKiBUaGlzIGNvbXBpbGVyIGlzIGp1c3QgYSBwbGFjZWhvbGRlciB0aGF0IGRvZXMgbm90aGluZywgaW4gY2FzZSB5b3UgZG9uJ3QgbmVlZCBhIGNvbXBpbGVyIGF0IGFsbFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlRmFrZUNvbXBpbGVyIGV4dGVuZHMgVHJhbnNsYXRlQ29tcGlsZXIge1xuICBjb21waWxlKHZhbHVlOiBzdHJpbmcsIGxhbmc6IHN0cmluZyk6IHN0cmluZyB8IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBjb21waWxlVHJhbnNsYXRpb25zKHRyYW5zbGF0aW9uczogYW55LCBsYW5nOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0cmFuc2xhdGlvbnM7XG4gIH1cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIERldGVybWluZXMgaWYgdHdvIG9iamVjdHMgb3IgdHdvIHZhbHVlcyBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBUd28gb2JqZWN0cyBvciB2YWx1ZXMgYXJlIGNvbnNpZGVyZWQgZXF1aXZhbGVudCBpZiBhdCBsZWFzdCBvbmUgb2YgdGhlIGZvbGxvd2luZyBpcyB0cnVlOlxuICpcbiAqICogQm90aCBvYmplY3RzIG9yIHZhbHVlcyBwYXNzIGA9PT1gIGNvbXBhcmlzb24uXG4gKiAqIEJvdGggb2JqZWN0cyBvciB2YWx1ZXMgYXJlIG9mIHRoZSBzYW1lIHR5cGUgYW5kIGFsbCBvZiB0aGVpciBwcm9wZXJ0aWVzIGFyZSBlcXVhbCBieVxuICogICBjb21wYXJpbmcgdGhlbSB3aXRoIGBlcXVhbHNgLlxuICpcbiAqIEBwYXJhbSBvMSBPYmplY3Qgb3IgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSBvMiBPYmplY3Qgb3IgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHRydWUgaWYgYXJndW1lbnRzIGFyZSBlcXVhbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhvMTogYW55LCBvMjogYW55KTogYm9vbGVhbiB7XG4gIGlmIChvMSA9PT0gbzIpIHJldHVybiB0cnVlO1xuICBpZiAobzEgPT09IG51bGwgfHwgbzIgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKG8xICE9PSBvMSAmJiBvMiAhPT0gbzIpIHJldHVybiB0cnVlOyAvLyBOYU4gPT09IE5hTlxuICBsZXQgdDEgPSB0eXBlb2YgbzEsIHQyID0gdHlwZW9mIG8yLCBsZW5ndGg6IG51bWJlciwga2V5OiBhbnksIGtleVNldDogYW55O1xuICBpZiAodDEgPT0gdDIgJiYgdDEgPT0gJ29iamVjdCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvMSkpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShvMikpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICgobGVuZ3RoID0gbzEubGVuZ3RoKSA9PSBvMi5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChrZXkgPSAwOyBrZXkgPCBsZW5ndGg7IGtleSsrKSB7XG4gICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobzIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGtleVNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBmb3IgKGtleSBpbiBvMSkge1xuICAgICAgICBpZiAoIWVxdWFscyhvMVtrZXldLCBvMltrZXldKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBrZXlTZXRba2V5XSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3IgKGtleSBpbiBvMikge1xuICAgICAgICBpZiAoIShrZXkgaW4ga2V5U2V0KSAmJiB0eXBlb2YgbzJba2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vKiB0c2xpbnQ6ZW5hYmxlICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGl0ZW0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpOiBhbnkge1xuICBsZXQgb3V0cHV0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0KTtcbiAgaWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaCgoa2V5OiBhbnkpID0+IHtcbiAgICAgIGlmIChpc09iamVjdChzb3VyY2Vba2V5XSkpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHRhcmdldCkpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwge1trZXldOiBzb3VyY2Vba2V5XX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG91dHB1dFtrZXldID0gbWVyZ2VEZWVwKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCB7W2tleV06IHNvdXJjZVtrZXldfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7aXNEZWZpbmVkfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmFuc2xhdGVQYXJzZXIge1xuICAvKipcbiAgICogSW50ZXJwb2xhdGVzIGEgc3RyaW5nIHRvIHJlcGxhY2UgcGFyYW1ldGVyc1xuICAgKiBcIlRoaXMgaXMgYSB7eyBrZXkgfX1cIiA9PT4gXCJUaGlzIGlzIGEgdmFsdWVcIiwgd2l0aCBwYXJhbXMgPSB7IGtleTogXCJ2YWx1ZVwiIH1cbiAgICogQHBhcmFtIGV4cHJcbiAgICogQHBhcmFtIHBhcmFtc1xuICAgKi9cbiAgYWJzdHJhY3QgaW50ZXJwb2xhdGUoZXhwcjogc3RyaW5nIHwgRnVuY3Rpb24sIHBhcmFtcz86IGFueSk6IHN0cmluZztcblxuICAvKipcbiAgICogR2V0cyBhIHZhbHVlIGZyb20gYW4gb2JqZWN0IGJ5IGNvbXBvc2VkIGtleVxuICAgKiBwYXJzZXIuZ2V0VmFsdWUoeyBrZXkxOiB7IGtleUE6ICd2YWx1ZUknIH19LCAna2V5MS5rZXlBJykgPT0+ICd2YWx1ZUknXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIGtleVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0VmFsdWUodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nKTogYW55XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVEZWZhdWx0UGFyc2VyIGV4dGVuZHMgVHJhbnNsYXRlUGFyc2VyIHtcbiAgdGVtcGxhdGVNYXRjaGVyOiBSZWdFeHAgPSAve3tcXHM/KFtee31cXHNdKilcXHM/fX0vZztcblxuICBwdWJsaWMgaW50ZXJwb2xhdGUoZXhwcjogc3RyaW5nIHwgRnVuY3Rpb24sIHBhcmFtcz86IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdDogc3RyaW5nO1xuXG4gICAgaWYgKHR5cGVvZiBleHByID09PSAnc3RyaW5nJykge1xuICAgICAgcmVzdWx0ID0gdGhpcy5pbnRlcnBvbGF0ZVN0cmluZyhleHByLCBwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cHIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuaW50ZXJwb2xhdGVGdW5jdGlvbihleHByLCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzIHNob3VsZCBub3QgaGFwcGVuLCBidXQgYW4gdW5yZWxhdGVkIFRyYW5zbGF0ZVNlcnZpY2UgdGVzdCBkZXBlbmRzIG9uIGl0XG4gICAgICByZXN1bHQgPSBleHByIGFzIHN0cmluZztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0VmFsdWUodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nKTogYW55IHtcbiAgICBsZXQga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICAgIGtleSA9ICcnO1xuICAgIGRvIHtcbiAgICAgIGtleSArPSBrZXlzLnNoaWZ0KCk7XG4gICAgICBpZiAoaXNEZWZpbmVkKHRhcmdldCkgJiYgaXNEZWZpbmVkKHRhcmdldFtrZXldKSAmJiAodHlwZW9mIHRhcmdldFtrZXldID09PSAnb2JqZWN0JyB8fCAha2V5cy5sZW5ndGgpKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldFtrZXldO1xuICAgICAgICBrZXkgPSAnJztcbiAgICAgIH0gZWxzZSBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSArPSAnLic7XG4gICAgICB9XG4gICAgfSB3aGlsZSAoa2V5cy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHByaXZhdGUgaW50ZXJwb2xhdGVGdW5jdGlvbihmbjogRnVuY3Rpb24sIHBhcmFtcz86IGFueSkge1xuICAgIHJldHVybiBmbihwYXJhbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnRlcnBvbGF0ZVN0cmluZyhleHByOiBzdHJpbmcsIHBhcmFtcz86IGFueSkge1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwci5yZXBsYWNlKHRoaXMudGVtcGxhdGVNYXRjaGVyLCAoc3Vic3RyaW5nOiBzdHJpbmcsIGI6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IHIgPSB0aGlzLmdldFZhbHVlKHBhcmFtcywgYik7XG4gICAgICByZXR1cm4gaXNEZWZpbmVkKHIpID8gciA6IHN1YnN0cmluZztcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0RlZmF1bHRMYW5nQ2hhbmdlRXZlbnQsIExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRpb25DaGFuZ2VFdmVudH0gZnJvbSBcIi4vdHJhbnNsYXRlLnNlcnZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVN0b3JlIHtcbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGxhbmcgdG8gZmFsbGJhY2sgd2hlbiB0cmFuc2xhdGlvbnMgYXJlIG1pc3Npbmcgb24gdGhlIGN1cnJlbnQgbGFuZ1xuICAgKi9cbiAgcHVibGljIGRlZmF1bHRMYW5nOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBsYW5nIGN1cnJlbnRseSB1c2VkXG4gICAqL1xuICBwdWJsaWMgY3VycmVudExhbmc6IHN0cmluZyA9IHRoaXMuZGVmYXVsdExhbmc7XG5cbiAgLyoqXG4gICAqIGEgbGlzdCBvZiB0cmFuc2xhdGlvbnMgcGVyIGxhbmdcbiAgICovXG4gIHB1YmxpYyB0cmFuc2xhdGlvbnM6IGFueSA9IHt9O1xuXG4gIC8qKlxuICAgKiBhbiBhcnJheSBvZiBsYW5nc1xuICAgKi9cbiAgcHVibGljIGxhbmdzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgLyoqXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gdHJhbnNsYXRpb24gY2hhbmdlIGV2ZW50c1xuICAgKiBvblRyYW5zbGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgKi9cbiAgcHVibGljIG9uVHJhbnNsYXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byBsYW5nIGNoYW5nZSBldmVudHNcbiAgICogb25MYW5nQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAqL1xuICBwdWJsaWMgb25MYW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGRlZmF1bHQgbGFuZyBjaGFuZ2UgZXZlbnRzXG4gICAqIG9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAqL1xuICBwdWJsaWMgb25EZWZhdWx0TGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50PigpO1xufVxuIiwiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge2NvbmNhdCwgbWVyZ2UsIE9ic2VydmFibGUsIE9ic2VydmVyLCBvZn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7bWFwLCBzaGFyZSwgc3dpdGNoTWFwLCB0YWtlLCB0b0FycmF5fSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7TWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciwgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclBhcmFtc30gZnJvbSBcIi4vbWlzc2luZy10cmFuc2xhdGlvbi1oYW5kbGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZUNvbXBpbGVyfSBmcm9tIFwiLi90cmFuc2xhdGUuY29tcGlsZXJcIjtcbmltcG9ydCB7VHJhbnNsYXRlTG9hZGVyfSBmcm9tIFwiLi90cmFuc2xhdGUubG9hZGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVBhcnNlcn0gZnJvbSBcIi4vdHJhbnNsYXRlLnBhcnNlclwiO1xuXG5pbXBvcnQge1RyYW5zbGF0ZVN0b3JlfSBmcm9tIFwiLi90cmFuc2xhdGUuc3RvcmVcIjtcbmltcG9ydCB7aXNEZWZpbmVkLCBtZXJnZURlZXB9IGZyb20gXCIuL3V0aWxcIjtcblxuZXhwb3J0IGNvbnN0IFVTRV9TVE9SRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdVU0VfU1RPUkUnKTtcbmV4cG9ydCBjb25zdCBVU0VfREVGQVVMVF9MQU5HID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1VTRV9ERUZBVUxUX0xBTkcnKTtcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50IHtcbiAgdHJhbnNsYXRpb25zOiBhbnk7XG4gIGxhbmc6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYW5nQ2hhbmdlRXZlbnQge1xuICBsYW5nOiBzdHJpbmc7XG4gIHRyYW5zbGF0aW9uczogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQge1xuICBsYW5nOiBzdHJpbmc7XG4gIHRyYW5zbGF0aW9uczogYW55O1xufVxuXG5kZWNsYXJlIGludGVyZmFjZSBXaW5kb3cge1xuICBuYXZpZ2F0b3I6IGFueTtcbn1cblxuZGVjbGFyZSBjb25zdCB3aW5kb3c6IFdpbmRvdztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVNlcnZpY2Uge1xuICBwdWJsaWMgX2lzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBfc3ViVGltZXI6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgbG9hZGluZ1RyYW5zbGF0aW9uczogT2JzZXJ2YWJsZTxhbnk+O1xuICBwcml2YXRlIHBlbmRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfb25UcmFuc2xhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PigpO1xuICBwcml2YXRlIF9vbkxhbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+KCk7XG4gIHByaXZhdGUgX29uRGVmYXVsdExhbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RGVmYXVsdExhbmdDaGFuZ2VFdmVudD4oKTtcbiAgcHJpdmF0ZSBfZGVmYXVsdExhbmc6IHN0cmluZztcbiAgcHJpdmF0ZSBfY3VycmVudExhbmc6IHN0cmluZztcbiAgcHJpdmF0ZSBfbGFuZ3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgcHJpdmF0ZSBfdHJhbnNsYXRpb25zOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfdHJhbnNsYXRpb25SZXF1ZXN0czogYW55ID0ge307XG5cbiAgLyoqXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gdHJhbnNsYXRpb24gY2hhbmdlIGV2ZW50c1xuICAgKiBvblRyYW5zbGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgKi9cbiAgZ2V0IG9uVHJhbnNsYXRpb25DaGFuZ2UoKTogRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fb25UcmFuc2xhdGlvbkNoYW5nZSA6IHRoaXMuc3RvcmUub25UcmFuc2xhdGlvbkNoYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGxhbmcgY2hhbmdlIGV2ZW50c1xuICAgKiBvbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgKiB9KTtcbiAgICovXG4gIGdldCBvbkxhbmdDaGFuZ2UoKTogRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9vbkxhbmdDaGFuZ2UgOiB0aGlzLnN0b3JlLm9uTGFuZ0NoYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGRlZmF1bHQgbGFuZyBjaGFuZ2UgZXZlbnRzXG4gICAqIG9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAqL1xuICBnZXQgb25EZWZhdWx0TGFuZ0NoYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fb25EZWZhdWx0TGFuZ0NoYW5nZSA6IHRoaXMuc3RvcmUub25EZWZhdWx0TGFuZ0NoYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBsYW5nIHRvIGZhbGxiYWNrIHdoZW4gdHJhbnNsYXRpb25zIGFyZSBtaXNzaW5nIG9uIHRoZSBjdXJyZW50IGxhbmdcbiAgICovXG4gIGdldCBkZWZhdWx0TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9kZWZhdWx0TGFuZyA6IHRoaXMuc3RvcmUuZGVmYXVsdExhbmc7XG4gIH1cblxuICBzZXQgZGVmYXVsdExhbmcoZGVmYXVsdExhbmc6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzb2xhdGUpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRMYW5nID0gZGVmYXVsdExhbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmUuZGVmYXVsdExhbmcgPSBkZWZhdWx0TGFuZztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGxhbmcgY3VycmVudGx5IHVzZWRcbiAgICovXG4gIGdldCBjdXJyZW50TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9jdXJyZW50TGFuZyA6IHRoaXMuc3RvcmUuY3VycmVudExhbmc7XG4gIH1cblxuICBzZXQgY3VycmVudExhbmcoY3VycmVudExhbmc6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzb2xhdGUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRMYW5nID0gY3VycmVudExhbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmUuY3VycmVudExhbmcgPSBjdXJyZW50TGFuZztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYW4gYXJyYXkgb2YgbGFuZ3NcbiAgICovXG4gIGdldCBsYW5ncygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX2xhbmdzIDogdGhpcy5zdG9yZS5sYW5ncztcbiAgfVxuXG4gIHNldCBsYW5ncyhsYW5nczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5pc29sYXRlKSB7XG4gICAgICB0aGlzLl9sYW5ncyA9IGxhbmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLmxhbmdzID0gbGFuZ3M7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGEgbGlzdCBvZiB0cmFuc2xhdGlvbnMgcGVyIGxhbmdcbiAgICovXG4gIGdldCB0cmFuc2xhdGlvbnMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fdHJhbnNsYXRpb25zIDogdGhpcy5zdG9yZS50cmFuc2xhdGlvbnM7XG4gIH1cblxuICBzZXQgdHJhbnNsYXRpb25zKHRyYW5zbGF0aW9uczogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNvbGF0ZSkge1xuICAgICAgdGhpcy5fdHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLnRyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9ucztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHN0b3JlIGFuIGluc3RhbmNlIG9mIHRoZSBzdG9yZSAodGhhdCBpcyBzdXBwb3NlZCB0byBiZSB1bmlxdWUpXG4gICAqIEBwYXJhbSBjdXJyZW50TG9hZGVyIEFuIGluc3RhbmNlIG9mIHRoZSBsb2FkZXIgY3VycmVudGx5IHVzZWRcbiAgICogQHBhcmFtIGNvbXBpbGVyIEFuIGluc3RhbmNlIG9mIHRoZSBjb21waWxlciBjdXJyZW50bHkgdXNlZFxuICAgKiBAcGFyYW0gcGFyc2VyIEFuIGluc3RhbmNlIG9mIHRoZSBwYXJzZXIgY3VycmVudGx5IHVzZWRcbiAgICogQHBhcmFtIG1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgQSBoYW5kbGVyIGZvciBtaXNzaW5nIHRyYW5zbGF0aW9ucy5cbiAgICogQHBhcmFtIGlzb2xhdGUgd2hldGhlciB0aGlzIHNlcnZpY2Ugc2hvdWxkIHVzZSB0aGUgc3RvcmUgb3Igbm90XG4gICAqIEBwYXJhbSB1c2VEZWZhdWx0TGFuZyB3aGV0aGVyIHdlIHNob3VsZCB1c2UgZGVmYXVsdCBsYW5ndWFnZSB0cmFuc2xhdGlvbiB3aGVuIGN1cnJlbnQgbGFuZ3VhZ2UgdHJhbnNsYXRpb24gaXMgbWlzc2luZy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdG9yZTogVHJhbnNsYXRlU3RvcmUsXG4gICAgICAgICAgICAgIHB1YmxpYyBjdXJyZW50TG9hZGVyOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBjb21waWxlcjogVHJhbnNsYXRlQ29tcGlsZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJzZXI6IFRyYW5zbGF0ZVBhcnNlcixcbiAgICAgICAgICAgICAgcHVibGljIG1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXI6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgICAgICAgIEBJbmplY3QoVVNFX0RFRkFVTFRfTEFORykgcHJpdmF0ZSB1c2VEZWZhdWx0TGFuZzogYm9vbGVhbiA9IHRydWUsXG4gICAgICAgICAgICAgIEBJbmplY3QoVVNFX1NUT1JFKSBwcml2YXRlIGlzb2xhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgdG8gdXNlIGFzIGEgZmFsbGJhY2tcbiAgICovXG4gIHB1YmxpYyBzZXREZWZhdWx0TGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobGFuZyA9PT0gdGhpcy5kZWZhdWx0TGFuZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBwZW5kaW5nOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnJldHJpZXZlVHJhbnNsYXRpb25zKGxhbmcpO1xuXG4gICAgaWYgKHR5cGVvZiBwZW5kaW5nICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAvLyBvbiBpbml0IHNldCB0aGUgZGVmYXVsdExhbmcgaW1tZWRpYXRlbHlcbiAgICAgIGlmICghdGhpcy5kZWZhdWx0TGFuZykge1xuICAgICAgICB0aGlzLmRlZmF1bHRMYW5nID0gbGFuZztcbiAgICAgIH1cblxuICAgICAgcGVuZGluZy5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZWZhdWx0TGFuZyhsYW5nKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHsgLy8gd2UgYWxyZWFkeSBoYXZlIHRoaXMgbGFuZ3VhZ2VcbiAgICAgIHRoaXMuY2hhbmdlRGVmYXVsdExhbmcobGFuZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgdXNlZFxuICAgKi9cbiAgcHVibGljIGdldERlZmF1bHRMYW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdExhbmc7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgbGFuZyBjdXJyZW50bHkgdXNlZFxuICAgKi9cbiAgcHVibGljIHVzZShsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIGRvbid0IGNoYW5nZSB0aGUgbGFuZ3VhZ2UgaWYgdGhlIGxhbmd1YWdlIGdpdmVuIGlzIGFscmVhZHkgc2VsZWN0ZWRcbiAgICBpZiAobGFuZyA9PT0gdGhpcy5jdXJyZW50TGFuZykge1xuICAgICAgcmV0dXJuIG9mKHRoaXMudHJhbnNsYXRpb25zW2xhbmddKTtcbiAgICB9XG5cbiAgICBsZXQgcGVuZGluZzogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5yZXRyaWV2ZVRyYW5zbGF0aW9ucyhsYW5nKTtcblxuICAgIGlmICh0eXBlb2YgcGVuZGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgLy8gb24gaW5pdCBzZXQgdGhlIGN1cnJlbnRMYW5nIGltbWVkaWF0ZWx5XG4gICAgICBpZiAoIXRoaXMuY3VycmVudExhbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IGxhbmc7XG4gICAgICB9XG5cbiAgICAgIHBlbmRpbmcucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBwZW5kaW5nO1xuICAgIH0gZWxzZSB7IC8vIHdlIGhhdmUgdGhpcyBsYW5ndWFnZSwgcmV0dXJuIGFuIE9ic2VydmFibGVcbiAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcblxuICAgICAgcmV0dXJuIG9mKHRoaXMudHJhbnNsYXRpb25zW2xhbmddKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBnaXZlbiB0cmFuc2xhdGlvbnNcbiAgICovXG4gIHByaXZhdGUgcmV0cmlldmVUcmFuc2xhdGlvbnMobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgcGVuZGluZzogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgLy8gaWYgdGhpcyBsYW5ndWFnZSBpcyB1bmF2YWlsYWJsZSwgYXNrIGZvciBpdFxuICAgIGlmICh0eXBlb2YgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuX3RyYW5zbGF0aW9uUmVxdWVzdHNbbGFuZ10gPSB0aGlzLl90cmFuc2xhdGlvblJlcXVlc3RzW2xhbmddIHx8IHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZyk7XG4gICAgICBwZW5kaW5nID0gdGhpcy5fdHJhbnNsYXRpb25SZXF1ZXN0c1tsYW5nXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGVuZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2Ugd2l0aCB0aGUgY3VycmVudCBsb2FkZXJcbiAgICogYW5kIHBhc3NlcyBpdCB0aHJvdWdoIHRoZSBjb21waWxlclxuICAgKi9cbiAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICBjb25zdCBsb2FkaW5nVHJhbnNsYXRpb25zID0gdGhpcy5jdXJyZW50TG9hZGVyLmdldFRyYW5zbGF0aW9uKGxhbmcpLnBpcGUoc2hhcmUoKSk7XG4gICAgdGhpcy5sb2FkaW5nVHJhbnNsYXRpb25zID0gbG9hZGluZ1RyYW5zbGF0aW9ucy5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIG1hcCgocmVzOiBPYmplY3QpID0+IHRoaXMuY29tcGlsZXIuY29tcGlsZVRyYW5zbGF0aW9ucyhyZXMsIGxhbmcpKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5sb2FkaW5nVHJhbnNsYXRpb25zXG4gICAgICAuc3Vic2NyaWJlKChyZXM6IE9iamVjdCkgPT4ge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IHJlcztcbiAgICAgICAgdGhpcy51cGRhdGVMYW5ncygpO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgIH0sIChlcnI6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGxvYWRpbmdUcmFuc2xhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgc2V0cyBhbiBvYmplY3Qgb2YgdHJhbnNsYXRpb25zIGZvciBhIGdpdmVuIGxhbmd1YWdlXG4gICAqIGFmdGVyIHBhc3NpbmcgaXQgdGhyb3VnaCB0aGUgY29tcGlsZXJcbiAgICovXG4gIHB1YmxpYyBzZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcsIHRyYW5zbGF0aW9uczogT2JqZWN0LCBzaG91bGRNZXJnZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdHJhbnNsYXRpb25zID0gdGhpcy5jb21waWxlci5jb21waWxlVHJhbnNsYXRpb25zKHRyYW5zbGF0aW9ucywgbGFuZyk7XG4gICAgaWYgKHNob3VsZE1lcmdlICYmIHRoaXMudHJhbnNsYXRpb25zW2xhbmddKSB7XG4gICAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IG1lcmdlRGVlcCh0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSwgdHJhbnNsYXRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPSB0cmFuc2xhdGlvbnM7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UuZW1pdCh7bGFuZzogbGFuZywgdHJhbnNsYXRpb25zOiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgY3VycmVudGx5IGF2YWlsYWJsZSBsYW5nc1xuICAgKi9cbiAgcHVibGljIGdldExhbmdzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmxhbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmFpbGFibGUgbGFuZ3NcbiAgICovXG4gIHB1YmxpYyBhZGRMYW5ncyhsYW5nczogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgIGxhbmdzLmZvckVhY2goKGxhbmc6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMubGFuZ3MuaW5kZXhPZihsYW5nKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5sYW5ncy5wdXNoKGxhbmcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCBvZiBhdmFpbGFibGUgbGFuZ3NcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlTGFuZ3MoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRMYW5ncyhPYmplY3Qua2V5cyh0aGlzLnRyYW5zbGF0aW9ucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBhcnNlZCByZXN1bHQgb2YgdGhlIHRyYW5zbGF0aW9uc1xuICAgKi9cbiAgcHVibGljIGdldFBhcnNlZFJlc3VsdCh0cmFuc2xhdGlvbnM6IGFueSwga2V5OiBhbnksIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogYW55IHtcbiAgICBsZXQgcmVzOiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9LFxuICAgICAgICBvYnNlcnZhYmxlczogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgayBvZiBrZXkpIHtcbiAgICAgICAgcmVzdWx0W2tdID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrLCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0W2tdLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb2JzZXJ2YWJsZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob2JzZXJ2YWJsZXMpIHtcbiAgICAgICAgbGV0IG1lcmdlZE9iczogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgICAgICBmb3IgKGxldCBrIG9mIGtleSkge1xuICAgICAgICAgIGxldCBvYnMgPSB0eXBlb2YgcmVzdWx0W2tdLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiID8gcmVzdWx0W2tdIDogb2YocmVzdWx0W2tdIGFzIHN0cmluZyk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBtZXJnZWRPYnMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIG1lcmdlZE9icyA9IG9icztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVyZ2VkT2JzID0gbWVyZ2UobWVyZ2VkT2JzLCBvYnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkT2JzLnBpcGUoXG4gICAgICAgICAgdG9BcnJheSgpLFxuICAgICAgICAgIG1hcCgoYXJyOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIG9ialtrZXlbaW5kZXhdXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmICh0cmFuc2xhdGlvbnMpIHtcbiAgICAgIHJlcyA9IHRoaXMucGFyc2VyLmludGVycG9sYXRlKHRoaXMucGFyc2VyLmdldFZhbHVlKHRyYW5zbGF0aW9ucywga2V5KSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzID09PSBcInVuZGVmaW5lZFwiICYmIHRoaXMuZGVmYXVsdExhbmcgJiYgdGhpcy5kZWZhdWx0TGFuZyAhPT0gdGhpcy5jdXJyZW50TGFuZyAmJiB0aGlzLnVzZURlZmF1bHRMYW5nKSB7XG4gICAgICByZXMgPSB0aGlzLnBhcnNlci5pbnRlcnBvbGF0ZSh0aGlzLnBhcnNlci5nZXRWYWx1ZSh0aGlzLnRyYW5zbGF0aW9uc1t0aGlzLmRlZmF1bHRMYW5nXSwga2V5KSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBsZXQgcGFyYW1zOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zID0ge2tleSwgdHJhbnNsYXRlU2VydmljZTogdGhpc307XG4gICAgICBpZiAodHlwZW9mIGludGVycG9sYXRlUGFyYW1zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMuaW50ZXJwb2xhdGVQYXJhbXMgPSBpbnRlcnBvbGF0ZVBhcmFtcztcbiAgICAgIH1cbiAgICAgIHJlcyA9IHRoaXMubWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlci5oYW5kbGUocGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZW9mIHJlcyAhPT0gXCJ1bmRlZmluZWRcIiA/IHJlcyA6IGtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5IChvciBhbiBhcnJheSBvZiBrZXlzKVxuICAgKiBAcmV0dXJucyB0aGUgdHJhbnNsYXRlZCBrZXksIG9yIGFuIG9iamVjdCBvZiB0cmFuc2xhdGVkIGtleXNcbiAgICovXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiB7XG4gICAgaWYgKCFpc0RlZmluZWQoa2V5KSB8fCAha2V5Lmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJrZXlcIiByZXF1aXJlZGApO1xuICAgIH1cbiAgICAvLyBjaGVjayBpZiB3ZSBhcmUgbG9hZGluZyBhIG5ldyB0cmFuc2xhdGlvbiB0byB1c2VcbiAgICBpZiAodGhpcy5wZW5kaW5nKSB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICAgIGxldCBvbkNvbXBsZXRlID0gKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXMpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBvbkVycm9yID0gKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5sb2FkaW5nVHJhbnNsYXRpb25zLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICByZXMgPSB0aGlzLmdldFBhcnNlZFJlc3VsdChyZXMsIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXMuc3Vic2NyaWJlKG9uQ29tcGxldGUsIG9uRXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlKHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBvbkVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5jdXJyZW50TGFuZ10sIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgaWYgKHR5cGVvZiByZXMuc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvZihyZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyZWFtIG9mIHRyYW5zbGF0ZWQgdmFsdWVzIG9mIGEga2V5IChvciBhbiBhcnJheSBvZiBrZXlzKSB3aGljaCB1cGRhdGVzXG4gICAqIHdoZW5ldmVyIHRoZSBsYW5ndWFnZSBjaGFuZ2VzLlxuICAgKiBAcmV0dXJucyBBIHN0cmVhbSBvZiB0aGUgdHJhbnNsYXRlZCBrZXksIG9yIGFuIG9iamVjdCBvZiB0cmFuc2xhdGVkIGtleXNcbiAgICovXG4gIHB1YmxpYyBzdHJlYW0oa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiB7XG4gICAgaWYgKCFpc0RlZmluZWQoa2V5KSB8fCAha2V5Lmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJrZXlcIiByZXF1aXJlZGApO1xuICAgIH1cblxuICAgIHJldHVybiBjb25jYXQoXG4gICAgICB0aGlzLmdldChrZXksIGludGVycG9sYXRlUGFyYW1zKSxcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KGV2ZW50LnRyYW5zbGF0aW9ucywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmFuc2xhdGlvbiBpbnN0YW50bHkgZnJvbSB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgbG9hZGVkIHRyYW5zbGF0aW9uLlxuICAgKiBBbGwgcnVsZXMgcmVnYXJkaW5nIHRoZSBjdXJyZW50IGxhbmd1YWdlLCB0aGUgcHJlZmVycmVkIGxhbmd1YWdlIG9mIGV2ZW4gZmFsbGJhY2sgbGFuZ3VhZ2VzIHdpbGwgYmUgdXNlZCBleGNlcHQgYW55IHByb21pc2UgaGFuZGxpbmcuXG4gICAqL1xuICBwdWJsaWMgaW5zdGFudChrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogc3RyaW5nIHwgYW55IHtcbiAgICBpZiAoIWlzRGVmaW5lZChrZXkpIHx8ICFrZXkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KHRoaXMudHJhbnNsYXRpb25zW3RoaXMuY3VycmVudExhbmddLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAga2V5LmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBvYmpba2V5W2luZGV4XV0gPSBrZXlbaW5kZXhdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRyYW5zbGF0ZWQgdmFsdWUgb2YgYSBrZXksIGFmdGVyIGNvbXBpbGluZyBpdFxuICAgKi9cbiAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbGFuZzogc3RyaW5nID0gdGhpcy5jdXJyZW50TGFuZyk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddW2tleV0gPSB0aGlzLmNvbXBpbGVyLmNvbXBpbGUodmFsdWUsIGxhbmcpO1xuICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UuZW1pdCh7bGFuZzogbGFuZywgdHJhbnNsYXRpb25zOiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgbGFuZ1xuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VMYW5nKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudExhbmcgPSBsYW5nO1xuICAgIHRoaXMub25MYW5nQ2hhbmdlLmVtaXQoe2xhbmc6IGxhbmcsIHRyYW5zbGF0aW9uczogdGhpcy50cmFuc2xhdGlvbnNbbGFuZ119KTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGRlZmF1bHQgbGFuZywgdXNlIHRoZSBvbmUgdGhhdCB3ZSBqdXN0IHNldFxuICAgIGlmICghdGhpcy5kZWZhdWx0TGFuZykge1xuICAgICAgdGhpcy5jaGFuZ2VEZWZhdWx0TGFuZyhsYW5nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgZGVmYXVsdCBsYW5nXG4gICAqL1xuICBwcml2YXRlIGNoYW5nZURlZmF1bHRMYW5nKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVmYXVsdExhbmcgPSBsYW5nO1xuICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZS5lbWl0KHtsYW5nOiBsYW5nLCB0cmFuc2xhdGlvbnM6IHRoaXMudHJhbnNsYXRpb25zW2xhbmddfSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIHRvIHJlbG9hZCB0aGUgbGFuZyBmaWxlIGZyb20gdGhlIGZpbGVcbiAgICovXG4gIHB1YmxpYyByZWxvYWRMYW5nKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5yZXNldExhbmcobGFuZyk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZyk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBpbm5lciB0cmFuc2xhdGlvblxuICAgKi9cbiAgcHVibGljIHJlc2V0TGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl90cmFuc2xhdGlvblJlcXVlc3RzW2xhbmddID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxhbmd1YWdlIGNvZGUgbmFtZSBmcm9tIHRoZSBicm93c2VyLCBlLmcuIFwiZGVcIlxuICAgKi9cbiAgcHVibGljIGdldEJyb3dzZXJMYW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgYnJvd3Nlckxhbmc6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzID8gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBudWxsO1xuICAgIGJyb3dzZXJMYW5nID0gYnJvd3NlckxhbmcgfHwgd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLmJyb3dzZXJMYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLnVzZXJMYW5ndWFnZTtcblxuICAgIGlmIChicm93c2VyTGFuZy5pbmRleE9mKCctJykgIT09IC0xKSB7XG4gICAgICBicm93c2VyTGFuZyA9IGJyb3dzZXJMYW5nLnNwbGl0KCctJylbMF07XG4gICAgfVxuXG4gICAgaWYgKGJyb3dzZXJMYW5nLmluZGV4T2YoJ18nKSAhPT0gLTEpIHtcbiAgICAgIGJyb3dzZXJMYW5nID0gYnJvd3Nlckxhbmcuc3BsaXQoJ18nKVswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnJvd3Nlckxhbmc7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VsdHVyZSBsYW5ndWFnZSBjb2RlIG5hbWUgZnJvbSB0aGUgYnJvd3NlciwgZS5nLiBcImRlLURFXCJcbiAgICovXG4gIHB1YmxpYyBnZXRCcm93c2VyQ3VsdHVyZUxhbmcoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGxldCBicm93c2VyQ3VsdHVyZUxhbmc6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzID8gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBudWxsO1xuICAgIGJyb3dzZXJDdWx0dXJlTGFuZyA9IGJyb3dzZXJDdWx0dXJlTGFuZyB8fCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckxhbmd1YWdlO1xuXG4gICAgcmV0dXJuIGJyb3dzZXJDdWx0dXJlTGFuZztcbiAgfVxuXG4gIHB1YmxpYyB0cmlnZ2VyQ2hhbmdlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdWJUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3N1YlRpbWVyKTtcbiAgICB9XG4gICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuX3N1YlRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgfSwxMDAwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVmYXVsdExhbmdDaGFuZ2VFdmVudCwgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlLCBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50fSBmcm9tICcuL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7ZXF1YWxzLCBpc0RlZmluZWR9IGZyb20gJy4vdXRpbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0cmFuc2xhdGVdLFtuZ3gtdHJhbnNsYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAga2V5OiBzdHJpbmc7XG4gIGxhc3RQYXJhbXM6IGFueTtcbiAgY3VycmVudFBhcmFtczogYW55O1xuICBvbkxhbmdDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbjtcbiAgb25EZWZhdWx0TGFuZ0NoYW5nZVN1YjogU3Vic2NyaXB0aW9uO1xuICBvblRyYW5zbGF0aW9uQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgc2V0IHRyYW5zbGF0ZShrZXk6IHN0cmluZykge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgdGhpcy5jaGVja05vZGVzKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgc2V0IHRyYW5zbGF0ZVBhcmFtcyhwYXJhbXM6IGFueSkge1xuICAgIGlmICghZXF1YWxzKHRoaXMuY3VycmVudFBhcmFtcywgcGFyYW1zKSkge1xuICAgICAgdGhpcy5jdXJyZW50UGFyYW1zID0gcGFyYW1zO1xuICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBvZiB0aGUgY3VycmVudCBsYW5nIGNoYW5nZVxuICAgIGlmICghdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2VTdWIgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uub25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5sYW5nID09PSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmcpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrTm9kZXModHJ1ZSwgZXZlbnQudHJhbnNsYXRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uTGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgbGFuZ3VhZ2UgY2hhbmdlc1xuICAgIGlmICghdGhpcy5vbkxhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlU3ViID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUsIGV2ZW50LnRyYW5zbGF0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25EZWZhdWx0TGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgZGVmYXVsdCBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZVN1YiA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5vbkRlZmF1bHRMYW5nQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLmNoZWNrTm9kZXMoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja05vZGVzKGZvcmNlVXBkYXRlID0gZmFsc2UsIHRyYW5zbGF0aW9ucz86IGFueSkge1xuICAgIGxldCBub2RlczogTm9kZUxpc3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIC8vIGlmIHRoZSBlbGVtZW50IGlzIGVtcHR5XG4gICAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICAgIC8vIHdlIGFkZCB0aGUga2V5IGFzIGNvbnRlbnRcbiAgICAgIHRoaXMuc2V0Q29udGVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5rZXkpO1xuICAgICAgbm9kZXMgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgbm9kZTogYW55ID0gbm9kZXNbaV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykgeyAvLyBub2RlIHR5cGUgMyBpcyBhIHRleHQgbm9kZVxuICAgICAgICBsZXQga2V5OiBzdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgICAgIGtleSA9IHRoaXMua2V5O1xuICAgICAgICAgIGlmIChmb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgbm9kZS5sYXN0S2V5ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQobm9kZSk7XG4gICAgICAgICAgbGV0IHRyaW1tZWRDb250ZW50ID0gY29udGVudC50cmltKCk7XG4gICAgICAgICAgaWYgKHRyaW1tZWRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gd2Ugd2FudCB0byB1c2UgdGhlIGNvbnRlbnQgYXMgYSBrZXksIG5vdCB0aGUgdHJhbnNsYXRpb24gdmFsdWVcbiAgICAgICAgICAgIGlmIChjb250ZW50ICE9PSBub2RlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICBrZXkgPSB0cmltbWVkQ29udGVudDtcbiAgICAgICAgICAgICAgLy8gdGhlIGNvbnRlbnQgd2FzIGNoYW5nZWQgZnJvbSB0aGUgdXNlciwgd2UnbGwgdXNlIGl0IGFzIGEgcmVmZXJlbmNlIGlmIG5lZWRlZFxuICAgICAgICAgICAgICBub2RlLm9yaWdpbmFsQ29udGVudCA9IHRoaXMuZ2V0Q29udGVudChub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5vcmlnaW5hbENvbnRlbnQgJiYgZm9yY2VVcGRhdGUpIHsgLy8gdGhlIGNvbnRlbnQgc2VlbXMgb2ssIGJ1dCB0aGUgbGFuZyBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgICBub2RlLmxhc3RLZXkgPSBudWxsO1xuICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBjb250ZW50IGlzIHRoZSB0cmFuc2xhdGlvbiwgbm90IHRoZSBrZXksIHVzZSB0aGUgbGFzdCByZWFsIGNvbnRlbnQgYXMga2V5XG4gICAgICAgICAgICAgIGtleSA9IG5vZGUub3JpZ2luYWxDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShrZXksIG5vZGUsIHRyYW5zbGF0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoa2V5OiBzdHJpbmcsIG5vZGU6IGFueSwgdHJhbnNsYXRpb25zOiBhbnkpIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAobm9kZS5sYXN0S2V5ID09PSBrZXkgJiYgdGhpcy5sYXN0UGFyYW1zID09PSB0aGlzLmN1cnJlbnRQYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RQYXJhbXMgPSB0aGlzLmN1cnJlbnRQYXJhbXM7XG5cbiAgICAgIGxldCBvblRyYW5zbGF0aW9uID0gKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChyZXMgIT09IGtleSkge1xuICAgICAgICAgIG5vZGUubGFzdEtleSA9IGtleTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5vZGUub3JpZ2luYWxDb250ZW50KSB7XG4gICAgICAgICAgbm9kZS5vcmlnaW5hbENvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5jdXJyZW50VmFsdWUgPSBpc0RlZmluZWQocmVzKSA/IHJlcyA6IChub2RlLm9yaWdpbmFsQ29udGVudCB8fCBrZXkpO1xuICAgICAgICAvLyB3ZSByZXBsYWNlIGluIHRoZSBvcmlnaW5hbCBjb250ZW50IHRvIHByZXNlcnZlIHNwYWNlcyB0aGF0IHdlIG1pZ2h0IGhhdmUgdHJpbW1lZFxuICAgICAgICB0aGlzLnNldENvbnRlbnQobm9kZSwgdGhpcy5rZXkgPyBub2RlLmN1cnJlbnRWYWx1ZSA6IG5vZGUub3JpZ2luYWxDb250ZW50LnJlcGxhY2Uoa2V5LCBub2RlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoaXNEZWZpbmVkKHRyYW5zbGF0aW9ucykpIHtcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrZXksIHRoaXMuY3VycmVudFBhcmFtcyk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmVzLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvblRyYW5zbGF0aW9uKHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoa2V5LCB0aGlzLmN1cnJlbnRQYXJhbXMpLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRDb250ZW50KG5vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzRGVmaW5lZChub2RlLnRleHRDb250ZW50KSA/IG5vZGUudGV4dENvbnRlbnQgOiBub2RlLmRhdGE7XG4gIH1cblxuICBzZXRDb250ZW50KG5vZGU6IGFueSwgY29udGVudDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzRGVmaW5lZChub2RlLnRleHRDb250ZW50KSkge1xuICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUuZGF0YSA9IGNvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMub25MYW5nQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFBpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50LCBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UsIFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnR9IGZyb20gJy4vdHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHtlcXVhbHMsIGlzRGVmaW5lZH0gZnJvbSAnLi91dGlsJztcblxuQEluamVjdGFibGUoKVxuQFBpcGUoe1xuICBuYW1lOiAndHJhbnNsYXRlJyxcbiAgcHVyZTogZmFsc2UgLy8gcmVxdWlyZWQgdG8gdXBkYXRlIHRoZSB2YWx1ZSB3aGVuIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIGxhc3RLZXk6IHN0cmluZztcbiAgbGFzdFBhcmFtczogYW55W107XG4gIG9uVHJhbnNsYXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PjtcbiAgb25MYW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PjtcbiAgb25EZWZhdWx0TGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICB1cGRhdGVWYWx1ZShrZXk6IHN0cmluZywgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QsIHRyYW5zbGF0aW9ucz86IGFueSk6IHZvaWQge1xuICAgIGxldCBvblRyYW5zbGF0aW9uID0gKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnZhbHVlID0gcmVzICE9PSB1bmRlZmluZWQgPyByZXMgOiBrZXk7XG4gICAgICB0aGlzLmxhc3RLZXkgPSBrZXk7XG4gICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfTtcbiAgICBpZiAodHJhbnNsYXRpb25zKSB7XG4gICAgICBsZXQgcmVzID0gdGhpcy50cmFuc2xhdGUuZ2V0UGFyc2VkUmVzdWx0KHRyYW5zbGF0aW9ucywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVHJhbnNsYXRpb24ocmVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmFuc2xhdGUuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcbiAgfVxuXG4gIHRyYW5zZm9ybShxdWVyeTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKCFxdWVyeSB8fCBxdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSBhc2sgYW5vdGhlciB0aW1lIGZvciB0aGUgc2FtZSBrZXksIHJldHVybiB0aGUgbGFzdCB2YWx1ZVxuICAgIGlmIChlcXVhbHMocXVlcnksIHRoaXMubGFzdEtleSkgJiYgZXF1YWxzKGFyZ3MsIHRoaXMubGFzdFBhcmFtcykpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGxldCBpbnRlcnBvbGF0ZVBhcmFtczogT2JqZWN0O1xuICAgIGlmIChpc0RlZmluZWQoYXJnc1swXSkgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgJiYgYXJnc1swXS5sZW5ndGgpIHtcbiAgICAgICAgLy8gd2UgYWNjZXB0IG9iamVjdHMgd3JpdHRlbiBpbiB0aGUgdGVtcGxhdGUgc3VjaCBhcyB7bjoxfSwgeyduJzoxfSwge246J3YnfVxuICAgICAgICAvLyB3aGljaCBpcyB3aHkgd2UgbWlnaHQgbmVlZCB0byBjaGFuZ2UgaXQgdG8gcmVhbCBKU09OIG9iamVjdHMgc3VjaCBhcyB7XCJuXCI6MX0gb3Ige1wiblwiOlwidlwifVxuICAgICAgICBsZXQgdmFsaWRBcmdzOiBzdHJpbmcgPSBhcmdzWzBdXG4gICAgICAgICAgLnJlcGxhY2UoLyhcXCcpPyhbYS16QS1aMC05X10rKShcXCcpPyhcXHMpPzovZywgJ1wiJDJcIjonKVxuICAgICAgICAgIC5yZXBsYWNlKC86KFxccyk/KFxcJykoLio/KShcXCcpL2csICc6XCIkM1wiJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBKU09OLnBhcnNlKHZhbGlkQXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFdyb25nIHBhcmFtZXRlciBpbiBUcmFuc2xhdGVQaXBlLiBFeHBlY3RlZCBhIHZhbGlkIE9iamVjdCwgcmVjZWl2ZWQ6ICR7YXJnc1swXX1gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBhcmdzWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN0b3JlIHRoZSBxdWVyeSwgaW4gY2FzZSBpdCBjaGFuZ2VzXG4gICAgdGhpcy5sYXN0S2V5ID0gcXVlcnk7XG5cbiAgICAvLyBzdG9yZSB0aGUgcGFyYW1zLCBpbiBjYXNlIHRoZXkgY2hhbmdlXG4gICAgdGhpcy5sYXN0UGFyYW1zID0gYXJncztcblxuICAgIC8vIHNldCB0aGUgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKHF1ZXJ5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIHN1YnNjcmlwdGlvbiB0byBvbkxhbmdDaGFuZ2UsIGNsZWFuIGl0XG4gICAgdGhpcy5fZGlzcG9zZSgpO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBjaGFuZ2VcbiAgICBpZiAoIXRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSkge1xuICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlID0gdGhpcy50cmFuc2xhdGUub25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RLZXkgJiYgZXZlbnQubGFuZyA9PT0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpIHtcbiAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsO1xuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25MYW5nQ2hhbmdlIGV2ZW50LCBpbiBjYXNlIHRoZSBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uTGFuZ0NoYW5nZSkge1xuICAgICAgdGhpcy5vbkxhbmdDaGFuZ2UgPSB0aGlzLnRyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RLZXkpIHtcbiAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsOyAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSB1bnRpbCBpdCdzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25EZWZhdWx0TGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgZGVmYXVsdCBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHRoaXMudHJhbnNsYXRlLm9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGFzdEtleSkge1xuICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7IC8vIHdlIHdhbnQgdG8gbWFrZSBzdXJlIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIHVudGlsIGl0J3MgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShxdWVyeSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiBhbnkgZXhpc3Rpbmcgc3Vic2NyaXB0aW9uIHRvIGNoYW5nZSBldmVudHNcbiAgICovXG4gIHByaXZhdGUgX2Rpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uTGFuZ0NoYW5nZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNwb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZUZha2VMb2FkZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUubG9hZGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuc2VydmljZVwiO1xuaW1wb3J0IHtNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCBGYWtlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcn0gZnJvbSBcIi4vbGliL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVQYXJzZXIsIFRyYW5zbGF0ZURlZmF1bHRQYXJzZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUucGFyc2VyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZUNvbXBpbGVyLCBUcmFuc2xhdGVGYWtlQ29tcGlsZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuY29tcGlsZXJcIjtcbmltcG9ydCB7VHJhbnNsYXRlRGlyZWN0aXZlfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVQaXBlfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnBpcGVcIjtcbmltcG9ydCB7VHJhbnNsYXRlU3RvcmV9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUuc3RvcmVcIjtcbmltcG9ydCB7VVNFX1NUT1JFfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnNlcnZpY2VcIjtcbmltcG9ydCB7VVNFX0RFRkFVTFRfTEFOR30gZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5zZXJ2aWNlXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL2xpYi90cmFuc2xhdGUubG9hZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnNlcnZpY2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi9taXNzaW5nLXRyYW5zbGF0aW9uLWhhbmRsZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi90cmFuc2xhdGUucGFyc2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmNvbXBpbGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmRpcmVjdGl2ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5waXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnN0b3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRlTW9kdWxlQ29uZmlnIHtcbiAgbG9hZGVyPzogUHJvdmlkZXI7XG4gIGNvbXBpbGVyPzogUHJvdmlkZXI7XG4gIHBhcnNlcj86IFByb3ZpZGVyO1xuICBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyPzogUHJvdmlkZXI7XG4gIC8vIGlzb2xhdGUgdGhlIHNlcnZpY2UgaW5zdGFuY2UsIG9ubHkgd29ya3MgZm9yIGxhenkgbG9hZGVkIG1vZHVsZXMgb3IgY29tcG9uZW50cyB3aXRoIHRoZSBcInByb3ZpZGVyc1wiIHByb3BlcnR5XG4gIGlzb2xhdGU/OiBib29sZWFuO1xuICB1c2VEZWZhdWx0TGFuZz86IGJvb2xlYW47XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRyYW5zbGF0ZVBpcGUsXG4gICAgVHJhbnNsYXRlRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUcmFuc2xhdGVQaXBlLFxuICAgIFRyYW5zbGF0ZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZU1vZHVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgaW4geW91ciByb290IG1vZHVsZSB0byBwcm92aWRlIHRoZSBUcmFuc2xhdGVTZXJ2aWNlXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFRyYW5zbGF0ZU1vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUcmFuc2xhdGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgY29uZmlnLmxvYWRlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLCB1c2VDbGFzczogVHJhbnNsYXRlRmFrZUxvYWRlcn0sXG4gICAgICAgIGNvbmZpZy5jb21waWxlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlQ29tcGlsZXIsIHVzZUNsYXNzOiBUcmFuc2xhdGVGYWtlQ29tcGlsZXJ9LFxuICAgICAgICBjb25maWcucGFyc2VyIHx8IHtwcm92aWRlOiBUcmFuc2xhdGVQYXJzZXIsIHVzZUNsYXNzOiBUcmFuc2xhdGVEZWZhdWx0UGFyc2VyfSxcbiAgICAgICAgY29uZmlnLm1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgfHwge3Byb3ZpZGU6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIHVzZUNsYXNzOiBGYWtlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcn0sXG4gICAgICAgIFRyYW5zbGF0ZVN0b3JlLFxuICAgICAgICB7cHJvdmlkZTogVVNFX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLmlzb2xhdGV9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX0RFRkFVTFRfTEFORywgdXNlVmFsdWU6IGNvbmZpZy51c2VEZWZhdWx0TGFuZ30sXG4gICAgICAgIFRyYW5zbGF0ZVNlcnZpY2VcbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpbiB5b3VyIG90aGVyIChub24gcm9vdCkgbW9kdWxlcyB0byBpbXBvcnQgdGhlIGRpcmVjdGl2ZS9waXBlXG4gICAqL1xuICBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnOiBUcmFuc2xhdGVNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVHJhbnNsYXRlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIGNvbmZpZy5sb2FkZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlciwgdXNlQ2xhc3M6IFRyYW5zbGF0ZUZha2VMb2FkZXJ9LFxuICAgICAgICBjb25maWcuY29tcGlsZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZUNvbXBpbGVyLCB1c2VDbGFzczogVHJhbnNsYXRlRmFrZUNvbXBpbGVyfSxcbiAgICAgICAgY29uZmlnLnBhcnNlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlUGFyc2VyLCB1c2VDbGFzczogVHJhbnNsYXRlRGVmYXVsdFBhcnNlcn0sXG4gICAgICAgIGNvbmZpZy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHx8IHtwcm92aWRlOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCB1c2VDbGFzczogRmFrZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJ9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLmlzb2xhdGV9LFxuICAgICAgICB7cHJvdmlkZTogVVNFX0RFRkFVTFRfTEFORywgdXNlVmFsdWU6IGNvbmZpZy51c2VEZWZhdWx0TGFuZ30sXG4gICAgICAgIFRyYW5zbGF0ZVNlcnZpY2VcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7O0FBR0EsTUFBc0IsZUFBZTtDQUVwQzs7OztBQU1ELE1BQWEsbUJBQW9CLFNBQVEsZUFBZTs7Ozs7SUFDdEQsY0FBYyxDQUFDLElBQVk7UUFDekIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDZjs7O1lBSkYsVUFBVTs7Ozs7OztBQ1ZYOzs7QUFvQkEsTUFBc0IseUJBQXlCO0NBVzlDOzs7O0FBTUQsTUFBYSw2QkFBNkI7Ozs7O0lBQ3hDLE1BQU0sQ0FBQyxNQUF1QztRQUM1QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDbkI7OztZQUpGLFVBQVU7Ozs7Ozs7QUNwQ1g7OztBQUVBLE1BQXNCLGlCQUFpQjtDQUl0Qzs7OztBQU1ELE1BQWEscUJBQXNCLFNBQVEsaUJBQWlCOzs7Ozs7SUFD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