(function() {
  var $input, calculate, decrement, getInput, getValue, increment, input, inputs, renderCalcuation, results1;
  inputs = {
    "number_of_devs": "number_of_devs",
    "onboarding_time": "onboarding_time",
    "hours_spent_per_hire": "hours_spent_per_hire",
    "projected_hires": "projected_hires",
    "sysadmins_count": "sysadmins_count",
    "hours_spent_per_dev": "hours_spent_per_dev",
    "hourly_rate": "hourly_rate"
  };
  getInput = function(name) {
    return $("[name=\"" + name + "\"]");
  };
  getValue = function(name) {
    return parseInt(getInput(name).val(), 10);
  };
  decrement = function(event) {
    var step;
    event.preventDefault();
    event.stopPropagation();
    step = parseInt(this.data('step'), 10) || 1;
    this.val(Math.max(parseInt(this.val(), 10) - step, 0));
    return this.trigger('change');
  };
  increment = function(event) {
    var step;
    event.preventDefault();
    event.stopPropagation();
    step = parseInt(this.data('step'), 10) || 1;
    this.val(parseInt(this.val(), 10) + step);
    return this.trigger('change');
  };
  calculate = function() {
    var devEnvSavings_, onboardingSavings_, sysAdminSavings_;
    devEnvSavings_ = 0;
    onboardingSavings_ = 0;
    sysAdminSavings_ = 0;
    devEnvSavings_ += getValue(inputs.number_of_devs) * getValue(inputs.hours_spent_per_dev);
    onboardingSavings_ += getValue(inputs.number_of_devs) * getValue(inputs.hours_spent_per_dev);
    sysAdminSavings_ += getValue(inputs.number_of_devs) * getValue(inputs.hours_spent_per_dev);
    return [devEnvSavings_, onboardingSavings_, sysAdminSavings_];
  };
  renderCalcuation = function() {
    var results;
    results = calculate();
    $("#totalSavings").html("$" + (results[0] + results[1] + results[2]));
    $("#devEnvSavings").html("$" + results[0]);
    $("#onboardingSavings").html("$" + results[1]);
    return $("#sysAdminSavings").html("$" + results[2]);
  };
  results1 = [];
  for (input in inputs) {
    $input = getInput(input);
    $input.on('change', renderCalcuation);
    $input.prev().on('click', decrement.bind($input));
    results1.push($input.next().on('click', increment.bind($input)));
  }
  return results1;
})();
