import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Form } from './components/form/form';
import { Login } from './components/login/login';

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
        path: 'login',
        loadComponent: () =>
            import('./components/login/login')
                .then(m => m.Login)
    },
    {
        path: 'area-paciente',
        loadComponent: () =>
            import('./components/area-paciente/area-paciente')
                .then(m => m.AreaPaciente),
        children: [
            {
            path: '',
            loadComponent: () =>
                import('./components/area-paciente/painel/painel')
                    .then(m => m.Painel)
            },
            {
            path: 'selecione-pagamento',
            loadComponent: () =>
                import('./components/area-paciente/selecione-pagamento/selecione-pagamento')
                    .then(m => m.SelecionePagamento)
            },
            {
            path: 'pagamento-pix',
            loadComponent: () =>
                import('./components/area-paciente/pagamento-pix/pagamento-pix')
                    .then(m => m.PagamentoPix)
            },
            {
            path: 'pagamento-cartao',
            loadComponent: () =>
                import('./components/area-paciente/pagamento-cartao/pagamento-cartao')
                .then(m => m.PagamentoCartao)
            }
        ]
        },
        { path: '', redirectTo: 'login', pathMatch: 'full' }
];