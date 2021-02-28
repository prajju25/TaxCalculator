import { Component, OnInit } from '@angular/core';

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
  states: Dropdown[];
  selectedGender: Dropdown;
  gender: Dropdown[];
  tempTax: number = 2400;
  age: number;
  taxCalTab: boolean = false;
  isError: boolean = false;

  constructor() {
    this.states = [
      {name: 'Andhra Pradesh', code: 'AP'},
      {name: 'Gujarat', code: 'GJ'},
      {name: 'Karnataka', code: 'KA'},
      {name: 'Kerala', code: 'KL'},
      {name: 'Maharashtra', code: 'MH'},
      {name: 'Telangana', code: 'TL'},
      {name: 'West Bengal', code: 'WB'}
    ];
    this.gender = [
      {name: 'Male', code: 'M'},
      {name: 'Female', code: 'F'}
    ];
  }

  ngOnInit(): void {
    this.refresh;
  }

  changeView(){
    if(this.age > 0){
      this.taxCalTab = !this.taxCalTab;
      this.isError = false;
    } else {
      this.isError = true;
    }
  }

  refresh(){    
    this.calculateGrossSalary();
    this.calculateExemp();
    this.calculateSec16();
    this.calculategrossTotIncome();
    this.caclulateTotalDeduct();
    this.caclulateTotalDeduct4A();
    this.CalculateTaxPayable();
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
    this.taxOnIncome = this.calculateTax()
    this.taxAfterRebate = this.taxOnIncome > 12000 ? this.taxOnIncome : 0;//changes based on tax regimes
    this.cess = Math.ceil(.04 * this.taxAfterRebate);
    this.annualTaxLiability = this.taxAfterRebate + this.cess;
    this.taxPayable = this.annualTaxLiability - this.taxTillLastMonth;
  }
  calculateTax(): number {//Changes Based on tax regime
    let val = 0;
    let newRegime = false;
    if(!newRegime){//Old Regime for AY 19-20 & 20-21 
      if(this.age < 60){
        if(this.totalTaxIncome > 1000000){
          val += ((this.totalTaxIncome - 1000000) * 0.3) + 72500;
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
      if(this.totalTaxIncome > 1500000){ //New Regime for AY 20-21 
        val += ((this.totalTaxIncome - 1500000) * 0.3) + 187500;
      } else if(this.totalTaxIncome <= 1500000 && this.totalTaxIncome > 1250000){
        val += ((this.totalTaxIncome - 1250000) * 0.25) + 125000;
      } else if(this.totalTaxIncome <= 1250000 && this.totalTaxIncome > 1000000){
        val += ((this.totalTaxIncome - 1000000) * 0.2) + 75000;
      } else if (this.totalTaxIncome <= 1000000 && this.totalTaxIncome > 750000){
        val += ((this.totalTaxIncome - 750000) * 0.15) + 37500;
      } else if (this.totalTaxIncome <= 750000 && this.totalTaxIncome > 500000){
        val += ((this.totalTaxIncome - 500000) * 0.1) + 12500;
      } else if (this.totalTaxIncome <= 500000 && this.totalTaxIncome > 250000){
        val += ((this.totalTaxIncome - 250000) * 0.05);
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
    this.profTax = 2400;
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
    this.tempTax = val;
  }
  clearTax(){
    this.tempTax = null;
    this.selectedState = null;
    this.selectedGender = null;
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
  
  openNext() {
      this.index = (this.index === 6) ? 0 : this.index + 1;
      this.refresh();
  }

  openPrev() {
      this.index = (this.index === 0) ? 6 : this.index - 1;
      this.refresh();
  }

  checkDisabled(index): boolean{
    let isDisabled = true;
    switch(index){
      case 0 : {
        isDisabled = this.grossSalary <= 0;
        break;
      }
      case 2 : {
        isDisabled = this.salAfterSec16 <= 0;
        break;
      }
      case 3 : {
        isDisabled = this.grossTotIncome <= 0;
        break;
      }
      default : {
        isDisabled = this.grossSalary <= 0;
        break;
      }
    }
    return isDisabled;
  }

}

interface Dropdown {
  name: string,
  code: string
}