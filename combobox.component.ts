import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ComboBoxComponent),
    multi: true,
};

export enum KEY_CODE {
    UP_ARROW = 38,
    ENTER = 13,
    DOWN_ARROW = 40,
    TAB_KEY = 9,
}

// @ts-ignore: Unreachable code error
@Component({
    selector: 'combo-box',
    templateUrl: './combo-box.component.html',
    styleUrls: ['./combo-box.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
// author : hautv
// -----
export class ComboBoxComponent implements OnInit, ControlValueAccessor, OnChanges, OnDestroy, AfterViewInit {
    // The internal data model
    private innerValue: any = '';
    @Input() dataList: object[] | any;
    @Input() displayMember: string | any;
    @Input() idIp: string | any;
    @Input() nameIp: string | any;
    @Input() listColumns: string[] | any;
    @Input() headerColumns: string[] | any;
    @Input() headerColumnWidth: string[] | any;
    @Input() isObject: boolean | any;
    @Input() isSelectDummyList: boolean | any;
    @Input() valueName: string | any;
    @Input() isReadOnly: boolean | any;
    @Input() hiddenHeader: boolean | any;
    @Input() onSelectedCallback: boolean | any;
    @Input() isRequired: boolean | any;
    @Input() isRequiredDuplicate: boolean | any;
    @Input() hideRequiredWhenValueTrue: boolean | any;
    @Input() checkCoincide: boolean | any;
    // css for z-index
    @Input() isMaxWidth: boolean | any;
    @Input() isCheckVirtualScrollCbb: boolean | any;
    @Input() isOutTable: boolean | any;
    @Input() valueIsNumber: boolean | any;
    @Input() getValueDisplay: boolean | any;
    @Input() options: any | any;
    @Input() account: any | any;
    @Input() type: any | any;
    @Input() allowNegative: boolean | any;
    @Input() nameCategory: string | any;
    @Input() showIconPlus: boolean | any;
    @Input() isCheckEmpty: boolean | any;
    @Input() tabindex: number | any;
    @Input() autoFillFistMatch: boolean | any;
    @Input() backgroundInherit: boolean | any;
    @Input() noEdit: boolean | any;
    @Input() inPutCurrency: string | any;
    @Input() hasBoder: boolean | any;
    @Input() isCostSet: boolean | any;
    @Input() noGetValueParentNode: boolean | any;
    @Input() isPopupOverride: boolean | any;
    @Input() setOpenLeft: boolean | any;
    // @Output() dataIsNotExist = new EventEmitter<boolean>();
    @Input() isRateType: boolean | any; // Sử dụng cho các ô %
    @Input() showAsInput: boolean | any; // hiển thị như ô input không phải cbb
    @Input() stypeForHome: boolean | any;
    @Input() typeObject: number | any; // phân biệt cbb đối tượng và nhân viên bên TMNH 0- combobox nhân viên, 1 - combobox đối tượng bất kỳ
    @Output() focusInput = new EventEmitter<any>();
    @Output() afterDataChange = new EventEmitter<any>(); // Add data for combo in display display main
    @Output() blur = new EventEmitter<any>(); // Add data for combo in display display main
    @Output() objectSelected = new EventEmitter<any>(); // đối tượng đc chọn
    @Input() useVirtualScroll: boolean | any;
    @Input() useNewAPILoadCbb: boolean | any;
    @Input() option: any;
    // với các màn ccdc và tscd load combobox cần date nên truyền thêm 1 biến date vào combobox
    @Input() date: any;
    @Input() checkGetAll: any;
    @Input() objectHidden: any;
    // Check xem có hiển thị dòng dữ liệu có theo dõi hay không
    @Input() checkActive: any;
    @Input() fromTax: boolean | any;
    @Input() noSetDisabled: boolean | any;
    @Input() isReadOnlyForInput: boolean | any;
    @Input() notSetDisable: boolean | any;
    @Input() typeCbb: number | any;
    @Input() unitType: number | any;
    @Input() defaultValue: any;
    @Input() bold: any;
    @Input() checkCodeExist: any;
    @Input() messageForCodeExist: any;
    @Input() maxLength: any;
    @Input() isNotGetValueFromPopupOverride: any;
    @Input() zIndexUpperHeader: any;
    @Input() autoFocus: boolean = false;
    @ViewChild('nameOfInputCombobox') nameField: ElementRef; // sử dụng kick chuột trong vùng div mà không có dữ liệu
    @ViewChild('nameOfInputComboboxNumber') nameField_Number: ElementRef; // sử dụng kick chuột trong vùng div mà không có dữ liệu
    @ViewChild('nameOfInputComboboxNumberIsRateType') nameField_NumberIsRateType: ElementRef; // sử dụng kick chuột trong vùng div mà không có dữ liệu

    @Input() textCenter: boolean | any;
    @Input() textLeft: boolean | any;
    @Input() textRight: boolean | any;
    @Input() customClassDimension: boolean | any;
    @Input() fillData: any;
    lstLoadStream: string[] | any = [
        'Category1',
        'Category2',
        'Category3',
        'Category4',
    ];
    checkCode: any = false;
    idFocus: string | any;
    dummyDataList: any[] | any;
    showDropDown: boolean | any;
    counter: number | any;
    textToSort: string | any;
    selectRow: any;
    inSide: boolean | any;
    overFlow: boolean | any;
    required: boolean | any;
    bottom100: boolean | any;
    zindexForDropdown: boolean | any;
    isOverBottomPage: boolean | any;
    nonCheckZeroValue: boolean | any;
    clientX: number | any;
    clientY: number | any;

    itemsPerPage: number | any;
    links: any;
    page: number | any;
    predicate: string | any;
    ascending: boolean | any;
    eventSubscriber: Subscription | any;
    fromChangeDataList: boolean | any;
    eventForTextChange: any;
    isLoaded: boolean | any;
    countTextChange: number | any;
    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    // get accessor
    get value(): any {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    set value(v: any) {
        if (this.valueIsNumber && !this.innerValue) {
            this.innerValue = 0;
        }
        if (v !== this.innerValue || this.onSelectedCallback) {
            this.innerValue = v;
            this.onChangeCallback(v);
            const select = this.dummyDataList.find((a: any) => a[this.valueName] === this.innerValue);
            this.objectSelected.emit(select);
        }
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    focus() {
        const element = document.activeElement;
        if (element) {
            this.idFocus = element.id;
        }
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (this.getValueDisplay) {
            this.textToSort = value;
            this.innerValue = value;
            if (this.dummyDataList && this.dummyDataList.some(x => x[this.valueName] === value)) {
                this.selectRow = this.dummyDataList.find(x => x[this.valueName] === value);
            }
            this.value = value;
            if (this.isRequired) {
                this.required = !this.textToSort;
            }
        } else {
            if (value !== this.innerValue) {
                this.innerValue = value;
                if (this.dataList) {
                    if (this.value || this.value === 0 || this.value === false) {
                        if (this.isObject) {
                            this.selectRow = this.value;
                            if (this.displayMember) {
                                this.textToSort = this.value[this.displayMember];
                            }
                        } else {
                            for (const r of this.dataList) {
                                if (r[this.valueName] || r[this.valueName] === 0 || r[this.valueName] === false) {
                                    if (this.valueIsNumber) {
                                        if (r[this.valueName] === this.value) {
                                            this.selectRow = r;
                                            break;
                                        }
                                    } else {
                                        if (String(r[this.valueName]).toUpperCase() === String(this.value).toUpperCase()) {
                                            this.selectRow = r;
                                            break;
                                        } else {
                                            this.selectRow = null;
                                        }
                                    }
                                }
                            }
                            if (this.selectRow) {
                                if (this.displayMember) {
                                    this.textToSort = this.selectRow[this.displayMember];
                                }
                            } else {
                                this.textToSort = value;
                            }
                        }
                    } else {
                        this.textToSort = null;
                        this.required = false;
                    }
                } else {
                    this.textToSort = null;
                    this.required = false;
                }
            }
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    onFocusEventAction(event): void {
        this.counter = -1;
        if (this.nameField) {
            const nF = this.nameField.nativeElement.getBoundingClientRect();
            this.clientX = nF.x;
            this.clientY = nF.y;
        }
        this.focusInput.emit(event);
    }

    onBlurEventAction(event): void {
        this.showDropDown = false;
        this.blur.emit(event);
    }

    mouseOverTable() {
        this.inSide = true;
    }

    mouseLeaveTable() {
        this.inSide = false;
    }

    // Hautv edit check trường hợp dữ liệu không tồn tại trong danh mục
    outFocus() {
        if (!this.inSide) {
            if (!this.getValueDisplay) {
                if (this.textToSort) {
                    this.showDropDown = false;
                    if (!this.value && !this.nonCheckZeroValue && (this.value === undefined || this.value === null)) {
                        if (this.autoFillFistMatch && this.dummyDataList && this.dummyDataList.length > 0) {
                            this.updateTextBox(this.dummyDataList[0]);
                            return;
                        }
                        if (this.dummyDataList) {
                            if (!this.isObject) {
                                if (this.dummyDataList.find(n => n[this.valueName] === this.value)) {
                                    return;
                                }
                            }
                        }
                        if (this.useVirtualScroll && this.lstLoadStream.includes(this.nameCategory)) {
                            this.resetPage();
                        }
                        this.toastr.warning('Global Error');
                        this.required = true;
                        // giờ để mặc định xóa luôn text
                        this.textToSort = '';
                        this.required = this.isRequired;
                    }
                }
            } else if (this.checkCodeExist && (this.showDropDown || this.checkCode)) {
                if (this.value && this.dummyDataList.some(x => x[this.valueName].toUpperCase() === this.value.toUpperCase())) {
                    this.toastr.warning('Global Error');
                    // this.value = null;
                    // this.required = true;
                    // giờ để mặc định xóa luôn text
                    const input = document.getElementById(this.idIp);
                    setTimeout(() => {
                        input.focus();
                    });
                    this.checkCode = false;
                    // this.textToSort = '';
                    // this.required = this.isRequired;
                }
            }
            this.showDropDown = false;
            this.blur.emit(event);
        } else {
            if (this.getValueDisplay && this.valueIsNumber) {
                if (this.isRateType) {
                    this.nameField_NumberIsRateType.nativeElement.focus(); // fix lỗi không đóng combobox
                } else {
                    this.nameField_Number.nativeElement.focus(); // fix lỗi không đóng combobox
                }
            } else {
                this.nameField.nativeElement.focus(); // fix lỗi không đóng combobox
            }
        }
    }

    resetPage() {
        this.page = 0;
        this.dummyDataList = [];
        if (this.value) {
            this.value = null;
            this.textToSort = '';
        }
    }

    onKeyCodeAction(event: KeyboardEvent): void {
        if (!this.showDropDown) {
            return;
        }
        if (event.keyCode === KEY_CODE.UP_ARROW) {
            this.counter = this.dummyDataList && this.dummyDataList.length > 0 ? this.dummyDataList.indexOf(this.selectRow) - 1 : 0;
        } else if (event.keyCode === KEY_CODE.DOWN_ARROW) {
            this.counter = this.dummyDataList && this.dummyDataList.length > 0 ? this.dummyDataList.indexOf(this.selectRow) + 1 : 0;
        } else if (event.keyCode === KEY_CODE.ENTER) {
            this.counter = this.dummyDataList && this.dummyDataList.length > 0 ? this.dummyDataList.indexOf(this.selectRow) : 0;
        }
        if (this.displayMember && this.counter >= 0 && this.counter < this.dummyDataList.length) {
            if (this.getValueDisplay) {
                this.textToSort = this.dummyDataList[this.counter][this.displayMember];
                this.value = this.dummyDataList[this.counter][this.displayMember];
                if (this.isRequired) {
                    this.required = !this.value;
                }
            } else {
                this.textToSort = this.dummyDataList[this.counter][this.displayMember];
                if (this.isObject) {
                    this.value = this.dummyDataList[this.counter];
                } else {
                    this.value = this.dummyDataList[this.counter][this.valueName];
                }
                this.selectRow = this.dummyDataList[this.counter];
                if (this.isRequired) {
                    this.required = !this.value;
                }
            }
        }
        if (event.keyCode === KEY_CODE.ENTER) {
            this.showDropDown = false;
        }
        this.scrollItemSelected(event);
    }

    scrollItemSelected($event: KeyboardEvent, scroll?: string) {
        // class table
        const parentContainer = document.getElementsByClassName('cbb-table')[0];
        // class item selected
        const element = document.getElementsByClassName('selected')[0];
        // class header
        const headerTable = document.getElementsByClassName('header-cbb-table')[0];
        if (parentContainer === undefined || element === undefined || headerTable === undefined) {
            return false;
        }
        const elRect = element.getBoundingClientRect(),
            parRect = parentContainer.getBoundingClientRect(),
            headerRect = headerTable.getBoundingClientRect();
        const elementHeight = elRect.height;
        if (scroll && scroll === 'UP') {
            if (elRect.top <= parRect.top + elementHeight) {
                parentContainer.scrollTop = parentContainer.scrollTop - (parRect.top + elementHeight - elRect.top) - headerRect.height;
            }
        }
        if (scroll && scroll === 'DOWN') {
            if (!(elRect.top >= parRect.top && elRect.bottom <= parRect.bottom && elRect.bottom + elementHeight <= parRect.bottom)) {
                parentContainer.scrollTop = parentContainer.scrollTop + elRect.height + (elRect.bottom - parRect.bottom);
            }
        }
        if ($event && $event.key === 'ArrowDown') {
            // down arrow
            if (!(elRect.top >= parRect.top && elRect.bottom <= parRect.bottom && elRect.bottom + elementHeight <= parRect.bottom)) {
                parentContainer.scrollTop = parentContainer.scrollTop + elRect.height + (elRect.bottom - parRect.bottom);
            }
        } else {
            // up arrow
            if (elRect.top <= parRect.top + elementHeight) {
                parentContainer.scrollTop = parentContainer.scrollTop - (parRect.top + elementHeight - elRect.top) - headerRect.height;
            }
        }
    }

    checkHighlight(currentItem): boolean {
        return this.counter === currentItem;
    }

    constructor(
        private toastr: ToastrService
    ) {
        this.reset();
        // default item perpage
        this.itemsPerPage = 30;
        this.page = 0;
        this.links = {
            last: 0,
        };
        this.registerSelectComboboxCategory();
    }

    ngOnInit() {
        this.required = false;
        this.countTextChange = 0;
        this.reset();
        this.zindexForDropdown = this.isOutTable;
        if (this.dataList) {
            if (this.dataList.length > 0) {
                if (this.dataList[0].hasOwnProperty('isParentNode')) {
                    this.configComboboxWithParentNode(
                        this.dataList.filter(n => n['isParentNode'] && n['grade'] === 1),
                        1
                    );
                }
            }
        }
    }

    // Add by Hautv
    configComboboxWithParentNode(dataPerent: any[], i): void {
        const dataParent: any[] = dataPerent.filter(n => n['isParentNode'] && n['grade'] === i);
        dataParent.forEach(n => {
            n.space = i;
            const children = this.dataList.filter(m => m['parentID'] === m['id']);
            if (children) {
                this.configComboboxWithParentNode(children, i++);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const name = changes['nameCategory'];
        if (name && this.useVirtualScroll) {
            if (name.currentValue !== name.previousValue) {
                this.resetPage();
            }
        }
        if (this.getValueDisplay) {
            if (this.isRequired) {
                this.required = !this.textToSort;
            }
        } else {
            if (this.useVirtualScroll && this.fromChangeDataList) {
                this.fromChangeDataList = false;
                return;
            }
            if (this.value || this.value === 0 || this.value === false) {
                if (this.isObject) {
                    this.selectRow = this.value;
                    if (this.displayMember) {
                        this.textToSort = this.value[this.displayMember];
                    }
                } else {
                    if (this.dataList) {
                        for (const r of this.dataList) {
                            if (r[this.valueName] || r[this.valueName] === 0 || r[this.valueName] === false) {
                                if (this.valueIsNumber) {
                                    if (r[this.valueName] === this.value) {
                                        this.selectRow = r;
                                        break;
                                    }
                                } else {
                                    if (String(r[this.valueName]).toUpperCase() === String(this.value).toUpperCase()) {
                                        this.selectRow = r;
                                        break;
                                    }
                                }
                            }
                        }
                        if (this.selectRow) {
                            if (this.displayMember) {
                                this.textToSort = this.selectRow[this.displayMember];
                            }
                        } else {
                            this.textToSort = this.value;
                        }
                    }
                }
            } else {
                this.textToSort = null;
                this.required = false;
            }
        }
    }

    focusText(event) {
        this.eventForTextChange = event;
    }


    onScrollToItem() {
        // class table
        const parentContainer = document.getElementsByClassName('dropdown-element')[0];
        if (parentContainer === undefined) {
            return;
        }
        // class item selected
        const element = parentContainer.getElementsByClassName('selected')[0];
        if (element === undefined) {
            return;
        }
        const elRect = element.getBoundingClientRect(),
            parRect = parentContainer.getBoundingClientRect();
        const elementHeight = elRect.height;
        if (!(elRect.top >= parRect.top && elRect.bottom <= parRect.bottom && elRect.bottom + elementHeight <= parRect.bottom)) {
            parentContainer.scrollTop = parentContainer.scrollTop + elRect.height + (elRect.bottom - parRect.bottom);
        }
    }

    /*Add by hautv*/
    setLocaitonDropDown(nameField, event) {
        let nF = nameField.nativeElement.parentElement;
        let checkInsideTable;
        for (let i = 0; i < 10; i++) {
            nF = nF.parentElement;
            if (nF.nodeName.includes('TABLE')) {
                checkInsideTable = true;
                break;
            }
        }
        if (checkInsideTable) {
            const pTb_Div = nF.parentElement.getBoundingClientRect();
            const long =
                pTb_Div.y +
                pTb_Div.height -
                (event && event.clientY ? event.clientY : this.eventForTextChange.clientY ? this.eventForTextChange.clientY : 0);
            if (long < 135) {
                this.bottom100 = true;
            } else {
                this.bottom100 = false;
                this.zindexForDropdown = this.isOutTable;
            }
        }
    }

    reset(): void {
        if (this.dataList === undefined) {
            if (!this.useVirtualScroll) {
                this.dataList = [];
            }
        }
        this.showDropDown = false;
        this.dummyDataList = this.dataList;
    }


    updateTextBox(valueSelected) {
        if (this.noGetValueParentNode && valueSelected['isParentNode']) {
            this.value = null;
            this.textToSort = '';
            if (this.fromTax) {
                this.toastr.warning('Không chọn vào chỉ tiêu cha');
            } else {
                this.toastr.warning('Không hạch toán vào chỉ tiêu cha');
            }
            return;
        }
        if (this.getValueDisplay) {
            if (this.displayMember) {
                let check = false;
                if (this.checkCodeExist) {
                    if (this.dummyDataList.some(x => x[this.valueName].toUpperCase() === valueSelected[this.valueName].toUpperCase())) {
                        this.selectRow = valueSelected;
                        check = true;
                    }
                } else {
                    if (this.dummyDataList.some(x => x[this.valueName] === valueSelected[this.valueName])) {
                        this.selectRow = valueSelected;
                        check = true;
                    }
                }
                if (this.checkCodeExist && check) {
                    // this.value = null;
                    // this.textToSort = null;
                    this.value = valueSelected[this.valueName];
                    this.textToSort = valueSelected[this.displayMember];
                    this.checkCode = true;
                    // this.toastr.warning(this.translate.instant(this.messageForCodeExist), this.translate.instant('global.combobox.error'));
                } else {
                    if (this.isRateType) {
                        this.value = valueSelected[this.valueName];
                        this.textToSort = valueSelected[this.displayMember];
                    } else {
                        this.value = valueSelected[this.displayMember];
                        this.textToSort = valueSelected[this.displayMember];
                    }
                }
                if (this.isRequired) {
                    this.required = !this.textToSort;
                }
                this.showDropDown = false;
                this.inSide = false;
            }
        } else {
            this.selectRow = valueSelected;
            if (this.displayMember) {
                this.textToSort = valueSelected[this.displayMember];
            }
            if (this.isObject) {
                this.value = valueSelected;
            } else {
                this.value = valueSelected[this.valueName];
            }
            this.inSide = false;
            this.showDropDown = false;
            this.required = false;
        }
    }

    onSelect(select: any) {
        this.selectRow = select;
    }


    getDate(date) {
        if (date) {
            return date;
        }
    }

    getData(nameColumn, value) {
        if (nameColumn.toLowerCase().includes('date')) {
            return this.getDate(value[nameColumn]);
        } else {
            return value[nameColumn];
        }
    }

    clickInside() {
        try {
            this.nameField.nativeElement.focus();
        } catch (e) {}
    }

    tab(event: any) {
        if (
            this.showDropDown &&
            (event.keyCode === KEY_CODE.UP_ARROW || event.keyCode === KEY_CODE.DOWN_ARROW || event.keyCode === KEY_CODE.ENTER)
        ) {
        } else {
            this.inSide = false;
            this.showDropDown = false;
        }
    }



    registerSelectComboboxCategory() {
        this.eventSubscriber = this.eventManager.subscribe('afterSelectCategoryForCombobox', (response: any) => {
            switch (response.content.nameCategory) {
                case 'Category1':
                    if (this.dummyDataList) {
                        if (!this.dummyDataList.some(n => n.id === response.content.dataSelect.id)) {
                            if (this.isOutTable === false) {
                                this.dummyDataList.push(response.content.dataSelect);
                            }
                        }
                    }
                    break;
            }
        });
    }

    ngOnDestroy(): void {
        this.eventSubscriber.unsubscribe();
    }

    dataChange() {
        if (this.useVirtualScroll) {
            this.afterDataChange.emit({
                data: this.dummyDataList,
                nameCategory: this.nameCategory,
                typeObject: this.typeObject,
            });
            this.fromChangeDataList = true;
        }
    }

    ngAfterViewInit() {
        if (this.autoFocus) {
            this.nameField.nativeElement.focus();
            // this.nameField_Number.nativeElement.focus();
            // this.nameField_NumberIsRateType.nativeElement.focus();
        }
    }
}
