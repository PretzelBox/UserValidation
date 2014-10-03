function themeSettingToBool(val){
  val = val.toLowerCase().trim();

  if(val === "true" || val === "1")
    return true;

  return false;
}

$(function(){
  window.registrationUser = new User({
    validateEmail : themeSettingToBool("##THEMESETTING[Enable Generic Email Validation, text]##"),
    validatePasswordMatch : themeSettingToBool("##THEMESETTING[Enable Password Match Validation, text]##"),
    validateEmailDomain : themeSettingToBool("##THEMESETTING[Enable Email Domain Validation, text]##"),
    emailValidationDomain : "##THEMESETTING[Email Domain Validation Value, text]##"
  });

  $(window).on('AC::RegistraionEvent', function(e, data){
    if(data !== undefined && 'AC_ValidationMessage' in data){
      switch(data.AC_ValidationMessage){
        case User.ValidationMessage.VALIDATION_PASSED :
          break;
        case User.ValidationMessage.INVALID_EMAIL :
          bootbox.alert('##THEMESETTING[Invalid Email Address Message, text]##');
          break;
        case User.ValidationMessage.WRONG_DOMAIN :
          bootbox.alert('##THEMESETTING[Domain Validation Message, text]##');
          break;
        case User.ValidationMessage.PASSWORD_MISMATCH :
          bootbox.alert('##THEMESETTING[Password Mismatch Message, text]##');
          break;
      }
    }
  });
});