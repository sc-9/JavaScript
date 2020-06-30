document.getElementById('loan-form').addEventListener('submit', function(e) {
    //Hide results
    document.getElementById('results').style.display = 'none';
    //Show Loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 1000);
    e.preventDefault();
});

function calculateResults() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calcPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calcInterest, calcPayments);
    const calcMonthlyPayments = (principle * x * calcInterest) / (x-1);
    if(isFinite(calcMonthlyPayments)) {
        monthlyPayment.value  = calcMonthlyPayments.toFixed(2);
        totalPayment.value = (calcMonthlyPayments * calcPayments).toFixed(2);
        totalInterest.value = ((calcMonthlyPayments * calcPayments) - principle).toFixed(2);
        
        //Show calculation results
        document.getElementById('results').style.display = 'block';

        //Hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers')
        document.getElementById('loading').style.display = 'none';
    }
}

function showError(error) {
    //Hide results and loader
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    //Create a div element
    const errorDiv = document.createElement('div');

    //Get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add classname
    errorDiv.className = 'alert alert-danger';

    //Create a TextNode and append the child
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //Clear error after 3sec
    setTimeout(clearError, 2000);
}

function clearError() {
    document.querySelector('.alert').remove();
}