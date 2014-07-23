;$(document).ready(function() {

    var App = {

        defaults: {
            borderRadius: {
                type: 'slider',
                name: 'border-radius',
                value: 4,
                max: 70
            },
            borderSize: {
                type: 'slider',
                name: 'border-width',
                value: 1,
                max: 10
            },
            horizontalSize: {
                type: 'slider',
                name: 'width',
                value: 12,
                max: 80
            },
            verticalSize: {
                type: 'slider',
                name: 'height',
                value: 6,
                max: 50
            },
            textColor: {
                type: 'color',
                name: 'color',
                value: '000'
            },
            borderColor: {
                type: 'color',
                name: 'border-color',
                value: 'd2d2d2',
            },
            backgroundColor: {
                type: 'color',
                name: 'background-color',
                value: 'f2f2f2'
            }
        },

        init: function() {
            //init vars
            this.ajaxUrl = "server/send_mail.php";
            this.htmlTemplate = '<button class="button">Text</button>';
            this.textField = $('#buttonText');
            this.btn = $('#btn');
            this.form = $('#form');
            this.cssField = this.form.find('#cssField');
            this.htmlField = this.form.find('#htmlField');
            this.inputEmail = this.form.find('#inputEmail');

            //create slider
            this.makeSliders();

            //clear result forms
            //this.cssField.val('');
            //this.htmlField.val('');

            //init events
            this.textField.on('keyup', $.proxy(this.updateHtml, this));
            this.form.on('submit', $.proxy(this.submitForm, this));
            this.inputEmail.on('keydown', function() {
                $(this).tooltip('destroy');
            });
            $('#optionsColor').on('change', 'input', $.proxy(this.updateButton, this));
        },

        submitForm: function(e) 
        {
            e.preventDefault();
            var form = e.target;

            //this.clearTooltip.call();

            if (this.validateForm(form) === true) {
                //console.log(form, 'ajax gogogo');
                var request = $.ajax({
                    url: this.ajaxUrl,
                    type: "POST",
                    data: { 
                        email: this.inputEmail.val(), 
                        cssText: this.cssField.val(),
                        htmlText: this.htmlField.val()
                    },
                    dataType: "json"
                });
                request.success($.proxy(function( data, textStatus, jqXHR ) { //done
                    var res = JSON.parse(data);
                    //console.log('done: ', res, arguments);
                    if (res.success) {
                        this.inputEmail.val('');
                        this.makeTooltip('Письмо отправлено');
                    } else {
                        this.makeTooltip('Ошибка отправки');
                    }
                }, this));
                request.fail($.proxy(function( jqXHR, textStatus ) {
                    //console.log('fail: ', arguments);
                    this.makeTooltip('Ошибка отправки');
                }, this));
            }
        },

        validateForm: function(form) 
        {
            var input = $(form).find('input'),
                value = $.trim(input.val()),
                errorText = 'Неправильный формат email!',
                valid = false,
                re = /\S+@\S+\.\S+/;

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

        makeTooltip: function(text, status)
        {
            this.inputEmail.tooltip({
                trigger: 'manual',
                placement: 'right',
                title: text
            }).tooltip('show');   
        },

        /*clearTooltip: function ()
		{
			$(this).tooltip('destroy');
		},*/
        //make modules, set default values
        makeSliders: function() 
        {
            var key, elem = null;
            for (key in this.defaults) {

                elem = this.defaults[key];
                if (elem.type === 'slider') {
                    $('#' + key).slider({
                        value: elem.value,
                        max: elem.max,
                        orientation: "horizontal",
                        range: "min",
                        change: $.proxy(this.updateButton, this)
                        //scope: this
                    });
                    //$('#' + key).on('slidechange', $.proxy(this.updateButton, this));
                } else if (elem.type === 'color') {

                    $('#' + key).val(elem.value);
                }
            }
        },

        updateButton: function(e, ui) 
        {
            //this == html obj
            //var id = this.id;
            //var prop = App.defaults[id].name;
            var value = (ui) ? ui.value : e.target.value,
                id = e.target.id,
                elem = this.defaults[id];

            switch (id) {
                case 'horizontalSize':
                    this.btn.css({
                        'padding-left': value + 'px',
                        'padding-right': value + 'px'
                    });
                    break;
                case 'verticalSize':
                    this.btn.css({
                        'padding-top': value + 'px',
                        'padding-bottom': value + 'px'
                    });
                    break;
                default:
                    if (elem.type === 'slider')
                        this.btn.css(elem.name, value + 'px');
                    else if (elem.type === 'color')
                        this.btn.css(elem.name, '#' + value);
            }
            this.showCss();
        },

        showCss: function() //showResult
        {
            var borderRadius = this.btn.css("borderTopLeftRadius"), //border-radius
                borderWidth = this.btn.css("borderTopWidth"), //border-width
                //width	 	 = this.btn.css("width"),
                //height	 = this.btn.css("height"),
                pdTop = this.btn.css("padding-top"),
                pdLeft = this.btn.css("padding-left"),
                
                color = this.btn.css("color"),
                borderColor = this.btn.css("border-top-color"),
                backgroundColor = this.btn.css("background-color");

            this.cssField.val(
                '.button {\n' +
                '  -moz-border-radius' + ':' + borderRadius + ';\n' +
                '  -webkit-border-radius' + ':' + borderRadius + ';\n' +
                '  border-radius' + ':' + borderRadius + ';\n' +
                '  border-width' + ':' + borderWidth + ';\n' +
                //'  width' + ':' + width + ';\n' + 
                //'  height' + ':' + height + ';' + 
                '  padding' + ':' + pdTop + ' ' + pdLeft + ' ' + pdTop + ' ' + pdLeft + ';\n' +
                '  color: ' + color + ';\n' +
                '  border-color: ' + borderColor + ';\n' +
                '  background-color: ' + backgroundColor + ';' +
                '\n}'
            );
        },

        updateHtml: function(e) //showHtml
        {
            var inputText = e.currentTarget,
                newText = $(inputText).val(),
                button = $(this.htmlTemplate).text(newText);

            if (newText != 0) {
                this.btn.text(newText);
                this.htmlField.val(button[0].outerHTML);
                //this.showHtml(newText);
            }
        },

        showHtml: function() 
        {
            var button = $(this.htmlTemplate);
            this.htmlField.val(button[0].outerHTML);
        }

    }; //end class

    //run App
    App.init();

    App.showCss();
    App.showHtml();
});