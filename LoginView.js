
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
            var password = this.model.get('password');
            var ss ="http://70.38.37.105:1060/ProductwithlocalAPI/WebAPI/api/v1/UIHelper/CheckLogin?username=admin&password=admin123";
        if(this.model.isValid(true)) {
   
 var userdata = showResult(parseURL(ss));
        

     
            if(user == userdata.username && password == userdata.password){
              window.location = "home.html";
            }else{
              alert(' Enter valid username and password');

            } 
       
    

            
        }
    },
    
    remove: function() {
        Backbone.Validation.unbind(this);
        return Backbone.View.prototype.remove.apply(this, arguments);
    }
});
    

function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
      
        params: (function () {
            var ret = {},
            seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
      
    };
}


function showResult(parsedData) {   
   // var obj = {};

// alert(parsedData.params['username']);
//alert(parsedData.params['password']);
return parsedData.params;

}

// window.onload= function () {
    
//     showResult(parseURL(ss));
// };
$(function () {
    var view = new SignUpForm({
        el: 'form',
        model: new SignUpModel()
    });
    view.render();
});
