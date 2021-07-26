import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { ListWaitingComponent } from './list-waiting/list-waiting.component'
import { DetailsWaitingComponent } from './details-waiting/details-waiting.component'
import { HeaderComponent } from './header/header.componemt'
import { LoginService} from './services/login.service'
import { AuthGuard } from './guard/AuthGuard'
import { WaitingService } from './services/waiting.service'
import { WaitingFilterPipe } from './pipe/WaitingFilterPipe' 
import { WaitingEditComponent} from './waiting-edit/waiting-edit.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListWaitingComponent,
    DetailsWaitingComponent,
    HeaderComponent,
    WaitingFilterPipe, 
    WaitingEditComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'list-waiting', component: ListWaitingComponent, canActivate: [AuthGuard] }, 
      { path: 'register', component: RegisterComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    { path: 'detail-waiting', component: DetailsWaitingComponent },
    ])
  ],
  providers: [LoginService, AuthGuard, WaitingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
