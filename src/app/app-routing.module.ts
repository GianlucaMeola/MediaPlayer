import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from "./pages/player/player.component";
import { UploadComponent } from './pages/upload/upload.component';


const routes: Routes = [
  { path: "", component: PlayerComponent },
  { path: "player", component: PlayerComponent },
  { path: "upload", component: UploadComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
