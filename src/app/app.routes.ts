import { Routes } from '@angular/router';
import { NewEnquiry } from './pages/new-enquiry/new-enquiry';
import { StatusMaster } from './pages/status-master/status-master';
import { CategoryMaster } from './pages/category-master/category-master';
import { EnquiryList } from './pages/enquiry-list/enquiry-list';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: EnquiryList,
        canActivate:[authGuard]
    },
     {
        path: 'new-inquiry',
        component: NewEnquiry,
        canActivate:[authGuard]
    },
     {
        path: 'login',
        component: Login,
    },
    {
        path: 'status',
        component: StatusMaster,
        canActivate:[authGuard]
    },
    {
        path: 'enquiry-list',
        component: EnquiryList,
        canActivate:[authGuard]
    },
    {
        path: 'category',
        component: CategoryMaster,
        canActivate:[authGuard]
    }
];
