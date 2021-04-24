import Vue from 'vue'
import Vuex from 'vuex'

import Alert from './modules/alert'
import I18NStore from './modules/i18n'

import PermissionsIndex from './cruds/Permissions'
import PermissionsSingle from './cruds/Permissions/single'
import RolesIndex from './cruds/Roles'
import RolesSingle from './cruds/Roles/single'
import UsersIndex from './cruds/Users'
import UsersSingle from './cruds/Users/single'
import ExpenseCategoriesIndex from './cruds/ExpenseCategories'
import ExpenseCategoriesSingle from './cruds/ExpenseCategories/single'
import IncomeCategoriesIndex from './cruds/IncomeCategories'
import IncomeCategoriesSingle from './cruds/IncomeCategories/single'
import ExpensesIndex from './cruds/Expenses'
import ExpensesSingle from './cruds/Expenses/single'
import IncomesIndex from './cruds/Incomes'
import IncomesSingle from './cruds/Incomes/single'
import PlansIndex from './cruds/Plans'
import PlansSingle from './cruds/Plans/single'
import ExpenseReports from './cruds/ExpenseReports'
import ProductCategoriesIndex from './cruds/ProductCategories'
import ProductCategoriesSingle from './cruds/ProductCategories/single'
import ProductTagsIndex from './cruds/ProductTags'
import ProductTagsSingle from './cruds/ProductTags/single'
import ProductsIndex from './cruds/Products'
import ProductsSingle from './cruds/Products/single'
import ContactCompaniesIndex from './cruds/ContactCompanies'
import ContactCompaniesSingle from './cruds/ContactCompanies/single'
import ContactContactsIndex from './cruds/ContactContacts'
import ContactContactsSingle from './cruds/ContactContacts/single'
import CrmStatusesIndex from './cruds/CrmStatuses'
import CrmStatusesSingle from './cruds/CrmStatuses/single'
import CrmCustomersIndex from './cruds/CrmCustomers'
import CrmCustomersSingle from './cruds/CrmCustomers/single'
import CrmNotesIndex from './cruds/CrmNotes'
import CrmNotesSingle from './cruds/CrmNotes/single'
import CrmDocumentsIndex from './cruds/CrmDocuments'
import CrmDocumentsSingle from './cruds/CrmDocuments/single'
import MapRouteIndex from './cruds/MapRoute'
import MapRouteSingle from './cruds/MapRoute/single'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Alert,
    I18NStore,
    PermissionsIndex,
    PermissionsSingle,
    RolesIndex,
    RolesSingle,
    UsersIndex,
    UsersSingle,
    ExpenseCategoriesIndex,
    ExpenseCategoriesSingle,
    IncomeCategoriesIndex,
    IncomeCategoriesSingle,
    ExpensesIndex,
    ExpensesSingle,
    IncomesIndex,
    IncomesSingle,
    ExpenseReports,
    ProductCategoriesIndex,
    ProductCategoriesSingle,
    ProductTagsIndex,
    ProductTagsSingle,
    ProductsIndex,
    ProductsSingle,
    ContactCompaniesIndex,
    ContactCompaniesSingle,
    ContactContactsIndex,
    ContactContactsSingle,
    CrmStatusesIndex,
    CrmStatusesSingle,
    CrmCustomersIndex,
    CrmCustomersSingle,
    CrmNotesIndex,
    CrmNotesSingle,
    CrmDocumentsIndex,
    CrmDocumentsSingle,
    MapRouteIndex,
    MapRouteSingle
  },
  strict: debug
})
