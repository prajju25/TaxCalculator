import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common-serv.service';

@Component({
  selector: 'app-tax-report',
  templateUrl: './tax-report.component.html',
  styleUrls: ['./tax-report.component.scss']
})
export class TaxReportComponent implements OnInit {

  oldRegime = {};
  newRegime = {};
  isLoading: boolean = false;
  constructor(private serv: CommonService) { }

  ngOnInit(): void {
    let report = JSON.parse(sessionStorage.getItem('taxReport'));
    if(report){
      this.oldRegime = report['oldRegime'];
      this.newRegime = report['newRegime'];
    }
    this.serv.dataShare.subscribe(val => {
      let params = val['taxReport'];
      if(params){
        this.oldRegime = params['oldRegime'];
        this.newRegime = params['newRegime'];
        sessionStorage.setItem('taxReport', JSON.stringify(params));
        this.isLoading = false;
      } else {        
        this.isLoading = true;
      }
    });
  }

}
