
let styleSheet = document.styleSheets[0]
const resultsSection = document.getElementById("yourResults")
const resultsHeadings = document.getElementById("results-headings")
const results = document.getElementById("yourResults");
const originalHTML = results.innerHTML


document.getElementById("form").addEventListener("submit", handleSubmit); 

function handleSubmit(e){
    
    e.preventDefault()
   
    const mortgageAmount = document.getElementById("mtgAmt").value.trim();
    const mortgageTerm = document.getElementById("mtgTerm").value.trim();
    const interestRate = document.getElementById("intRate").value.trim();
    const repayRadio = document.getElementById("repayment");
    const interestRadio = document.getElementById("interest_only");
    const  isFormGood = validateform()


   if (isFormGood) {
        if(repayRadio.checked){
            repayment(mortgageAmount,interestRate,mortgageTerm)
            console.log('repayment is processed')
            styleResults()
        } else{
            interestOnly(mortgageAmount,interestRate,mortgageTerm)
            console.log('interest is was processed')
            styleResults()
  
        }

   } else{
        console.log('Shit is not valid bro');
   }

  
   
   document.getElementById("mtgAmt").addEventListener("input", validateform);
   document.getElementById("mtgTerm").addEventListener("input", validateform);
   document.getElementById("intRate").addEventListener("input", validateform);
   document.getElementById("interest_only").addEventListener("change", validateform);
   document.getElementById("repayment").addEventListener("change", validateform);

}

function validateform (){

    const mortgageAmount = document.getElementById("mtgAmt").value.trim();
    const mortgageTerm = document.getElementById("mtgTerm").value.trim();
    const interestRate = document.getElementById("intRate").value.trim();
    const repayRadio = document.getElementById("repayment");
    const interestRadio = document.getElementById("interest_only");


    const numRegex = /^\d+(\.\d+)?$/;
    let isValid = true;


    if (!numRegex.test(mortgageAmount)){
        console.log(mortgageAmount)
        isValid = false;
        document.getElementById("mortgage-error-msg").classList.add("error-msg");
        document.getElementById("mortgage-amount-input").classList.add("input-border-error-state");
        document.getElementById("dollar-sign").classList.add("symbol-error-state");
       
    }else{
        console.log("mortgage amount is okay");
        console.log("updated input");
        document.getElementById("mortgage-error-msg").classList.remove("error-msg");
        document.getElementById("mortgage-amount-input").classList.remove("input-border-error-state");
        document.getElementById("dollar-sign").classList.remove("symbol-error-state");
    }


    if (!numRegex.test(mortgageTerm)){
        isValid = false;
        document.getElementById("mortgage-term-error").classList.add("error-msg");
        document.getElementById("mortgage-term-input").classList.add("input-border-error-state");
        document.getElementById("years").classList.add("symbol-error-state");
       
    }else{
        console.log("mortgage term is okay!");
        document.getElementById("mortgage-term-error").classList.remove("error-msg");
        document.getElementById("mortgage-term-input").classList.remove("input-border-error-state");
        document.getElementById("years").classList.remove("symbol-error-state");
    }

    if(!numRegex.test(interestRate)){
        isValid = false;
        document.getElementById("interest-error-msg").classList.add("error-msg");
        document.getElementById("mortgage-interest-input").classList.add("input-border-error-state");
        document.getElementById("percentage").classList.add("symbol-error-state");
        console.log(interestRate)
        
    } else{
        console.log("interest rate is okay!");
        document.getElementById("interest-error-msg").classList.remove("error-msg");
        document.getElementById("mortgage-interest-input").classList.remove("input-border-error-state");
        document.getElementById("percentage").classList.remove("symbol-error-state");
    }

    if(!(repayRadio.checked || interestRadio.checked)){
        isValid = false;
        document.getElementById("type-error").classList.add("error-msg");
        
        
    } else{
        console.log("mortgage type was selected");
        document.getElementById("type-error").classList.remove("error-msg");
        console.log('form ran again ')
    }

    if (!isValid){
        console.log('not valid try again')
    }else if(isValid){
        console.log("form is good to go")
        return isValid
    }
}



