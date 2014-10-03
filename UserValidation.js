;(function(window, $){

  var User = function(options){
    var defaults = {
      validateEmail : false,
      validatePasswordMatch : false,
      validateEmailDomain : false,
      emailValidationDomain : ""
    };

    this.options = $.extend({}, defaults, options );
    this.$firstName = $('#txtFirstName');
    this.$lastName = $('#txtLastName');
    this.$company = $('#txtCompany');
    this.$email = $('#txtEmail');
    this.$displayName = $('#txtDisplayName');
    this.$password1 = $('#txtPassword1');
    this.$password2 = $('#txtPassword2');
    this.$address1 = $('#txtAddress1');
    this.$address2 = $('#txtAddress2');
    this.$city = $('#txtCity');
    this.$state = $('#txtState');
    this.$zipCode = $('#txtZipCode');
    this.$phone = $('#txtPhone');
    this.$rememberMe = $('#chkDontRememberMe');
    this.$mailingList = $('#chkMailingList');
    this.$registerBtn = $('#btnRegister');

    this.init();
  }

  User.EmailRegex = new RegExp(/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/);

  User.ValidationMessage = {
    VALIDATION_PASSED : 0,
    INVALID_EMAIL : 1,
    WRONG_DOMAIN : 2,
    PASSWORD_MISMATCH : 3
  };

  User.prototype = {
    init : function(){
      this.bindRegBtn();
      this.bindEnterKey();
    },
    bindRegBtn : function(){
      var _user = this;
      this.$registerBtn.on('click',function(e, data){
        if( _user.checkValidationWasPassed(data) ){
          e.preventDefault();
          _user.btnOnClick(e);
        }
      });
    },
    bindEnterKey : function(){
      var _user = this;
      $('body.Register .LayoutContentInner input').on('keydown',function(e, data){
        if(e.which === 13 && _user.checkValidationWasPassed(data)){
          e.preventDefault();
          _user.btnOnClick(e);
        }
      });
    },
    checkValidationWasPassed : function(data){
      return data === undefined || ('AC_ValidationMessage' in data && data.AC_ValidationMessage !== User.ValidationMessage.VALIDATION_PASSED);
    },
    btnOnClick : function(){
      if( this.options.validateEmail && !this.isValidEmail() ){
        $(window).trigger('AC::RegistraionEvent', { AC_ValidationMessage : User.ValidationMessage.INVALID_EMAIL });
        return;
      }

      if( this.options.validatePasswordMatch && !this.passwordsMatch() ){
        $(window).trigger('AC::RegistraionEvent', { AC_ValidationMessage : User.ValidationMessage.PASSWORD_MISMATCH });
        return;
      }

      if( this.options.validateEmailDomain && !this.validDomain() ){
        $(window).trigger('AC::RegistraionEvent', { AC_ValidationMessage : User.ValidationMessage.WRONG_DOMAIN });
        return;
      }

      this.$registerBtn.trigger('click', { AC_ValidationMessage : User.ValidationMessage.VALIDATION_PASSED });
    },
    passwordsMatch : function(){
      return this.$password1.val() === this.$password2.val();
    },
    validDomain : function(){
      var address = this.$email.val(),
          i = address.lastIndexOf('@');

      if (i > -1 && address.slice(i) === '@' + this.options.emailValidationDomain)
        return true

        return false
    },
    isValidEmail : function(){
      return User.EmailRegex.test(this.$email.val());
    }
  };

  window.User = User;

})(window, jQuery);
