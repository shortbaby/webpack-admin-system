'use strict';

import Vue from 'vue';

import {
    SelectDropdown,
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    MessageBox,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Notification,
    Slider,
    Loading,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Message,
    Badge,
    Card,
    Rate,
    Steps,
    Step
} from 'element-ui'

export default function() {
    Vue.component(SelectDropdown.name, SelectDropdown);
    Vue.component(Pagination.name, Pagination);
    Vue.component(Dialog.name, Dialog);
    Vue.component(Autocomplete.name, Autocomplete);
    Vue.component(Dropdown.name, Dropdown);
  
    Vue.component(DropdownItem.name, DropdownItem);
    Vue.component(Menu.name, Menu);
    Vue.component(Submenu.name, Submenu);
    Vue.component(MenuItem.name, MenuItem);
    Vue.component(MenuItemGroup.name, MenuItemGroup);
    Vue.component(Input.name, Input);
    Vue.component(InputNumber.name, InputNumber);
    Vue.component(Radio.name, Radio);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(RadioButton.name, RadioButton);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(CheckboxGroup.name, CheckboxGroup);
    Vue.component(Switch.name, Switch);
    Vue.component(Select.name, Select);
    Vue.component(Option.name, Option);
    Vue.component(OptionGroup.name, OptionGroup);
    Vue.component(Button.name, Button);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(Table.name, Table);
    Vue.component(TableColumn.name, TableColumn);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(TimeSelect.name, TimeSelect);
    Vue.component(TimePicker.name, TimePicker);
    Vue.component(Popover.name, Popover);
    Vue.component(Tooltip.name, Tooltip);
    Vue.component(Breadcrumb.name, Breadcrumb);
    Vue.component(BreadcrumbItem.name, BreadcrumbItem);
    Vue.component(Form.name, Form);
    Vue.component(FormItem.name, FormItem);
    Vue.component(Tabs.name, Tabs);
    Vue.component(TabPane.name, TabPane);
    Vue.component(Tag.name, Tag);
    Vue.component(Tree.name, Tree);
    Vue.component(Alert.name, Alert);
    Vue.component(Slider.name, Slider);
    Vue.component(Icon.name, Icon);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(Upload.name, Upload);
    Vue.component(Progress.name, Progress);
    Vue.component(Spinner.name, Spinner);
    Vue.component(Badge.name, Badge);
    Vue.component(Card.name, Card);
    Vue.component(Rate.name, Rate);
    Vue.component(Steps.name, Steps);
    Vue.component(Step.name, Step);

    Vue.use(Loading);
    
    // Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    // Vue.prototype.$message = Message;
}