function repayment(amount,interest,years){
    let p = amount; 
    let r = (interest / 12) / 100;
    let n = years * 12; 
    let emi = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    let totalPay = emi * n;
    const results = document.getElementById("yourResults");
    results.innerHTML = getResultsTemplate();
    document.getElementById("monthly-repay").innerText = emi.toLocaleString("en-US", { style: "currency", currency: "USD" });
    document.getElementById("total-repay").innerText = totalPay.toLocaleString("en-US", { style: "currency", currency: "USD" });
    

}



function interestOnly(amount,interest,years){
    let p = amount;
    let r = (interest / 12) / 100;
    let monthlyInterest = p * r;
    let totalInterest = (amount * (interest / 100)) * years;
    const results = document.getElementById("yourResults");
    results.innerHTML = getResultsTemplate();
    document.getElementById("monthly-repay").innerText = monthlyInterest.toLocaleString("en-US", { style: "currency", currency: "USD" });
    document.getElementById("total-repay").innerText = totalInterest.toLocaleString("en-US", { style: "currency", currency: "USD" });
    
   
}

function getResultsTemplate() {
    return `
      <p id='results-title'>Your Results</p> 
      <p class='results-headings a'>Your results are shown below based on the information you provided. 
      To adjust the results, edit the form and click 'calculate repayments' again.
      </p> 
      <div id='answer-box'> 
        <p class='answer-title results-headings'>Your monthly repayments</p> 
        <div id='monthly-repay'></div> 
        <div class='line-break'></div> 
        <p class='answer-title results-headings'>Total you'll repay over the term</p> 
        <div id='total-repay'></div>
      </div>
    `;
  }

function styleResults(){
    resultsSection.style.display = "flex";
    resultsSection.style.textAlign = "left";
    resultsSection.style.justifyContent = "flex-start";
    

    
}

function resetResultsStyle() {
    resultsSection.style.display = "";
    resultsSection.style.textAlign = "";
    resultsSection.style.justifyContent = "";
    document.getElementById("mortgage-error-msg").classList.remove("error-msg");
  document.getElementById("mortgage-error-msg").style.display = "none";
  document.getElementById("mortgage-amount-input").classList.remove("input-border-error-state");
  document.getElementById("dollar-sign").classList.remove("symbol-error-state");

  document.getElementById("mortgage-term-error").classList.remove("error-msg");
  document.getElementById("mortgage-term-error").style.display = "none";
  document.getElementById("mortgage-term-input").classList.remove("input-border-error-state");
  document.getElementById("years").classList.remove("symbol-error-state");

  document.getElementById("interest-error-msg").classList.remove("error-msg");
  document.getElementById("interest-error-msg").style.display = "none";
  document.getElementById("mortgate-interest-input").classList.remove("input-border-error-state");
  document.getElementById("percentage").classList.remove("symbol-error-state");

  document.getElementById("type-error").classList.remove("error-msg");
  document.getElementById("type-error").style.display = "none";
  console.log("error state removed")
  }

  const form = document.getElementById("form");
  document.getElementById("clear").addEventListener("click", () => {
  document.getElementById("form").removeEventListener("submit", handleSubmit);
  document.getElementById("mtgAmt").removeEventListener("input", validateform);
  document.getElementById("mtgTerm").removeEventListener("input", validateform);
  document.getElementById("intRate").removeEventListener("input", validateform);
  document.getElementById("repayment").removeEventListener("change", validateform);
  document.getElementById("interest_only").removeEventListener("change", validateform);    
  
  form.reset();
  results.innerHTML = originalHTML;
  resetResultsStyle()

    document.getElementById("form").addEventListener("submit", handleSubmit);
    document.getElementById("mtgAmt").addEventListener("input", validateform);
    document.getElementById("mtgTerm").addEventListener("input", validateform);
    document.getElementById("intRate").addEventListener("input", validateform);
    document.getElementById("repayment").addEventListener("change", validateform);
    document.getElementById("interest_only").addEventListener("change", validateform);

})