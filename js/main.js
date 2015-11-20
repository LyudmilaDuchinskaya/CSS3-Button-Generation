(function() {
    var app = {
        initialize: function() {
            this.setUpListeners();
            this.updateResult();
        },
        setUpListeners: function() {
            // Radius change
            $('#increase-radius').on('click', $.proxy(this.increaseRadius, this));
            $('#reduce-radius').on('click', $.proxy(this.reduceRadius, this));
            // Color change
            $('#bg-color').on('change', $.proxy(this.bgChangeColor, this));
            $('#text-color').on('change', $.proxy(this.txtChangeColor, this));
            // Size
            $('#width').on('change', $.proxy(this.widthChange, this));
            $('#height').on('change', $.proxy(this.heightChange, this));
            $('#fontsize').on('change', $.proxy(this.fontSizeChange, this));
            //Border
            $('#brwidth').on('change', $.proxy(this.borderChange, this));
            $('#brstyle').on('change', $.proxy(this.borderChange, this));
            $('#border-color').on('change', $.proxy(this.borderChange, this));
        },
        create: $('.create'),
        minRadius: 0,
        bgChangeColor: function() {
          var newColor = '#' + $('#bg-color').val();
            this.create.css({
                'background-color' : newColor
            });
            this.updateResult();
        },
        borderChange: function() {
            var newBrWidth = $('#brwidth').val() + 'px';
            var newBrStyle = $('#brstyle').val();
            var newBrColor = '#' + $('#border-color').val();
            this.create.css({
                'border' : newBrWidth + ' ' + newBrStyle + ' ' + newBrColor
            });
            this.updateResult();
        },
        txtChangeColor: function() {
            var newColor = '#' + $('#text-color').val();
            this.create.css({
                'color' : newColor
            });
            this.updateResult();
        },
        widthChange: function() {
            var newWidth = $('#width').val() + 'px';
            this.create.css({
                'width' : newWidth
            });
            this.updateResult();
        },
        heightChange: function() {
          var newHeight = $('#height').val() + 'px';
            this.create.css({
                'height' : newHeight,
                'line-height' : newHeight
            });
            this.updateResult();
        },
        fontSizeChange: function() {
            var newFontSize = $('#fontsize').val() + 'px';
            this.create.css({
                'font-size' : newFontSize
            });
            this.updateResult();
        },
        increaseRadius: function() {
            var maxRadius = parseInt($('.create').css('height'))/2;
            var currentRadius = this.create.css('border-radius'),
                step = $('#step').val(),
                newRadius = (parseInt(currentRadius) + parseInt(step));
            if(newRadius > maxRadius) {
                newRadius = maxRadius;
                $('#increase-radius').addClass('disabled');
            }
            if(newRadius > this.minRadius) {
                $('#reduce-radius').removeClass('disabled');
            }
            this.create.css({
                'border-radius' : newRadius
            });
            this.updateResult();
        },
        reduceRadius: function() {
            var maxRadius = parseInt($('.create').css('height'))/2;
            var currentRadius = this.create.css('border-radius'),
                step = $('#step').val(),
                newRadius = (parseInt(currentRadius) - parseInt(step));
            if(newRadius < this.minRadius) {
                newRadius = this.minRadius;
                $('#reduce-radius').addClass('disabled');
            }
            if(newRadius < maxRadius) {
                $('#increase-radius').removeClass('disabled');
            }
            this.create.css({
                'border-radius' : newRadius
            });
            this.updateResult();
        },
        updateResult: function() {
            var borderRad = this.create.css('border-radius'),
                bgcolor = this.create.css('background-color'),
                brcolor = this.create.css('border-color'),
                txtcolor = this.create.css('color'),
                codeResultArea = $('#code-result'),
                newWidth = this.create.css('width'),
                newHeight = this.create.css('height'),
                newFontSize = this.create.css('font-size'),
                newBorder = this.create.css('border');
            codeResultArea.text(
                '-moz-border-radius: ' + borderRad + ';\n' +
                '-webkit-border-radius: ' + borderRad + ';\n' +
                'border-radius: ' + borderRad + ';\n' +
                'border-color: ' + brcolor + ';\n' +
                'background-color: ' + bgcolor + ';\n' +
                'color: ' + txtcolor + ';\n' +
                'width: ' + newWidth + ';\n' +
                'height: ' + newHeight + ';\n' +
                'line-height: ' + newHeight + ';\n' +
                'font-size: ' + newFontSize + ';\n' +
                'border: ' + newBorder + ';'
            );
        }
    };
    app.initialize();
})();