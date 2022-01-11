import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MetricsComponent} from "./components/metrics/metrics.component";
import {ComparisonChartsComponent} from "./components/comparison-charts/comparison-charts.component";
import {DistributionChartsComponent} from "./components/distribution-charts/distribution-charts.component";

const routes: Routes = [
  {path: '', component: MetricsComponent},
  {path: 'comparison', component: ComparisonChartsComponent},
  {path: 'distribution', component: DistributionChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
