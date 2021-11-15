import { RouterModule } from '@angular/router';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';


const appRoutes = [
    { path: 'speech', component: SpeechToTextComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);