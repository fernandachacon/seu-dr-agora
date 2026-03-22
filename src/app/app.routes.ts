import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./components/home/home').then(m => m.Home),
    },
    {
        path: 'form',
        loadComponent: () => import('./components/form/form').then(m => m.Form),
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login),
    },
    {
        path: 'agendamento-publico',
        loadComponent: () => import('./components/agendamento-publico/agendamento-publico').then(m => m.AgendamentoPublico),
    },
    {
        path: 'esqueceu-senha',
        loadComponent: () => import('./components/esqueceu-senha/esqueceu-senha').then(m => m.EsqueceuSenha),
    },
    {
        path: 'redefinir-senha',
        loadComponent: () => import('./components/redefinir-senha/redefinir-senha').then(m => m.RedefinirSenha),
    },
    {
        path: 'area-paciente',
        loadComponent: () =>
        import('./components/area-paciente/area-paciente').then(m => m.AreaPaciente),
        children: [
        {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
            import('./components/area-paciente/painel/painel').then(m => m.Painel),
        },
        {
            path: 'selecione-pagamento',
            loadComponent: () =>
            import('./components/area-paciente/selecione-pagamento/selecione-pagamento')
                .then(m => m.SelecionePagamento),
        },
        {
            path: 'pagamento-pix',
            loadComponent: () =>
            import('./components/area-paciente/pagamento-pix/pagamento-pix')
                .then(m => m.PagamentoPix),
        },
        {
            path: 'pagamento-cartao',
            loadComponent: () =>
            import('./components/area-paciente/pagamento-cartao/pagamento-cartao')
                .then(m => m.PagamentoCartao),
        },
        {
            path: 'agendamentos',
            loadComponent: () =>
            import('./components/area-paciente/agendamentos/agendamentos')
                .then(m => m.Agendamentos),
        },
        {
            path: 'prontuario',
            loadComponent: () =>
            import('./components/area-paciente/prontuario/prontuario')
                .then(m => m.Prontuario),
        },
        {
            path: 'minhas-consultas',
            loadComponent: () =>
            import('./components/area-paciente/minhas-consultas/minhas-consultas')
                .then(m => m.MinhasConsultas),
        },
        ],
    },

    // se cair em qualquer rota inexistente:
    { path: '**', redirectTo: 'login' },
];