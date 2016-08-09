
Backbone.Validation.configure({
    forceUpdate: true
});

_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        var $el = view.$('[name=' + attr + ']'), 
            $group = $el.closest('.form-group');
        
        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
        var $el = view.$('[name=' + attr + ']'), 
            $group = $el.closest('.form-group');
        
        $group.addClass('has-error');
        $group.find('.help-block').html(error).removeClass('hidden');
    }
});

// Define a model with some validation rules
var SignUpModel = Backbone.Model.extend({
    defaults: {
        
    },
    validation: {
        username: {
            required: true
        },
        email: {
            required: true,
            pattern: 'email'
        },
        password: {
            minLength: 8
        }
       
    }
});

var SignUpForm = Backbone.View.extend({
    events: {
        'click #signUpButton': function (e) {
            e.preventDefault();
            this.signUp();
        }
    },
    
    bindings: {
        '[name=username]': {
            observe: 'username',
            setOptions: {
                validate: true
            }
        },
        '[name=email]': {
            observe: 'email',
            setOptions: {
                validate: true
            }
        },
        '[name=password]': {
            observe: 'password',
            setOptions: {
                validate: true
            }
        }
    },

    initialize: function () {
        Backbone.Validation.bind(this);
    },
    
    render: function() {
        this.stickit();
        return this;
    },
 
    signUp: function () {


       var user= this.model.get('username');
            var email = this.model.get('email');
        if(this.model.isValid(true)) {
    $.getJSON("http://70.38.37.105:1060/ProductwithlocalAPI/WebAPI/api/v1/UIHelper/CheckLogin?username=admin&password=admin123", function(result){

        $.each(result, function(i, field){

          var dUserEmail = field[0].EmailId;
            var dUserName = $.trim(field[0].UserName);
            var dName = field[0].Name;

            if(user == dUserName && email == dUserEmail ){
              window.location = "home.html";
            }else{
              alert(' Enter valid username and email');

            } 
        });
    });

            
        }
    },
    
    remove: function() {
        Backbone.Validation.unbind(this);
        return Backbone.View.prototype.remove.apply(this, arguments);
    }
});

$(function () {
    var view = new SignUpForm({
        el: 'form',
        model: new SignUpModel()
    });
    view.render();
});
