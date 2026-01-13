import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Form } from './components/form/form';
import { Cadastro } from './components/cadastro/cadastro';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "form",
        component: Form
    },
    {
        path: "cadastro",
        component: Cadastro
    },
    {
        path: '',
        redirectTo: 'cadastro',
        pathMatch: 'full',
    }
];
