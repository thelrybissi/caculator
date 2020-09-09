class CalcController {

    constructor() {
        //Atributos da classe, underline simula o private da classe
        this._operation = []
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.currentDate;
        this.initButtonsEvents();
        this.initialize();
    }

    //Função que inicia os metodos ou atributos chamados, primeira coisa que carrega no App
    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }


    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn);
        });
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        if(['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }
    
    addOperation(value){

        if(isNaN(this.getLastOperation())) {
                
            if(this.isOperator(value)) {
            
                this._setLastOperation(value);
            
            } else if(isNaN(value)) {
            
                //console.log(value);
            
            } else {
            
                this._operation.push(value);
                console.log(this._operation);
            }
        } else {
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        }

        console.log(this._operation);
    }

    setError() {
        this.displayCalc = "Error";
    }

    execBtn(value) {
        
        switch(value) {
            case 'ac': 
                this.clearAll();
                break;
            case 'ce': 
                this.clearEntry();
                break;
            case 'soma': 
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.addOperation('=');
                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':                
                this.addOperation(parseInt(value));
                break;

            default: 
                this.setError();
                break;
        }
    }

    initButtonsEvents() {
        
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            
            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",//Formatação da data
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date;
    }

    set currentDate(date) {
        this._currentDate = date;
    }
}