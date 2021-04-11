import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common-serv.service';

import {Dropdown} from '../../interfaces/dropdown';

@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.scss']
})
export class TaxCalculatorComponent implements OnInit {

  index: number = 0;
  basic: number = 0;
  hra: number = 0;
  transport: number = 0;
  adhocAllowance: number = 0;
  otherAllowance: number = 0;
  nsa: number = 0;
  meals: number = 0;
  variable: number = 0;
  onCallAllowance: number = 0;
  giftVoucher: number = 0;
  lta: number = 0;
  statBonus: number = 0;
  prevIncome: number = 0;
  ltaExempt: number = 0;
  rentPaid: number = 0;
  hraExempt: number = 0;
  transportExempt: number = 0;
  leaveEncash: number = 0;
  standardDeduct: number = 0;
  profTax: number = 0;
  prevPT: number = 0;
  lossSelfProperty: number = 0;
  incomeProperty: number = 0;
  otherIncome: number = 0;
  pf: number = 0;
  vpf: number = 0;
  ppf: number = 0;
  nsc: number = 0;
  ctd: number = 0;
  hsgLoan: number = 0;
  tutionFee: number = 0;
  elss: number = 0;
  lic: number = 0;
  ulip: number = 0;
  annuityPlan: number = 0;
  pension80CCC: number = 0;
  prevPF: number = 0;
  fixedDeposit: number = 0;
  sukanyaSamriddhi: number = 0;
  nps: number = 0;
  medicalInsurance: number = 0;
  medicalInsuranceParent: number = 0;
  handicap: number = 0;
  medicalDisease: number = 0;
  educationLoan: number = 0;
  phyDisable: number = 0;
  homeLoan: number = 0;
  nps80CCD1B: number = 0;
  nps80CCD2: number = 0;
  additionalHomeLoan: number = 0;
  elecVehicle: number = 0;
  totalTaxIncome: number = 0;
  taxOnIncome: number = 0;
  taxAfterRebate: number = 0;
  surcharge: number = 0;
  cess: number = 0;
  annualTaxLiability: number = 0;
  taxTillLastMonth: number = 0;
  taxPrevEmployer: number = 0;
  taxPayable: number = 0;

  grossSalary: number = 0;
  totalExemp: number = 0;
  salAfterSec16: number = 0;
  grossTotIncome: number = 0; 
  totalInvestment: number = 0;
  totalDeduct: number = 0;
  otherDeduct4A: number = 0;

  disabled: boolean = true;
  selectedState: Dropdown;
  selectedGender: Dropdown;
  age: number;
  name: string;
  isLoading: boolean = true;

