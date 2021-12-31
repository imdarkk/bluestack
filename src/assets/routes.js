import { Switch, Route } from "react-router-dom";
import Main from "./screens/Main";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Jobs from "./screens/Jobs";
import Stock from "./screens/Stock";
import AddStock from "./screens/AddStock";
import EditProduct from "./screens/EditProduct";
import Checklist from "./screens/Checklist";
import Employees from "./screens/Employees";
import AddTool from "./screens/AddTool";
import Tools from "./screens/Tools";
import EditEmployee from "./screens/EditEmployee";
import EditTool from "./screens/EditTool";
import ManageCars from "./screens/ManageCars";
import AddCar from "./screens/AddCar";
import Invoices from "./screens/Invoices";
import CreateInvoice from "./screens/CreateInvoice";
import EditInvoice from "./screens/EditInvoice";
import InvoiceCustomer from "./screens/InvoiceCustomer";
import Settings from "./screens/Settings";
import CreateQuote from "./screens/CreateQuote";
import ViewChecklistsList from "./screens/ViewChecklistsList";

const UnprotectedRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/invoice/:invoice_id" component={InvoiceCustomer} />
            <Route path="*" component={NotFound} />
        </Switch>
    );
};

const ProtectedRoutes = () => {
    const details = JSON.parse(localStorage.getItem('details'));
    return (
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/stock" component={Stock} />
            <Route exact path="/add/stock" component={AddStock} />
            <Route exact path="/add/car" component={AddCar} />
            <Route exact path="/tools" component={Tools} />
            <Route exact path="/invoices" component={Invoices} />
            <Route exact path="/make/quote" component={CreateQuote} />
            <Route path="/edit/:id" component={EditProduct} />
            <Route path="/tool/edit/:id" component={EditTool} />
            <Route path="/manage/employee/:id" component={EditEmployee} />
            <Route exact path="/manage/cars" component={ManageCars} />
            <Route exact path="/checklists" component={ViewChecklistsList} />
            <Route path="/checklist/:type" component={Checklist} />
            <Route exact path="/add/tools" component={AddTool} />
            <Route exact path="/create/invoice" component={CreateInvoice} />
            <Route path="/invoice/:id" component={EditInvoice} />
            {details.role === "admin" && (
                <>
                    <Route exact path="/employees" component={Employees} />
                    <Route exact path="/settings" component={Settings} />
                </>
            )}
            <Route path="*" component={NotFound} />
        </Switch>
    );
};

export { UnprotectedRoutes, ProtectedRoutes };
