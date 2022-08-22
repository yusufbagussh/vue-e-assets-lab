import { createRouter, createWebHistory } from "vue-router";
//Login
import Login from "../views/Login/Index.vue";
//Dashboard
import Dashboard from "../views/DashboardView.vue";
//Item
import Item from "../views/Item/Index.vue";
import AddItem from "../views/Item/AddItem.vue";
import EditItem from "../views/Item/EditItem.vue";
//Location
import Location from "../views/Location/Index.vue";
import AddLocation from "../views/Location/Add.vue";
import EditLocation from "../views/Location/Edit.vue";
// //Major
import Major from "../views/major/Index.vue";
import AddMajor from "../views/major/Add.vue";
import EditMajor from "../views/major/Edit.vue";
//Borrower
import Borrower from "../views/borrower/Index.vue";
import AddBorrower from "../views/borrower/Add.vue";
import EditBorrower from "../views/borrower/Edit.vue";
//Role
import Role from "../views/role/Index.vue";
import AddRole from "../views/role/Add.vue";
import EditRole from "../views/role/Edit.vue";
//User
import User from "../views/user/Index.vue";
import AddUser from "../views/user/Add.vue";
import EditUser from "../views/user/Edit.vue";
//Transaction
import Transaction from "../views/transaction/Index.vue";
import AddTransaction from "../views/transaction/Add.vue";
import EditTransaction from "../views/transaction/Edit.vue";
// //DetailTransaction
// import DetailTransaction from "../views/detailTransaction/Index.vue";
// import AddDetailTransaction from "../views/detailTransaction/Add.vue";
// import EditDetailTransaction from "../views/detailTransaction/Edit.vue";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/item",
    name: "Item",
    component: Item,
  },
  {
    path: "/additem",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/edititem/:id",
    name: "EditItem",
    component: EditItem,
  },
  {
    path: "/location",
    name: "Location",
    component: Location,
  },
  {
    path: "/addlocation",
    name: "AddLocation",
    component: AddLocation,
  },
  {
    path: "/editlocation/:id",
    name: "EditLocation",
    component: EditLocation,
  },
  {
    path: "/major",
    name: "Major",
    component: Major,
  },
  {
    path: "/addMajor",
    name: "AddMajor",
    component: AddMajor,
  },
  {
    path: "/editmajor/:id",
    name: "EditMajor",
    component: EditMajor,
  },
  {
    path: "/borrower",
    name: "Borrower",
    component: Borrower,
  },
  {
    path: "/addborrower",
    name: "AddBorrower",
    component: AddBorrower,
  },
  {
    path: "/editborrower/:id",
    name: "EditBorrower",
    component: EditBorrower,
  },
  {
    path: "/role",
    name: "Role",
    component: Role,
  },
  {
    path: "/role/add",
    name: "AddRole",
    component: AddRole,
  },
  {
    path: "/role/edit/:id",
    name: "EditRole",
    component: EditRole,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/user/add",
    name: "AddUser",
    component: AddUser,
  },
  {
    path: "/user/edit/:id",
    name: "EditUser",
    component: EditUser,
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Transaction,
  },
  {
    path: "/transaction/add",
    name: "AddTransaction",
    component: AddTransaction,
  },
  {
    path: "/transaction/edit/:id",
    name: "EditTransaction",
    component: EditTransaction,
  },
  // {
  //   path: "/detail/transaction",
  //   name: "DetailTransaction",
  //   component: DetailTransaction,
  // },
  // {
  //   path: "/detailtransaction/add",
  //   name: "AddDetailTransaction",
  //   component: AddDetailTransaction,
  // },
  // {
  //   path: "/detailtransaction/edit/:id",
  //   name: "EditDetailTransaction",
  //   component: EditDetailTransaction,
  // },
];

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