  constructor(private router: Router, private serv: CommonService) {
  }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('userInfo'))
    if(user){
      this.name = user['name']
      this.age = user['age'];
      this.selectedState = user['state'];
      this.selectedGender = user['gender'];
      let val = sessionStorage.getItem('user-'+this.name);
      if(val != null){
        this.fetchTaxInfo(JSON.parse(val));
      } else {
        this.fetchTaxInfo(0);
      }
      this.refresh();
    }
    this.serv.dataShare.subscribe(val => {
      let params = val['user'];
      if(params){
        this.name = params['name']
        this.age = params['age'];
        this.selectedState = params['state'];
        this.selectedGender = params['gender'];
        let val = sessionStorage.getItem('user-'+this.name);
        if(val != null){
          this.fetchTaxInfo(JSON.parse(val));
        } else {
          this.fetchTaxInfo(0);
        }
        this.isLoading = false;
      } else {        
        this.isLoading = true;
      }
    });
    this.isLoading = false;
  }

  refresh(){    
    this.calculateGrossSalary();
    this.calculateExemp();
    this.calculateSec16();
    this.calculategrossTotIncome();
    this.caclulateTotalDeduct();
    this.caclulateTotalDeduct4A();
    this.CalculateTaxPayable();
    this.retainTaxInfo();
  }

  fetchTaxInfo(val){
    this.basic = val ? val['basic'] : val;
    this.hra = val ? val['hra'] : val;
    this.transport = val ? val['transport'] : val;
    this.adhocAllowance = val ? val['adhocAllowance'] : val;
    this.otherAllowance = val ? val['otherAllowance'] : val;
    this.nsa = val ? val['nsa'] : val;
    this.meals = val ? val['meals'] : val;
    this.variable = val ? val['variable'] : val;
    this.onCallAllowance = val ? val['onCallAllowance'] : val;
    this.giftVoucher = val ? val['giftVoucher'] : val;
    this.lta = val ? val['lta'] : val;
    this.statBonus = val ? val['statBonus'] : val;
    this.prevIncome = val ? val['prevIncome'] : val;
    this.ltaExempt = val ? val['ltaExempt'] : val;
    this.rentPaid = val ? val['rentPaid'] : val;
    this.transportExempt = val ? val['transportExempt'] : val;
    this.leaveEncash = val ? val['leaveEncash'] : val;
    this.prevPT = val ? val['prevPT'] : val;
    this.lossSelfProperty = val ? val['lossSelfProperty'] : val;
    this.incomeProperty = val ? val['incomeProperty'] : val;
    this.otherIncome = val ? val['otherIncome'] : val;
    this.pf = val ? val['pf'] : val;
    this.vpf = val ? val['vpf'] : val;
    this.ppf = val ? val['ppf'] : val;
    this.nsc = val ? val['nsc'] : val;
    this.ctd = val ? val['ctd'] : val;
    this.hsgLoan = val ? val['hsgLoan'] : val;
    this.tutionFee = val ? val['tutionFee'] : val;
    this.elss = val ? val['elss'] : val;
    this.lic = val ? val['lic'] : val;
    this.ulip = val ? val['ulip'] : val;
    this.annuityPlan = val ? val['annuityPlan'] : val;
    this.pension80CCC = val ? val['pension80CCC'] : val;
    this.prevPF = val ? val['prevPF'] : val;
    this.fixedDeposit = val ? val['fixedDeposit'] : val;
    this.sukanyaSamriddhi = val ? val['sukanyaSamriddhi'] : val;
    this.nps = val ? val['nps'] : val;
    this.medicalInsurance = val ? val['medicalInsurance'] : val;
    this.medicalInsuranceParent = val ? val['medicalInsuranceParent'] : val;
    this.handicap = val ? val['handicap'] : val;
    this.medicalDisease = val ? val['medicalDisease'] : val;
    this.educationLoan = val ? val['educationLoan'] : val;
    this.phyDisable = val ? val['phyDisable'] : val;
    this.homeLoan = val ? val['homeLoan'] : val;
    this.nps80CCD1B = val ? val['nps80CCD1B'] : val;
    this.nps80CCD2 = val ? val['nps80CCD2'] : val;
    this.additionalHomeLoan = val ? val['additionalHomeLoan'] : val;
    this.elecVehicle = val ? val['elecVehicle'] : val;
    this.refresh();
  }

  retainTaxInfo(){
    let obj = {
      basic: this.basic,
      hra: this.hra,
      transport: this.transport,
      adhocAllowance: this.adhocAllowance,
      otherAllowance: this.otherAllowance,
      nsa: this.nsa,
      meals: this.meals,
      variable: this.variable,
      onCallAllowance: this.onCallAllowance,
      giftVoucher: this.giftVoucher,
      lta: this.lta,
      statBonus: this.statBonus,
      prevIncome: this.prevIncome,
      ltaExempt: this.ltaExempt,
      rentPaid: this.rentPaid,
      transportExempt: this.transportExempt,
      leaveEncash: this.leaveEncash,
      prevPT: this.prevPT,
      lossSelfProperty: this.lossSelfProperty,
      incomeProperty: this.incomeProperty,
      otherIncome: this.otherIncome,
      pf: this.pf,
      vpf: this.vpf,
      ppf: this.ppf,
      nsc: this.nsc,
      ctd: this.ctd,
      hsgLoan: this.hsgLoan,
      tutionFee: this.tutionFee,
      elss: this.elss,
      lic: this.lic,
      ulip: this.ulip,
      annuityPlan: this.annuityPlan,
      pension80CCC: this.pension80CCC,
      prevPF: this.prevPF,
      fixedDeposit: this.fixedDeposit,
      sukanyaSamriddhi: this.sukanyaSamriddhi,
      nps: this.nps,
      medicalInsurance: this.medicalInsurance,
      medicalInsuranceParent: this.medicalInsuranceParent,
      handicap: this.handicap,
      medicalDisease: this.medicalDisease,
      educationLoan: this.educationLoan,
      phyDisable: this.phyDisable,
      homeLoan: this.homeLoan,
      nps80CCD1B: this.nps80CCD1B,
      nps80CCD2: this.nps80CCD2,
      additionalHomeLoan: this.additionalHomeLoan,
      elecVehicle: this.elecVehicle
    }
    sessionStorage.setItem('user-'+this.name, JSON.stringify(obj));
  }

  everyChange(index){
    if(index == 0){
      this.calculateGrossSalary();
    } else if(index == 1){
      this.calculateExemp();
    } else if(index == 2){
      this.calculateSec16();
    } else if(index == 3){
      this.calculategrossTotIncome();
    } else if(index == 4){
      this.caclulateTotalDeduct();
    } else if(index == 5){
      this.caclulateTotalDeduct4A();
    } else if(index == 6){
      this.CalculateTaxPayable();
    } else if(index == -1){
      this.refresh();
    }
  }

  CalculateTaxPayable() {
    this.totalTaxIncome = this.grossTotIncome - this.totalDeduct - this.otherDeduct4A;
    this.taxOnIncome = this.calculateTax(false, null);
    this.taxAfterRebate = this.taxOnIncome > 12000 ? this.taxOnIncome : 0;//changes based on tax regimes
    this.cess = Math.ceil(.04 * this.taxAfterRebate);
    this.annualTaxLiability = this.taxAfterRebate + this.cess;
    this.taxPayable = this.annualTaxLiability - this.taxTillLastMonth;
  }
  calculateTax(newRegime, income): number {//Changes Based on tax regime
    let val = 0;
    if(!newRegime){//Old Regime for AY 19-20 & 20-21 
      if(this.age < 60){
        if(this.totalTaxIncome > 1000000){
          val += ((this.totalTaxIncome - 1000000) * 0.3) + 112500;
        } else if (this.totalTaxIncome <= 1000000 && this.totalTaxIncome > 500000){
          val += ((this.totalTaxIncome - 500000) * 0.2) + 12500;
        } else if (this.totalTaxIncome <= 500000 && this.totalTaxIncome > 250000){
          val += ((this.totalTaxIncome - 250000) * 0.05);
        }
      } else if (this.age >=60 && this.age <=80){
        if(this.totalTaxIncome > 1000000){
          val += ((this.totalTaxIncome - 1000000) * 0.3) + 110000;
        } else if (this.totalTaxIncome <= 1000000 && this.totalTaxIncome > 500000){
          val += ((this.totalTaxIncome - 500000) * 0.2) + 10000;
        } else if (this.totalTaxIncome <= 500000 && this.totalTaxIncome > 300000){
          val += ((this.totalTaxIncome - 300000) * 0.05);
        }
      } else {
        if(this.totalTaxIncome > 1000000){
          val += ((this.totalTaxIncome - 1000000) * 0.3) + 100000;
        } else if (this.totalTaxIncome <= 1000000 && this.totalTaxIncome > 500000){
          val += ((this.totalTaxIncome - 500000) * 0.2);
        }
      }
    } else {
      if(income > 1500000){ //New Regime for AY 20-21 
        val += ((income - 1500000) * 0.3) + 187500;
      } else if(income <= 1500000 && income > 1250000){
        val += ((income - 1250000) * 0.25) + 125000;
      } else if(income <= 1250000 && income > 1000000){
        val += ((income - 1000000) * 0.2) + 75000;
      } else if (income <= 1000000 && income > 750000){
        val += ((income - 750000) * 0.15) + 37500;
      } else if (income <= 750000 && income > 500000){
        val += ((income - 500000) * 0.1) + 12500;
      } else if (income <= 500000 && income > 250000){
        val += ((income - 250000) * 0.05);
      }
    }
    return Math.ceil(val);
  }
  caclulateTotalDeduct4A() {
    //this.nps80CCD2 = calculate
    this.otherDeduct4A = this.medicalInsurance + this.medicalInsuranceParent + this.handicap + this.medicalDisease 
    + this.educationLoan + this.phyDisable + this.homeLoan + this.nps80CCD1B + this.nps80CCD2 + this.additionalHomeLoan 
    + this.elecVehicle;
  }
  caclulateTotalDeduct() {
    this.totalInvestment = this.pf + this.vpf + this.ppf + this.nsc + this.ctd + this.hsgLoan + this.tutionFee + this.elss 
    + this.lic + this.ulip + this.annuityPlan + this.pension80CCC + this.prevPF + this.fixedDeposit + this.sukanyaSamriddhi + this.nps;
    if(this.totalInvestment >= 150000){
      this.totalDeduct = 150000
    } else {
      this.totalDeduct = this.totalInvestment;
    }
  }

  calculategrossTotIncome(){
    this.grossTotIncome = this.salAfterSec16 - (this.lossSelfProperty + this.incomeProperty + this.otherIncome);
  }
  calculateSec16() {
    this.standardDeduct = this.grossSalary > 50000 ? 50000 : this.grossSalary;//Dynamic changes per tax regime
    this.profTax = this.calculateProfessionalTax();
    let val = this.totalExemp + this.standardDeduct + this.profTax + this.prevPT;
    this.salAfterSec16 = this.grossSalary > val ? this.grossSalary - val : 0;
  }
  calculateProfessionalTax() {
    let val = 0;
    if(this.selectedState.code == 'AP'){
      val = 12 * (this.grossSalary >= (20000*12) ? 200 : (this.grossSalary < (15000*12) ? 0 : 150))
    } else if (this.selectedState.code == 'GJ'){
      val = 12 * (this.grossSalary >= (12000*12) ? 200 : (this.grossSalary >= (9000*12) ? 150 : (this.grossSalary < (6000*12) ? 0 : 80)))
    } else if (this.selectedState.code == 'KA'){
      val = 12 * (this.grossSalary > (15000*12) ? 200 : 0)
    } else if (this.selectedState.code == 'KL'){
      val = 12 * (this.grossSalary >= (125000*12) ? 1250 : (this.grossSalary >= (100000*12) ? 1000 : 
      (this.grossSalary >= (75000*12) ? 750 : (this.grossSalary >= (60000*12) ? 600 : (this.grossSalary >= (45000*12) ? 450 : 
      (this.grossSalary >= (30000*12) ? 300 : (this.grossSalary >= (18000*12) ? 180 : (this.grossSalary >= (12000*12) ? 120 : 0))))))))
    } else if (this.selectedState.code == 'MH'){
      val = (this.grossSalary >= (10000*12) ? (200*11)+300 : 
      (this.grossSalary >= (7500*12) && this.selectedGender.code == 'M' ? 175 * 12 : 0))        
    } else if (this.selectedState.code == 'TL'){
      val = 12 * (this.grossSalary > (20000*12) ? 200 : (this.grossSalary <= (15000*12) ? 0 : 150))      
    } else if (this.selectedState.code == 'WB'){
      val = 12 * (this.grossSalary > (40000*12) ? 200 : (this.grossSalary > (25000*12) ? 150 : 
      (this.grossSalary > (15000*12) ? 130 : (this.grossSalary <= (10000*12) ? 0 : 110))))
    }
    return val;
  }
  calculateExemp() {
    let val = Math.ceil(this.rentPaid - (.10 * this.basic));
    this.hraExempt = val > 0 ? val : 0;
    this.totalExemp = this.ltaExempt + this.hraExempt + this.transportExempt + this.leaveEncash;
  }

  calculateGrossSalary() {
    this.grossSalary = this.basic + this.hra + this.transport + this.adhocAllowance + this.otherAllowance + this.nsa 
    + this.meals + this.variable + this.onCallAllowance + this.giftVoucher + this.lta + this.statBonus + this.prevIncome;
  }

  clickTab(index1){
    console.log(index1);
    console.log(this.index);
  }
  
  openNext() {
      this.index = (this.index === 6) ? 0 : this.index + 1;
      this.refresh();
  }

  openPrev() {
      this.index = (this.index === 0) ? 6 : this.index - 1;
      this.refresh();
  }

  viewReport(){
    let tax = this.calculateTax(true, this.grossSalary);
    let rebate = tax > 12000 ? tax : 0;
    let cess = Math.ceil(.04 * rebate);
    let annualTax = rebate + cess;
    let report = {
      oldRegime: {
        grossSalary: this.grossTotIncome,
        section80C: this.totalDeduct,
        section4A: this.otherDeduct4A,
        taxableIncome: this.totalTaxIncome,
        incomeTax: this.taxOnIncome,
        cess: this.cess,
        totalTax: this.annualTaxLiability
      },
      newRegime: {
        grossSalary: this.grossSalary,
        taxableIncome: this.grossSalary,
        incomeTax: tax,
        cess: cess,
        totalTax: annualTax
      }
    }
    this.serv.dataShare.next({'taxReport': report});
    this.router.navigate(['/taxreport']);
  }

}