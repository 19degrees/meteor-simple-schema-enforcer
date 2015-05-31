// exported
SimpleSchemaEnforcer = function(simpleSchema, errorHandlers) {
  var self = this;

  self._simpleSchema = simpleSchema;
  self._errorHandlers = errorHandlers;


}

SimpleSchemaEnforcer.prototype.validate = function(data, keys) {
  var self = this;

  var context = self._simpleSchema.newContext();

  if (keys !== undefined) {
    _.each(keys, function(k) {
      context.validateOne(data, k);
    });
  } else {
    context.validate(data);
  }

  if (!context.isValid())
    throw new Meteor.Error(400, 'invalid schema detected for: '+_.reduce(context.invalidKeys(), function(memo, error){ 
        if (memo === '')
          return error.name;
        return memo + ', ' + error.name; 

      },''), context.invalidKeys());
}

SimpleSchemaEnforcer.prototype.parseError = function(meteorError) {
  var self = this;

  console.error('Error:', meteorError.error, '-', meteorError.reason);

  var errorDetails = meteorError.details;

  _.each(self._errorHandlers, function (e) 
    {
      if (e.inputID !== undefined)
        $('#' + e.inputID + ' .simple-schema-enforcer-error').removeClass('simple-schema-enforcer-error');
    });

  


  _.each(errorDetails, function(err){
    
    err.name = err.name.replace(/(\.(\d)+)/g,'.$');

    console.error('Schema Error:', err.type,'@', err.name);
    
    var inputID = self._errorHandlers[err.name]['inputID'];
    
    var handler = self._errorHandlers[err.name]['handlers'][err.type];

    console.log('Error Message:', handler.message);

    if (handler.callback !== undefined)
      handler.callback(handler.message);

    if (inputID !== undefined)
      if (handler.inputHightlight === true)
        $('#' + inputID).addClass('simple-schema-enforcer-error');

  });
}