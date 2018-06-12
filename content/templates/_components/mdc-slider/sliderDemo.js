demoReady(function() {
  mdc.slider.MDCSlider.attachTo(document.getElementById('hero-slider'));

  var numberIsFinite = Number.isFinite || function(value) {
    return typeof value === 'number' && isFinite(value);
  };

  var demoRoot = document.getElementById('slider-example')
  var minInput = demoRoot.querySelector('[name="min"]');
  var maxInput = demoRoot.querySelector('[name="max"]');
  var step = demoRoot.querySelector('[name="step"]');
  var disabled = demoRoot.querySelector('[name="disabled"]');
  var useCustomColor = demoRoot.querySelector('[name="use-custom-color"]');
  var rtl = demoRoot.querySelector('[name="rtl"]');

  var continuousValue = demoRoot.querySelector('#continuous-slider-value');
  var continuousCommittedValue = demoRoot.querySelector('#continuous-slider-committed-value');
  var continuousSliderEl = demoRoot.querySelector('#continuous-mdc-slider');
  var continuousSlider = new mdc.slider.MDCSlider(continuousSliderEl);
  continuousSlider.listen('MDCSlider:input', function() {
    continuousValue.textContent = continuousSlider.value;
  });
  continuousSlider.listen('MDCSlider:change', function() {
    continuousCommittedValue.textContent = continuousSlider.value;
  });

  var discreteValue = demoRoot.querySelector('#discrete-slider-value');
  var discreteCommittedValue = demoRoot.querySelector('#discrete-slider-committed-value');
  var discreteSliderEl = demoRoot.querySelector('#discrete-mdc-slider');
  var discreteSlider = new mdc.slider.MDCSlider(discreteSliderEl);
  discreteSlider.listen('MDCSlider:input', function() {
    discreteValue.textContent = discreteSlider.value;
  });
  discreteSlider.listen('MDCSlider:change', function() {
    discreteCommittedValue.textContent = discreteSlider.value;
  });

  var discreteWMarkerValue = demoRoot.querySelector('#discrete-slider-w-marker-value');
  var discreteWMarkerCommittedValue = demoRoot.querySelector('#discrete-slider-w-marker-committed-value');
  var discreteWMarkerSliderEl = demoRoot.querySelector('#discrete-mdc-slider-w-marker');
  var discreteWMarkerSlider = new mdc.slider.MDCSlider(discreteWMarkerSliderEl);
  discreteWMarkerSlider.listen('MDCSlider:input', function() {
    discreteWMarkerValue.textContent = discreteWMarkerSlider.value;
  });
  discreteWMarkerSlider.listen('MDCSlider:change', function() {
    discreteWMarkerCommittedValue.textContent = discreteWMarkerSlider.value;
  });

  var customDiscreteWMarkerValue = demoRoot.querySelector('#custom-discrete-slider-w-marker-value');
  var customDiscreteWMarkerCommittedValue = demoRoot.querySelector('#custom-discrete-slider-w-marker-committed-value');
  var customDiscreteWMarkerSliderEl = demoRoot.querySelector('#custom-discrete-mdc-slider-w-marker');
  var customDiscreteWMarkerSlider = new mdc.slider.MDCSlider(customDiscreteWMarkerSliderEl);
  customDiscreteWMarkerSlider.listen('MDCSlider:input', function() {
    customDiscreteWMarkerValue.textContent = customDiscreteWMarkerSlider.value;
  });
  customDiscreteWMarkerSlider.listen('MDCSlider:change', function() {
    customDiscreteWMarkerCommittedValue.textContent = customDiscreteWMarkerSlider.value;
  });

  minInput.addEventListener('input', function() {
    var minValue = parseFloat(minInput.value);
    if (!numberIsFinite(minValue)) {
      return;
    }
    continuousSlider.min = minValue;
    discreteSlider.min = minValue;
    discreteWMarkerSlider.min = minValue;
    customDiscreteWMarkerSlider.min = minValue;
  });

  maxInput.addEventListener('input', function() {
    var maxValue = parseFloat(maxInput.value);
    if (!numberIsFinite(maxValue)) {
      return;
    }
    continuousSlider.max = maxValue;
    discreteSlider.max = maxValue;
    discreteWMarkerSlider.max = maxValue;
    customDiscreteWMarkerSlider.max = maxValue;
  });

  step.addEventListener('input', function() {
    var stepValue = parseFloat(step.value);
    if (!numberIsFinite(stepValue)) {
      return;
    }
    continuousSlider.step = stepValue;
    discreteSlider.step = stepValue;
    discreteWMarkerSlider.step = stepValue;
    customDiscreteWMarkerSlider.step = stepValue;
  });

  disabled.addEventListener('change', function() {
    continuousSlider.disabled = disabled.checked;
    discreteSlider.disabled = disabled.checked;
    discreteWMarkerSlider.disabled = disabled.checked;
    customDiscreteWMarkerSlider.disabled = disabled.checked;
  });

  useCustomColor.addEventListener('change', function() {
    [].forEach.call(demoRoot.querySelectorAll('.example-slider-wrapper'), function(example) {
      example.classList[
        useCustomColor.checked
          ? 'add'
          : 'remove'
      ]('custom-bg');
    });
  });

  rtl.addEventListener('change', function() {
    [].forEach.call(demoRoot.querySelectorAll('.example-slider-wrapper'), function(example) {
      if (rtl.checked) {
        example.setAttribute('dir', 'rtl');
      } else {
        example.removeAttribute('dir');
      }
    });
    continuousSlider.layout();
    discreteSlider.layout();
    discreteWMarkerSlider.layout();
    customDiscreteWMarkerSlider.layout();
  });
});
