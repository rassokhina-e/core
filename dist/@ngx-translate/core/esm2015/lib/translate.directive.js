/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, ElementRef, Input } from '@angular/core';
import { TranslateService } from './translate.service';
import { equals, isDefined } from './util';
export class TranslateDirective {
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
if (false) {
    /** @type {?} */
    TranslateDirective.prototype.key;
    /** @type {?} */
    TranslateDirective.prototype.lastParams;
    /** @type {?} */
    TranslateDirective.prototype.currentParams;
    /** @type {?} */
    TranslateDirective.prototype.onLangChangeSub;
    /** @type {?} */
    TranslateDirective.prototype.onDefaultLangChangeSub;
    /** @type {?} */
    TranslateDirective.prototype.onTranslationChangeSub;
    /** @type {?} */
    TranslateDirective.prototype.translateService;
    /** @type {?} */
    TranslateDirective.prototype.element;
    /** @type {?} */
    TranslateDirective.prototype._ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvIiwic291cmNlcyI6WyJsaWIvdHJhbnNsYXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFtQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUUzRyxPQUFPLEVBQTBDLGdCQUFnQixFQUF5QixNQUFNLHFCQUFxQixDQUFDO0FBQ3RILE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBS3pDLE1BQU0sT0FBTyxrQkFBa0I7Ozs7OztJQXNCN0IsWUFBb0IsZ0JBQWtDLEVBQVUsT0FBbUIsRUFBVSxJQUF1QjtRQUFoRyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ2xILDhGQUE4RjtRQUM5RixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBNkIsRUFBRSxFQUFFO2dCQUNsSCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtvQkFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUMzQztZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFD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SSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMzQztJQUNILENBQUM7OztZQXhKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjthQUN4Qzs7OztZQUxnRCxnQkFBZ0I7WUFGVCxVQUFVO1lBQXhDLGlCQUFpQjs7O3dCQWdCeEMsS0FBSzs4QkFPTCxLQUFLOzs7O0lBZE4saUNBQVk7O0lBQ1osd0NBQWdCOztJQUNoQiwyQ0FBbUI7O0lBQ25CLDZDQUE4Qjs7SUFDOUIsb0RBQXFDOztJQUNyQyxvREFBcUM7O0lBZ0J6Qiw4Q0FBMEM7O0lBQUUscUNBQTJCOztJQUFFLGtDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3Q2hlY2tlZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RlZmF1bHRMYW5nQ2hhbmdlRXZlbnQsIExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSwgVHJhbnNsYXRpb25DaGFuZ2VFdmVudH0gZnJvbSAnLi90cmFuc2xhdGUuc2VydmljZSc7XG5pbXBvcnQge2VxdWFscywgaXNEZWZpbmVkfSBmcm9tICcuL3V0aWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdHJhbnNsYXRlXSxbbmd4LXRyYW5zbGF0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIGtleTogc3RyaW5nO1xuICBsYXN0UGFyYW1zOiBhbnk7XG4gIGN1cnJlbnRQYXJhbXM6IGFueTtcbiAgb25MYW5nQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb247XG4gIG9uRGVmYXVsdExhbmdDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbjtcbiAgb25UcmFuc2xhdGlvbkNoYW5nZVN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIEBJbnB1dCgpIHNldCB0cmFuc2xhdGUoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgIHRoaXMuY2hlY2tOb2RlcygpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB0cmFuc2xhdGVQYXJhbXMocGFyYW1zOiBhbnkpIHtcbiAgICBpZiAoIWVxdWFscyh0aGlzLmN1cnJlbnRQYXJhbXMsIHBhcmFtcykpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhcmFtcyA9IHBhcmFtcztcbiAgICAgIHRoaXMuY2hlY2tOb2Rlcyh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIC8vIHN1YnNjcmliZSB0byBvblRyYW5zbGF0aW9uQ2hhbmdlIGV2ZW50LCBpbiBjYXNlIHRoZSB0cmFuc2xhdGlvbnMgb2YgdGhlIGN1cnJlbnQgbGFuZyBjaGFuZ2VcbiAgICBpZiAoIXRoaXMub25UcmFuc2xhdGlvbkNoYW5nZVN1Yikge1xuICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlU3ViID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uVHJhbnNsYXRpb25DaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogVHJhbnNsYXRpb25DaGFuZ2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQubGFuZyA9PT0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgdGhpcy5jaGVja05vZGVzKHRydWUsIGV2ZW50LnRyYW5zbGF0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHN1YnNjcmliZSB0byBvbkxhbmdDaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIGxhbmd1YWdlIGNoYW5nZXNcbiAgICBpZiAoIXRoaXMub25MYW5nQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZVN1YiA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2hlY2tOb2Rlcyh0cnVlLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uRGVmYXVsdExhbmdDaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgY2hhbmdlc1xuICAgIGlmICghdGhpcy5vbkRlZmF1bHRMYW5nQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2VTdWIgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uub25EZWZhdWx0TGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2hlY2tOb2Rlcyh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy50cmFuc2xhdGVTZXJ2aWNlLl9pc0FjdGl2ZSkge1xuICAgICAgdGhpcy5jaGVja05vZGVzKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tOb2Rlcyhmb3JjZVVwZGF0ZSA9IGZhbHNlLCB0cmFuc2xhdGlvbnM/OiBhbnkpIHtcbiAgICBsZXQgbm9kZXM6IE5vZGVMaXN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2RlcztcbiAgICAvLyBpZiB0aGUgZWxlbWVudCBpcyBlbXB0eVxuICAgIGlmICghbm9kZXMubGVuZ3RoKSB7XG4gICAgICAvLyB3ZSBhZGQgdGhlIGtleSBhcyBjb250ZW50XG4gICAgICB0aGlzLnNldENvbnRlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMua2V5KTtcbiAgICAgIG5vZGVzID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2RlcztcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgbGV0IG5vZGU6IGFueSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHsgLy8gbm9kZSB0eXBlIDMgaXMgYSB0ZXh0IG5vZGVcbiAgICAgICAgbGV0IGtleTogc3RyaW5nO1xuICAgICAgICBpZiAodGhpcy5rZXkpIHtcbiAgICAgICAgICBrZXkgPSB0aGlzLmtleTtcbiAgICAgICAgICBpZiAoZm9yY2VVcGRhdGUpIHtcbiAgICAgICAgICAgIG5vZGUubGFzdEtleSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KG5vZGUpO1xuICAgICAgICAgIGxldCB0cmltbWVkQ29udGVudCA9IGNvbnRlbnQudHJpbSgpO1xuICAgICAgICAgIGlmICh0cmltbWVkQ29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHdlIHdhbnQgdG8gdXNlIHRoZSBjb250ZW50IGFzIGEga2V5LCBub3QgdGhlIHRyYW5zbGF0aW9uIHZhbHVlXG4gICAgICAgICAgICBpZiAoY29udGVudCAhPT0gbm9kZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAga2V5ID0gdHJpbW1lZENvbnRlbnQ7XG4gICAgICAgICAgICAgIC8vIHRoZSBjb250ZW50IHdhcyBjaGFuZ2VkIGZyb20gdGhlIHVzZXIsIHdlJ2xsIHVzZSBpdCBhcyBhIHJlZmVyZW5jZSBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgbm9kZS5vcmlnaW5hbENvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQobm9kZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUub3JpZ2luYWxDb250ZW50ICYmIGZvcmNlVXBkYXRlKSB7IC8vIHRoZSBjb250ZW50IHNlZW1zIG9rLCBidXQgdGhlIGxhbmcgaGFzIGNoYW5nZWRcbiAgICAgICAgICAgICAgbm9kZS5sYXN0S2V5ID0gbnVsbDtcbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgY29udGVudCBpcyB0aGUgdHJhbnNsYXRpb24sIG5vdCB0aGUga2V5LCB1c2UgdGhlIGxhc3QgcmVhbCBjb250ZW50IGFzIGtleVxuICAgICAgICAgICAgICBrZXkgPSBub2RlLm9yaWdpbmFsQ29udGVudC50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUoa2V5LCBub2RlLCB0cmFuc2xhdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGtleTogc3RyaW5nLCBub2RlOiBhbnksIHRyYW5zbGF0aW9uczogYW55KSB7XG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKG5vZGUubGFzdEtleSA9PT0ga2V5ICYmIHRoaXMubGFzdFBhcmFtcyA9PT0gdGhpcy5jdXJyZW50UGFyYW1zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0UGFyYW1zID0gdGhpcy5jdXJyZW50UGFyYW1zO1xuXG4gICAgICBsZXQgb25UcmFuc2xhdGlvbiA9IChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAocmVzICE9PSBrZXkpIHtcbiAgICAgICAgICBub2RlLmxhc3RLZXkgPSBrZXk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFub2RlLm9yaWdpbmFsQ29udGVudCkge1xuICAgICAgICAgIG5vZGUub3JpZ2luYWxDb250ZW50ID0gdGhpcy5nZXRDb250ZW50KG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUuY3VycmVudFZhbHVlID0gaXNEZWZpbmVkKHJlcykgPyByZXMgOiAobm9kZS5vcmlnaW5hbENvbnRlbnQgfHwga2V5KTtcbiAgICAgICAgLy8gd2UgcmVwbGFjZSBpbiB0aGUgb3JpZ2luYWwgY29udGVudCB0byBwcmVzZXJ2ZSBzcGFjZXMgdGhhdCB3ZSBtaWdodCBoYXZlIHRyaW1tZWRcbiAgICAgICAgdGhpcy5zZXRDb250ZW50KG5vZGUsIHRoaXMua2V5ID8gbm9kZS5jdXJyZW50VmFsdWUgOiBub2RlLm9yaWdpbmFsQ29udGVudC5yZXBsYWNlKGtleSwgbm9kZS5jdXJyZW50VmFsdWUpKTtcbiAgICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfTtcblxuICAgICAgaWYgKGlzRGVmaW5lZCh0cmFuc2xhdGlvbnMpKSB7XG4gICAgICAgIGxldCByZXMgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0UGFyc2VkUmVzdWx0KHRyYW5zbGF0aW9ucywga2V5LCB0aGlzLmN1cnJlbnRQYXJhbXMpO1xuICAgICAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJlcy5zdWJzY3JpYmUob25UcmFuc2xhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25UcmFuc2xhdGlvbihyZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KGtleSwgdGhpcy5jdXJyZW50UGFyYW1zKS5zdWJzY3JpYmUob25UcmFuc2xhdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29udGVudChub2RlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc0RlZmluZWQobm9kZS50ZXh0Q29udGVudCkgPyBub2RlLnRleHRDb250ZW50IDogbm9kZS5kYXRhO1xuICB9XG5cbiAgc2V0Q29udGVudChub2RlOiBhbnksIGNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChpc0RlZmluZWQobm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLmRhdGEgPSBjb250ZW50O1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLm9uTGFuZ0NoYW5nZVN1Yikge1xuICAgICAgdGhpcy5vbkxhbmdDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vbkRlZmF1bHRMYW5nQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlU3ViKSB7XG4gICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==