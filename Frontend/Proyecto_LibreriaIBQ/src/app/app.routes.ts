import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UsuariosComponent } from './components/admin-view/usuarios/usuarios.component';
import { DocumentosComponent } from './components/admin-view/documentos/documentos.component';
import { CategoriasComponent } from './components/admin-view/categorias/categorias.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user-view', component: UserViewComponent },
    {
        path: 'admin', component: AdminViewComponent,
        children: [
            { path: '', component: UsuariosComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'documentos', component: DocumentosComponent },
            { path: 'categorias', component: CategoriasComponent },
        ]
    },
];
