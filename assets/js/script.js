
;$(document).ready(function() {

	var App = {

		defaults: {
			borderRadius: {
				name: 'border-radius',
				value: 0,
				max: 80
			},
			borderSize: {
				name: 'border-width',
				value: 0,
				max: 10
			},
			horizontalSize: {
				name: 'width',
				value: 0,
				max: 150
			},
			verticalSize: {
				name: 'height',
				value: 0,
				max: 60
			}
		},

		init: function ()
		{
			//init vars
			this.htmlTemplate = '<button class="button">Text</button>';
			this.btn = $('#btn');
			this.textField = $('#buttonText');
			this.form = $('#form');
			this.cssField = this.form.find('#cssField');
			this.htmlField = this.form.find('#htmlField');
			this.inputEmail = this.form.find('#inputEmail');
		
			//create slider
			this.makeSliders();

			//clear result forms
			this.cssField.val('');
			this.htmlField.val('');

			//init events
			this.textField.on('keyup', $.proxy(this.updateHtml, this));
			this.form.on('submit', $.proxy(this.submitForm, this));
			this.inputEmail.on('keydown', function () {
				$(this).tooltip('destroy');
			});
		},

		submitForm: function (e)
		{
			e.preventDefault();
			var form = e.target;

			//this.clearTooltip.call();

			if (this.validateForm(form) === true) {
				console.log(form, 'ajax gogogo');
			}
		},

		validateForm: function (form)
		{
			var input     = $(form).find('input'),
				value     = $.trim(input.val()),
				errorText = 'Неправильный формат email!',
				valid     = false,
				re        = /\S+@\S+\.\S+/;

			input.tooltip('destroy');

			if (value.length === 0) {
				errorText = 'Введите email!';
				valid = false;
			} else if (re.test(value)) {
				valid = true;
			}

			if (!valid) {
				input.tooltip({
					trigger: 'manual',
					placement: 'right',
					title: errorText
				}).tooltip('show');
			}

			return valid;
		},

		/*clearTooltip: function ()
		{
			$(this).tooltip('destroy');
		},*/

		makeSliders: function ()
		{
			var key, elem = null;
			for (key in this.defaults) {

				elem = this.defaults[key];
				$('#' + key).slider({
					value      : elem.value, 
					max        : elem.max,
					orientation: "horizontal",
					range      : "min",
					change     : $.proxy(this.updateButton, this)
					//scope: this
				});
				//$('#' + key).on('slidechange', $.proxy(this.updateButton, this));
			}
		},

		updateButton: function (e, ui)
		{
			//this == html obj
			//var id = this.id;
			//var prop = App.defaults[id].name;
			var value = ui.value;
			var id = e.target.id;
			var prop = this.defaults[id].name;

			switch (id) {
				case 'horizontalSize':
					this.btn.css({'padding-left': value+'px', 'padding-right': value+'px'});
					break;
				case 'verticalSize':
					this.btn.css({'padding-top': value+'px', 'padding-bottom': value+'px'});
					break;
				default:
					this.btn.css(prop, value+'px');
			}
			this.showCss();
		},

		showCss: function () //showResult
		{
			var borderRadius = this.btn.css("borderTopLeftRadius"), //border-radius
				borderWidth  = this.btn.css("borderTopWidth"), //border-width
				//width	 	 = this.btn.css("width"),
				//height	 	 = this.btn.css("height"),
				pdTop        = this.btn.css("padding-top"),
				pdLeft       = this.btn.css("padding-left");

			this.cssField.val( //#res-code
				'.button {\n' +
				'  -moz-border-radius' + ':' + borderRadius + ';\n' +
				'  -webkit-border-radius' + ':' + borderRadius + ';\n' +
				'  border-radius' + ':' + borderRadius + ';\n' +
				'  border-width' + ':' + borderWidth + ';\n' + 
				//'  width' + ':' + width + ';\n' + 
				//'  height' + ':' + height + ';' + 
				'  padding' + ':' + pdTop + ' ' + pdLeft + ' ' + pdTop + ' ' + pdLeft + ';' + 
				'\n}'

			);
		},

		updateHtml: function (e) //showHtml
		{
			var inputText = e.currentTarget,
				newText = $(inputText).val(),
				button = $(this.htmlTemplate).text(newText);

			if (newText != 0) {
				$('#btn').text(newText);
				this.htmlField.val(button[0].outerHTML);
				//this.showHtml(newText);
			}
		}
	};

	//run App
	App.init();
});